import fs from "node:fs";
import path from "node:path";

/**
 * Homepage hero banner. Drop the banner file into /public/images/ named
 * hero.jpg / hero.jpeg / hero.png / hero.webp and the homepage uses it automatically.
 */
export function findHeroImage(): string | null {
  for (const ext of ["jpg", "jpeg", "png", "webp"]) {
    if (fs.existsSync(path.join(process.cwd(), "public", "images", `hero.${ext}`))) return `/images/hero.${ext}`;
  }
  return null;
}
