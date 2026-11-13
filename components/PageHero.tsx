import Image from "next/image";
import HeroSlides from "@/components/HeroSlides";
import HeroVideo from "@/components/HeroVideo";
import { posterOf } from "@/lib/heroVideos";
import JsonLd from "@/components/JsonLd";
import { PROJECTS } from "@/lib/projects";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

type Crumb = { name: string; path: string };

// Default photo: the configured banner image, else a real site photo.
const DEFAULT_IMG = SITE.heroImage || (PROJECTS.map((p) => p.gallery.find((g) => g.caption === "Site Photo")?.src).filter(Boolean)[0] as string);

/**
 * Classy page banner used on every inner page: a site photo (or slideshow / custom background)
 * under an even soft overlay, with a centred serif heading, a thin gold ornament and one short line.
 * No breadcrumb pill, no label, no buttons. The breadcrumb is still output for search engines.
 *
 * Legacy props (eyebrow, cta, align, minimal, dim, tall, video, videoFile) are accepted so existing
 * pages keep compiling; only `overlay`, `height`, `focus`, `slides`, `images`, `background` change the look.
 */
export default function PageHero({ title, accent, intro, crumbs, children, images, slides, clips, background, focus = "center", overlay = true, height }: {
  eyebrow?: string; title: string; accent?: string; intro?: string; crumbs: Crumb[]; children?: React.ReactNode; images?: string[];
  cta?: { label: string; href: string } | null;
  align?: "left" | "right" | "center";
  /** soft even overlay (off = photo as-is, text keeps a shadow) */
  overlay?: boolean;
  /** custom min-height classes */
  height?: string;
  video?: string;
  videoFile?: string;
  /** background slideshow (cross-fading photos) */
  slides?: string[];
  /** background video clips from /public/videos, played continuously over the photo */
  clips?: string[];
  /** any custom background element (e.g. an animated canvas) – replaces the photo */
  background?: React.ReactNode;
  minimal?: boolean;
  dim?: boolean;
  tall?: boolean;
  /** CSS object-position for the photo */
  focus?: string;
}) {
  const all = [{ name: "Home", path: "/" }, ...crumbs];
  // with a video, show its crisp WebP still first; otherwise the page photo
  const img = clips?.length ? posterOf(clips[0]) : images?.find(Boolean) ?? DEFAULT_IMG;

  return (
    <>
      <JsonLd data={breadcrumbSchema(all)} />
      <section className={`relative isolate flex items-center overflow-hidden bg-brand-green-deep text-white ${height ?? "min-h-[300px] md:min-h-[420px]"}`}>
        {background ? (
          <div aria-hidden className="absolute inset-0 -z-30">{background}</div>
        ) : slides && slides.length > 0 ? (
          <HeroSlides images={slides} />
        ) : (
          <Image src={img} alt="" fill priority sizes="100vw" quality={85} className="-z-30 object-cover" style={{ objectPosition: focus }} />
        )}
        {clips && clips.length > 0 && <div className="absolute inset-0 -z-30"><HeroVideo clips={clips} /></div>}
        {!overlay && <div aria-hidden className="absolute inset-0 -z-20 bg-black/35 md:hidden" />}
        {overlay && (
          <>
            <div aria-hidden className="absolute inset-0 -z-20 bg-black/45" />
            <div aria-hidden className="absolute inset-0 -z-20 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
          </>
        )}

        <div className="wrap relative py-14 text-center [text-shadow:0_2px_14px_rgba(0,0,0,.45)]">
          <h1 className="mx-auto max-w-4xl text-[2.6rem] font-semibold leading-[1.05] tracking-[0.01em] md:text-6xl lg:text-[4.25rem]" style={{ fontFamily: "var(--font-serif)" }}>
            {title}
            {accent && <> <span className="bg-gradient-to-r from-[#FFE27A] via-brand-gold to-[#F5B342] bg-clip-text pr-1 italic text-transparent [text-shadow:none]">{accent}</span></>}
          </h1>
          <div aria-hidden className="mt-5 flex items-center justify-center gap-3">
            <span className="h-px w-14 bg-gradient-to-r from-transparent to-brand-gold" />
            <span className="h-1.5 w-1.5 rotate-45 bg-brand-gold" />
            <span className="h-px w-14 bg-gradient-to-l from-transparent to-brand-gold" />
          </div>
          {intro && <p className="mx-auto mt-4 max-w-2xl text-[13px] font-medium uppercase leading-relaxed tracking-[0.2em] text-white/90 md:text-sm">{intro}</p>}
          {children}
        </div>
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-brand-red via-brand-orange to-brand-gold" />
      </section>
    </>
  );
}
