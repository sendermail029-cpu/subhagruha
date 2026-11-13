// Compresses banner videos for the web: 720p H.264, no audio, fast-start, plus a WebP poster frame.
// Put raw videos in media/videos/ (not deployed), then run: node scripts/optimize-videos.mjs
// → writes optimised public/videos/<slug>.mp4 + <slug>.webp poster
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import ffmpeg from "ffmpeg-static";

const src = "media/videos", out = "public/videos";
fs.mkdirSync(out, { recursive: true });
const slug = (n) => n.toLowerCase().replace(/\.mp4$/, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
for (const f of fs.readdirSync(src).filter((x) => /\.mp4$/i.test(x))) {
  const s = slug(f), mp4 = path.join(out, s + ".mp4"), poster = path.join(out, s + ".webp");
  execFileSync(ffmpeg, ["-y", "-loglevel", "error", "-i", path.join(src, f), "-an", "-vf", "scale=-2:720,fps=30",
    "-c:v", "libx264", "-preset", "slow", "-crf", "27", "-profile:v", "high", "-pix_fmt", "yuv420p", "-movflags", "+faststart", mp4]);
  execFileSync(ffmpeg, ["-y", "-loglevel", "error", "-ss", "0.3", "-i", mp4, "-frames:v", "1", "-vf", "scale=1280:-2", "-c:v", "libwebp", "-quality", "70", poster]);
  const a = fs.statSync(path.join(src, f)).size, b = fs.statSync(mp4).size;
  console.log(`${f.padEnd(26)} ${(a / 1e6).toFixed(1)}MB → ${(b / 1e6).toFixed(2)}MB  poster ${(fs.statSync(poster).size / 1e3).toFixed(0)}KB  [${s}]`);
}
