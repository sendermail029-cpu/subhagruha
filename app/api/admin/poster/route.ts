import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import sharp from "sharp";
import { ADMIN_COOKIE, deletePoster, readPoster, savePoster, storageName, tokenOk, writePosterMeta } from "@/lib/poster";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const MAX_BYTES = 20 * 1024 * 1024; // 20 MB upload limit

async function authed() {
  return tokenOk((await cookies()).get(ADMIN_COOKIE)?.value);
}
const deny = () => NextResponse.json({ error: "Please log in again." }, { status: 401 });

/** Admin: current poster (including when disabled). */
export async function GET() {
  if (!(await authed())) return deny();
  return NextResponse.json({ poster: await readPoster(), storage: storageName() });
}

/** Admin: upload a new poster (any image) → converted to WebP. */
export async function POST(req: Request) {
  if (!(await authed())) return deny();
  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "Choose an image file." }, { status: 400 });
  if (file.size > MAX_BYTES) return NextResponse.json({ error: "Image is larger than 20 MB." }, { status: 400 });

  let out: { data: Buffer; info: { width: number; height: number } };
  try {
    out = await sharp(Buffer.from(await file.arrayBuffer()))
      .rotate()
      .resize({ width: 1200, height: 1600, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 85 })
      .toBuffer({ resolveWithObject: true });
  } catch {
    return NextResponse.json({ error: "That file isn't a supported image (use JPG, PNG or WebP)." }, { status: 400 });
  }

  const prev = await readPoster();
  const meta = {
    enabled: form.get("enabled") ? form.get("enabled") === "true" : prev?.enabled ?? true,
    link: String(form.get("link") ?? prev?.link ?? "").trim(),
    title: String(form.get("title") ?? prev?.title ?? "Subhagruha announcement").trim() || "Subhagruha announcement",
    width: out.info.width,
    height: out.info.height,
    updatedAt: Date.now(),
  };
  await savePoster(meta, out.data);
  return NextResponse.json({ poster: meta, storage: storageName(), originalKB: Math.round(file.size / 1024), webpKB: Math.round(out.data.length / 1024) });
}

/** Admin: change settings (on/off, link, title) without re-uploading. */
export async function PATCH(req: Request) {
  if (!(await authed())) return deny();
  const prev = await readPoster();
  if (!prev) return NextResponse.json({ error: "Upload a poster first." }, { status: 400 });
  const body = (await req.json().catch(() => ({}))) as Partial<{ enabled: boolean; link: string; title: string; reshow: boolean }>;
  const meta = {
    ...prev,
    enabled: typeof body.enabled === "boolean" ? body.enabled : prev.enabled,
    link: typeof body.link === "string" ? body.link.trim() : prev.link,
    title: typeof body.title === "string" ? body.title.trim() || prev.title : prev.title,
    // turning it on (or "show again") counts as a new version so visitors see it again
    updatedAt: body.reshow || (body.enabled && !prev.enabled) ? Date.now() : prev.updatedAt,
  };
  await writePosterMeta(meta);
  return NextResponse.json({ poster: meta });
}

/** Admin: remove the poster. */
export async function DELETE() {
  if (!(await authed())) return deny();
  await deletePoster();
  return NextResponse.json({ poster: null });
}
