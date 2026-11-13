import { NextResponse } from "next/server";
import { readPosterImage } from "@/lib/poster";

export const dynamic = "force-dynamic";

/** Public: the poster image (WebP). URL carries ?v=<updatedAt>, so it can be cached for a long time. */
export async function GET() {
  const buf = await readPosterImage();
  if (!buf) return new NextResponse("Not found", { status: 404 });
  return new NextResponse(new Uint8Array(buf), {
    headers: { "Content-Type": "image/webp", "Cache-Control": "public, max-age=31536000, immutable" },
  });
}
