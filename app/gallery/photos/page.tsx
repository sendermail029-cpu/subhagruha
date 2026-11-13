import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import GalleryTabs from "@/components/GalleryTabs";
import PageHero from "@/components/PageHero";
import { CLIP } from "@/lib/heroVideos";
import { HERO_IMG } from "@/lib/heroImages";
import Tilt from "@/components/Tilt";
import { ALBUMS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Photo Gallery – Subhagruha Project Site Photos",
  description: "Site photos of Subhagruha's ongoing and completed gated-community plot ventures in Hyderabad, Visakhapatnam and Vijayawada.",
  alternates: { canonical: "/gallery/photos" },
};

export default function PhotosPage() {
  return (
    <>
      <PageHero clips={[CLIP.childrenPark]} title="Photo" accent="Gallery" intro={`Site photos from ${ALBUMS.length} ventures`}
        crumbs={[{ name: "Gallery", path: "/gallery/photos" }, { name: "Photos", path: "/gallery/photos" }]} images={[HERO_IMG.photos]} />
      <section className="py-16">
        <div className="wrap grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ALBUMS.map((a) => (
            <Tilt key={a.slug} className="card-3d group overflow-hidden"><Link href={`/gallery/photos/${a.slug}`} className="block">
              <span className="relative block aspect-[4/3] overflow-hidden bg-brand-green-soft">
                <Image src={a.cover} alt={`${a.name} – Subhagruha site photo`} fill sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-bold text-white backdrop-blur">{a.images.length} photo{a.images.length === 1 ? "" : "s"}</span>
              </span>
              <span className="flex items-center justify-between gap-3 px-5 py-4">
                <span className="text-lg font-bold leading-snug text-brand-green-dark group-hover:text-brand-red">{a.name}</span>
                <span className="shrink-0 text-sm font-bold text-brand-red">View →</span>
              </span>
            </Link></Tilt>
          ))}
        </div>
      </section>
    </>
  );
}

