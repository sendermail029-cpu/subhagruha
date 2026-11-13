import type { MetadataRoute } from "next";
import { ALBUMS, POSTS, isoDate } from "@/lib/content";
import { CITIES, PROJECTS } from "@/lib/projects";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" = "monthly") => ({ url: `${SITE.url}${path}`, lastModified: now, changeFrequency, priority });
  return [
    page("", 1, "weekly"),
    page("/projects", 0.9, "weekly"),
    ...CITIES.map((c) => page(`/projects/${c.slug}`, 0.85, "weekly")),
    ...PROJECTS.map((p) => ({ ...page(`/projects/${p.slug}`, 0.8, "weekly"), images: [p.image] })),
    page("/about", 0.6),
    page("/contact", 0.7),
    page("/brochures", 0.6),
    page("/master-plans", 0.6),
    page("/nri-guidelines", 0.5),
    page("/careers", 0.4),
    page("/gallery/photos", 0.5),
    page("/gallery/videos", 0.5),
    ...ALBUMS.map((a) => ({ ...page(`/gallery/photos/${a.slug}`, 0.3), images: a.images.slice(0, 10) })),
    page("/blog", 0.7, "weekly"),
    ...POSTS.map((p) => ({ ...page(`/blog/${p.slug}`, 0.6), lastModified: isoDate(p.date) ? new Date(isoDate(p.date)!) : now, images: p.image ? [p.image] : undefined })),
  ];
}
