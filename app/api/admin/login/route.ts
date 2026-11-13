import { NextResponse } from "next/server";
import { ADMIN_COOKIE, makeToken, passwordOk } from "@/lib/poster";

// Lockout: 5 wrong PINs from one IP → blocked for 15 minutes (protects a short PIN from guessing).
const MAX_TRIES = 5;
const LOCK_MS = 15 * 60 * 1000;
const g = globalThis as unknown as { _sgTries?: Map<string, { n: number; until: number }> };
const tries = (g._sgTries ??= new Map());

export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || req.headers.get("x-real-ip") || "local";
  const now = Date.now();
  const t = tries.get(ip);
  if (t && t.until > now) {
    const mins = Math.ceil((t.until - now) / 60000);
    return NextResponse.json({ error: `Too many wrong attempts. Try again in ${mins} minute${mins === 1 ? "" : "s"}.` }, { status: 429 });
  }

  const { password } = (await req.json().catch(() => ({}))) as { password?: string };
  if (!process.env.ADMIN_PASSWORD) return NextResponse.json({ error: "ADMIN_PASSWORD is not set on the server." }, { status: 500 });
  if (!password || !passwordOk(password)) {
    const n = (t && t.until <= now && t.until !== 0 ? 0 : t?.n ?? 0) + 1;
    tries.set(ip, { n, until: n >= MAX_TRIES ? now + LOCK_MS : 0 });
    await new Promise((r) => setTimeout(r, 800));
    const left = MAX_TRIES - n;
    return NextResponse.json({ error: left > 0 ? `Wrong PIN. ${left} attempt${left === 1 ? "" : "s"} left.` : "Too many wrong attempts. Try again in 15 minutes." }, { status: left > 0 ? 401 : 429 });
  }

  tries.delete(ip);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, makeToken(), { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 7 * 24 * 3600 });
  return res;
}
