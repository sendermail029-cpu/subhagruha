// Builds small preview images for master plans (the originals on subhagruha.com are 15–47 MB scans).
// Run: node scripts/master-plan-thumbs.mjs   → writes public/master-plans/<file>.webp
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const plans = JSON.parse(fs.readFileSync("lib/data/master-plans.json", "utf8"));
const out = "public/master-plans";
fs.mkdirSync(out, { recursive: true });
sharp.cache(false);
sharp.concurrency(1);

let done = 0, skipped = 0, failed = [];
const queue = plans.filter((p) => !/\.pdf$/i.test(p.url));
async function worker() {
  while (queue.length) {
    const p = queue.shift();
    const name = path.basename(new URL(p.url).pathname).replace(/\.\w+$/, ".webp");
    const dest = path.join(out, name);
    if (fs.existsSync(dest)) { skipped++; continue; }
    try {
      const res = await fetch(p.url, { headers: { "User-Agent": "Mozilla/5.0" } });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const buf = Buffer.from(await res.arrayBuffer());
      await sharp(buf, { limitInputPixels: false }).rotate().resize({ width: 1000, withoutEnlargement: true }).webp({ quality: 72 }).toFile(dest);
      done++;
      process.stdout.write(`✓ ${p.name} (${(buf.length / 1e6).toFixed(1)}MB → ${(fs.statSync(dest).size / 1e3).toFixed(0)}KB)\n`);
    } catch (e) {
      failed.push(`${p.name}: ${e.message}`);
    }
  }
}
await Promise.all([worker(), worker(), worker()]);
console.log(`\ncreated ${done}, already had ${skipped}, failed ${failed.length}`);
failed.forEach((f) => console.log("✗ " + f));
