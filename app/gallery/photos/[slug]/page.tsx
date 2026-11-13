import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import PageHero from "@/components/PageHero";
import { ALBUMS, getAlbum } from "@/lib/content";
import { PROJECTS } from "@/lib/projects";

type Params = { params: Promise<{ slug: string }> };

const ALIAS: Record<string, string> = { "subhagruha-ananda-phase-ll": "subhagruha-ananda-phase-2" };

export function generateStaticParams() {
  return ALBUMS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const a = getAlbum((await params).slug);
  if (!a) return {};
  return {
    title: `${a.name} – Photo Gallery`,
    description: `${a.images.length} site photos of ${a.name} by Subhagruha Group.`,
    alternates: { canonical: `/gallery/photos/${a.slug}` },
    openGraph: { images: [{ url: a.cover, alt: a.name }] },
  };
}

export default async function AlbumPage({ params }: Params) {
  const a = getAlbum((await params).slug);
  if (!a) notFound();
  const project = PROJECTS.find((p) => p.slug === (ALIAS[a.slug] ?? a.slug));
  const i = ALBUMS.indexOf(a);
  const prev = ALBUMS[i - 1];
  const next = ALBUMS[i + 1];

  return (
    <>
      <PageHero title={a.name} intro={`${a.images.length} photo${a.images.length === 1 ? "" : "s"}`}
        crumbs={[{ name: "Gallery", path: "/gallery/photos" }, { name: "Photos", path: "/gallery/photos" }, { name: a.name, path: `/gallery/photos/${a.slug}` }]}
        images={[a.cover]} />
      <section className="py-14">
        <div className="wrap">
          <Gallery items={a.images.map((src, n) => ({ src, caption: `Photo ${n + 1}` }))} name={a.name} />
          <div className="mt-12 flex flex-wrap justify-between gap-3 border-t border-brand-line pt-6 text-sm font-bold">
            {prev ? <Link href={`/gallery/photos/${prev.slug}`} className="text-brand-green hover:text-brand-red">← {prev.name}</Link> : <span />}
            <Link href="/gallery/photos" className="text-brand-muted hover:text-brand-red">All albums</Link>
            {next ? <Link href={`/gallery/photos/${next.slug}`} className="text-brand-green hover:text-brand-red">{next.name} →</Link> : <span />}
          </div>
        </div>
      </section>
    </>
  );
}
