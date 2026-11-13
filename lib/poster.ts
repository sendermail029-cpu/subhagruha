import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { Binary, MongoClient } from "mongodb";

/** Where the popup poster lives on the server (kept outside /public so it survives rebuilds). */
export const POSTER_DIR = process.env.POSTER_DIR || path.join(process.cwd(), "storage", "poster");
const META = path.join(POSTER_DIR, "poster.json");
export const POSTER_FILE = path.join(POSTER_DIR, "poster.webp");

export type PosterMeta = {
  enabled: boolean;
  link: string;        // optional: where a click on the poster goes ("" = open booking form)
  title: string;       // alt text, e.g. "Sukrithi Pride Bhoomi Pooja"
  width: number;
  height: number;
  updatedAt: number;   // also used as cache-buster and "show again" key
};

// ---------- storage: MongoDB when MONGODB_URI is set, otherwise the local storage/poster folder ----------
type Doc = PosterMeta & { _id: string; image: Binary };
const DB = process.env.MONGODB_DB || "subhagruha";
let client: Promise<MongoClient> | null = null;
const g = globalThis as unknown as { _sgMongo?: Promise<MongoClient> };
async function col() {
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;
  // reuse one connection (also across dev hot-reloads)
  client = g._sgMongo ??= new MongoClient(uri, { serverSelectionTimeoutMS: 8000 }).connect();
  return (await client).db(DB).collection<Doc>("posters");
}
export const storageName = () => (process.env.MONGODB_URI ? "MongoDB" : "local folder");

export async function readPoster(): Promise<PosterMeta | null> {
  const c = await col();
  if (c) {
    const d = await c.findOne({ _id: "current" }, { projection: { image: 0 } });
    if (!d) return null;
    const { _id, ...meta } = d as unknown as Doc;
    void _id;
    return meta as PosterMeta;
  }
  try {
    const meta = JSON.parse(await fs.readFile(META, "utf8")) as PosterMeta;
    await fs.access(POSTER_FILE);
    return meta;
  } catch {
    return null;
  }
}

export async function readPosterImage(): Promise<Buffer | null> {
  const c = await col();
  if (c) {
    const d = await c.findOne({ _id: "current" }, { projection: { image: 1 } });
    return d?.image ? Buffer.from(d.image.buffer) : null;
  }
  try { return await fs.readFile(POSTER_FILE); } catch { return null; }
}

export async function savePoster(meta: PosterMeta, image: Buffer) {
  const c = await col();
  if (c) {
    await c.replaceOne({ _id: "current" }, { ...meta, image: new Binary(image) }, { upsert: true });
    return;
  }
  await fs.mkdir(POSTER_DIR, { recursive: true });
  await fs.writeFile(POSTER_FILE, image);
  await fs.writeFile(META, JSON.stringify(meta, null, 2));
}

export async function writePosterMeta(meta: PosterMeta) {
  const c = await col();
  if (c) {
    await c.updateOne({ _id: "current" }, { $set: meta });
    return;
  }
  await fs.mkdir(POSTER_DIR, { recursive: true });
  await fs.writeFile(META, JSON.stringify(meta, null, 2));
}

export async function deletePoster() {
  const c = await col();
  if (c) {
    await c.deleteOne({ _id: "current" });
    return;
  }
  await fs.rm(POSTER_FILE, { force: true });
  await fs.rm(META, { force: true });
}

// ---------- admin auth (password from .env.local → signed cookie) ----------
export const ADMIN_COOKIE = "sg_admin";
const secret = () => process.env.ADMIN_SECRET || `sg::${process.env.ADMIN_PASSWORD ?? ""}`;
const sign = (v: string) => createHmac("sha256", secret()).update(v).digest("hex");

export function passwordOk(input: string) {
  const real = process.env.ADMIN_PASSWORD;
  if (!real) return false;
  const a = Buffer.from(sign(input)), b = Buffer.from(sign(real));
  return a.length === b.length && timingSafeEqual(a, b);
}

/** token = "<expiry>.<hmac>" valid for 7 days */
export function makeToken() {
  const exp = String(Date.now() + 7 * 24 * 3600 * 1000);
  return `${exp}.${sign(exp)}`;
}

export function tokenOk(token?: string) {
  if (!token || !process.env.ADMIN_PASSWORD) return false;
  const [exp, mac] = token.split(".");
  if (!exp || !mac || Number(exp) < Date.now()) return false;
  const a = Buffer.from(mac), b = Buffer.from(sign(exp));
  return a.length === b.length && timingSafeEqual(a, b);
}
