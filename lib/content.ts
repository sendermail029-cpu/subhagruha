// Gallery, brochures, master plans and blog content copied from subhagruha.com.
// Raw data lives in lib/data/*.json (regenerate with the scraper if the live site changes).
import albumsRaw from "./data/albums.json";
import blogsRaw from "./data/blogs.json";
import brochuresRaw from "./data/brochures.json";
import plansRaw from "./data/master-plans.json";
import videosRaw from "./data/videos.json";
import { CITIES, PROJECTS, type City } from "./projects";

const fixName = (s: string) => s.replace(/\bPhase Ll\b/, "Phase II").replace(/\bIit\b/g, "IIT").replace(/^Sikruthi\b/, "Sukrithi");

// ---------- Photos ----------
export type Album = { slug: string; name: string; cover: string; images: string[] };
export const ALBUMS: Album[] = (albumsRaw as Album[]).map((a) => ({ ...a, name: fixName(a.name) }));
export const getAlbum = (slug: string) => ALBUMS.find((a) => a.slug === slug);

// ---------- Videos ----------
export type Video = { id: string; title: string };
export const GALLERY_VIDEOS: Video[] = videosRaw as Video[];

// ---------- Brochures ----------
export type BrochureKind = "Brochure" | "Layout Plan" | "RERA Certificate";
export type Brochure = { slug: string; title: string; kind: BrochureKind; file: string; cover?: string };
// Match a brochure to its project artwork so cards can show a real cover.
const STOP = new Set("subhagruha sukrithi sukriti sukruthi sukirthi sukeerthi sikruthi the by of phase plots plot in at vizag hyderabad visakhapatnam vijayawada thagarapuvalasa brochure broucher brouchure broacher leaftlet leaflet lp letter leeter layout rera certificate venture city i ii iii iv v amp".split(" "));
const tokens = (t: string) => t.toLowerCase().replace(/&amp;|&/g, " ").split(/[^a-z]+/).filter((w) => w.length > 2 && !STOP.has(w));
const COVERS = [
  ...PROJECTS.map((p) => ({ city: p.city as string, img: p.image, k: tokens(p.name) })),
  ...CITIES.flatMap((c) => c.completed.map((p) => ({ city: c.name as string, img: p.image, k: tokens(p.name) }))),
].filter((c) => c.k.length);
function coverFor(title: string, city: string) {
  const t = new Set(tokens(title));
  let best: { img: string; score: number } | null = null;
  for (const c of COVERS) {
    if (!t.has(c.k[0])) continue;
    const score = c.k.filter((w) => t.has(w)).length * 2 + (c.city === city ? 1 : 0);
    if (!best || score > best.score) best = { img: c.img, score };
  }
  return best?.img;
}

export const BROCHURES = (brochuresRaw as { city: City; items: Brochure[] }[]).map((g) => ({
  ...g,
  items: g.items.map((b) => {
    const title = b.title.replace(/\bIit\b/g, "IIT").replace(/\b(Iii|Ii|Iv|Vi)\b/g, (m) => m.toUpperCase()).replace(/\bPhase(\d)/g, "Phase $1").replace(/&Amp;/g, "&");
    return { ...b, title, cover: coverFor(title, g.city) };
  }),
}));

// ---------- Master plans ----------
export type Region = "Hyderabad" | "Visakhapatnam" | "Vijayawada";
export type MasterPlan = { name: string; url: string; thumb?: string; region: Region; authority: string; isPdf: boolean };
const vizagStart = (plansRaw as { name: string }[]).findIndex((p) => /^Vizianagaram Master Plan/i.test(p.name));
export const MASTER_PLANS: MasterPlan[] = (plansRaw as { name: string; url: string }[]).map((p, i) => {
  const region: Region = /amaravati/i.test(p.name) ? "Vijayawada" : i >= vizagStart || /anakapalli/i.test(p.name) ? "Visakhapatnam" : "Hyderabad";
  const name = p.name.replace(/\bHmda\b/g, "HMDA").replace(/\bOf\b/g, "of");
  return {
    name: /master plan/i.test(name) ? name : `${name} Master Plan`,
    url: p.url,
    // local preview built by scripts/master-plan-thumbs.mjs (originals are 15–47 MB scans)
    thumb: /\.pdf$/i.test(p.url) ? undefined : "/master-plans/" + p.url.split("/").pop()!.replace(/\.\w+$/, ".webp"),
    region,
    authority: region === "Hyderabad" ? "HMDA 2031" : region === "Visakhapatnam" ? "VMRDA 2041" : "APCRDA",
    isPdf: /\.pdf$/i.test(p.url),
  };
});

// ---------- Blog ----------
export type Post = { slug: string; title: string; date: string; image: string; imageAlt: string; html: string; excerpt: string; description: string };
export const POSTS: Post[] = blogsRaw as Post[];
export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);

/** "25th October, 2026" → "2026-10-25" (for schema / <time>) */
export function isoDate(d: string) {
  const m = d.match(/(\d+)\w*\s+([A-Za-z]+),?\s+(\d{4})/);
  if (!m) return undefined;
  const t = new Date(`${m[2]} ${m[1]}, ${m[3]} 12:00 UTC`);
  return isNaN(+t) ? undefined : t.toISOString().slice(0, 10);
}

// ---------- Careers ----------
export const JOBS = [
  { department: "Civil Engineering", position: "Civil Engineer – Plotting Development", experience: "10+ years", vacancies: 2, lastDate: "2027-03-01", location: "—" },
  { department: "Sales & Marketing", position: "Sales & Marketing Executive", experience: "0–2 years", vacancies: 2, lastDate: "2026-12-31", location: "Hyderabad Head Office" },
];

// ---------- Management ----------
export const MANAGEMENT = [
  {
    name: "N. Kalyan Chakravarthy",
    role: "Chairman",
    photo: "/images/Kalyan.webp",
    bio: "Kalyan Chakravarthy is an MBA with 10 years of experience in the real estate industry. As Chairman, he is involved in conceptualising and executing Subhagruha ventures and is responsible for strengthening the overall framework for the company's growth across all verticals and geographies with respect to marketing, sales, operations and finance.",
  },
  {
    name: "J. Srinivas",
    role: "Managing Director",
    photo: "/images/Srinivas.webp",
    bio: "J. Srinivas spearheads business development, customer acquisition strategy and the growth of sales volumes through internal channels and teams. With a special focus on real estate branding, communications and sales, he holds an MBA in International Marketing from the UK. He focuses on brand management, brings standards and best practices to the company, and personally monitors all customer service initiatives.",
  },
];
