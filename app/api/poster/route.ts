import { NextResponse } from "next/server";
import { readPoster } from "@/lib/poster";

export const dynamic = "force-dynamic";

/** Public: info about the current popup poster (or { enabled:false }). */
export async function GET() {
  const p = await readPoster();
  if (!p || !p.enabled) return NextResponse.json({ enabled: false }, { headers: { "Cache-Control": "no-store" } });
  return NextResponse.json(
    { enabled: true, src: `/api/poster/image?v=${p.updatedAt}`, width: p.width, height: p.height, link: p.link, title: p.title, version: p.updatedAt },
    { headers: { "Cache-Control": "no-store" } },
  );
}
