import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { CLIP } from "@/lib/heroVideos";
import { HERO_IMG } from "@/lib/heroImages";
import Tilt from "@/components/Tilt";
import { POSTS, isoDate } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog – Real Estate Insights for Hyderabad, Vizag & Vijayawada",
  description: "Subhagruha blog: guides to buying RERA-approved plots, NRI investment, RRR, Bhogapuram airport, master plans and growth corridors in Hyderabad, Visakhapatnam and Vijayawada.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const [lead, ...rest] = POSTS;
  return (
    <>
      <PageHero clips={[CLIP.roundabout]} title="Our" accent="Blog" intro="Insights, guides and project news"
        crumbs={[{ name: "Blog", path: "/blog" }]} images={[HERO_IMG.blog]} />
      <section className="py-16">
        <div className="wrap">
          {lead && (
            <Link href={`/blog/${lead.slug}`} className="card-3d group mb-12 grid overflow-hidden lg:grid-cols-2">
              <span className="relative block aspect-[16/10] overflow-hidden bg-brand-green-soft lg:aspect-auto">
                {lead.image && <Image src={lead.image} alt={lead.imageAlt} fill priority sizes="(max-width:1024px) 100vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />}
              </span>
              <span className="flex flex-col justify-center p-7 md:p-10">
                <span className="text-xs font-extrabold uppercase tracking-widest text-brand-red">Latest · <time dateTime={isoDate(lead.date)}>{lead.date}</time></span>
                <span className="mt-3 font-display text-3xl font-bold leading-tight text-brand-green-dark group-hover:text-brand-red md:text-4xl">{lead.title}</span>
                <span className="mt-4 text-brand-muted">{lead.excerpt}</span>
                <span className="mt-6 text-sm font-bold text-brand-green">Read article →</span>
              </span>
            </Link>
          )}
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <Tilt key={p.slug} max={7} className="card-3d group overflow-hidden"><Link href={`/blog/${p.slug}`} className="flex h-full flex-col">
                <span className="relative block aspect-[16/10] overflow-hidden bg-brand-green-soft">
                  {p.image && <Image src={p.image} alt={p.imageAlt} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />}
                </span>
                <span className="flex flex-1 flex-col p-6">
                  <time dateTime={isoDate(p.date)} className="text-xs font-bold uppercase tracking-widest text-brand-red">{p.date}</time>
                  <span className="mt-2 text-xl font-bold leading-snug text-brand-green-dark group-hover:text-brand-red">{p.title}</span>
                  <span className="mt-3 line-clamp-3 text-sm text-brand-muted">{p.excerpt}</span>
                  <span className="mt-auto pt-5 text-sm font-bold text-brand-green">Read more →</span>
                </span>
              </Link></Tilt>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
