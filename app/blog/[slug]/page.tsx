import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import LeadForm from "@/components/LeadForm";
import PageHero from "@/components/PageHero";
import { HERO_IMG } from "@/lib/heroImages";
import { POSTS, getPost, isoDate } from "@/lib/content";
import { SITE } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: { type: "article", title: p.title, description: p.description, publishedTime: isoDate(p.date), images: p.image ? [{ url: p.image, alt: p.imageAlt }] : undefined },
  };
}

// Point links that go to the old site's pages at the matching pages on this site.
const localise = (html: string) =>
  html
    .replace(/href="https?:\/\/(www\.)?subhagruha\.com\/?"/g, 'href="/"')
    .replace(/href="https?:\/\/(www\.)?subhagruha\.com\/blog\/([^"]+)"/g, 'href="/blog/$2"')
    .replace(/href="https?:\/\/(www\.)?subhagruha\.com\/project\/[a-z]+\/([^"]+)"/g, 'href="/projects/$2"')
    .replace(/href="https?:\/\/(www\.)?subhagruha\.com\/projects\/([a-z]+)"/g, 'href="/projects/$2"')
    .replace(/href="https?:\/\/(www\.)?subhagruha\.com\/(about|nri|master-plan|brochures|photo|video|career)"/g, (_m, _w, p: string) =>
      `href="/${({ about: "about", nri: "nri-guidelines", "master-plan": "master-plans", brochures: "brochures", photo: "gallery/photos", video: "gallery/videos", career: "careers" } as Record<string, string>)[p]}"`);

export default async function PostPage({ params }: Params) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  const i = POSTS.indexOf(p);
  const related = [POSTS[i + 1], POSTS[i + 2], POSTS[i - 1]].filter(Boolean).slice(0, 3);

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "BlogPosting", headline: p.title, description: p.description,
        datePublished: isoDate(p.date), image: p.image || undefined, url: `${SITE.url}/blog/${p.slug}`,
        author: { "@type": "Organization", name: SITE.name }, publisher: { "@type": "Organization", name: SITE.legalName, logo: { "@type": "ImageObject", url: `${SITE.url}/icons/icon-512.png` } },
      }} />
      <PageHero title={p.title} intro={p.date}
        crumbs={[{ name: "Blog", path: "/blog" }, { name: p.title.length > 40 ? p.title.slice(0, 40) + "…" : p.title, path: `/blog/${p.slug}` }]}
        images={[HERO_IMG.blog]} />

      <section className="py-14">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_340px]">
          <article className="min-w-0">
            {p.image && <Image src={p.image} alt={p.imageAlt} width={1200} height={680} priority className="mb-10 h-auto w-full rounded-3xl object-cover" />}
            <div className="prose-blog" dangerouslySetInnerHTML={{ __html: localise(p.html) }} />
          </article>
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl bg-white p-6 shadow-card">
              <h2 className="text-2xl font-bold text-brand-green-dark">Book a site visit</h2>
              <p className="mb-4 text-sm text-brand-muted">Talk to our team about plots that suit you.</p>
              <LeadForm variant="quick" />
            </div>
            <div className="rounded-3xl border border-brand-line bg-white p-6">
              <h2 className="mb-4 font-sans text-base font-bold text-brand-green-dark">Recent posts</h2>
              <ul className="space-y-3">
                {POSTS.filter((x) => x.slug !== p.slug).slice(0, 5).map((x) => (
                  <li key={x.slug}><Link href={`/blog/${x.slug}`} className="block text-sm font-semibold leading-snug hover:text-brand-red">{x.title}</Link><span className="text-xs text-brand-muted">{x.date}</span></li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-white py-16">
          <div className="wrap">
            <h2 className="section-title mb-8">Keep reading</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="group overflow-hidden rounded-3xl border border-brand-line bg-brand-cream transition hover:shadow-card">
                  <span className="relative block aspect-[16/10] overflow-hidden">{r.image && <Image src={r.image} alt={r.imageAlt} fill sizes="33vw" className="object-cover transition duration-700 group-hover:scale-105" />}</span>
                  <span className="block p-5"><time className="text-xs font-bold uppercase tracking-widest text-brand-red">{r.date}</time><span className="mt-1 block text-lg font-bold leading-snug text-brand-green-dark group-hover:text-brand-red">{r.title}</span></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
