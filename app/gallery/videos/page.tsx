import type { Metadata } from "next";
import GalleryTabs from "@/components/GalleryTabs";
import PageHero from "@/components/PageHero";
import { CLIP } from "@/lib/heroVideos";
import { HERO_IMG } from "@/lib/heroImages";
import VideoGrid from "@/components/VideoGrid";
import { GALLERY_VIDEOS } from "@/lib/content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Video Gallery – Subhagruha Venture Walkthroughs & Ads",
  description: "Watch Subhagruha project walkthroughs and brand films: Sukrithi Pride, Aarunya, Samyuktha, Avanthika, Avanthi, Royal and more.",
  alternates: { canonical: "/gallery/videos" },
};

export default function VideosPage() {
  return (
    <>
      <PageHero clips={[CLIP.clubHouse]} title="Video" accent="Gallery" intro="Walkthroughs, drone views and brand films"
        crumbs={[{ name: "Gallery", path: "/gallery/photos" }, { name: "Videos", path: "/gallery/videos" }]} images={[HERO_IMG.videos]} />
      <section className="py-16">
        <div className="wrap">
          <VideoGrid videos={GALLERY_VIDEOS} />
          <div className="mt-12 text-center">
            <a href={SITE.social.youtube} target="_blank" rel="noopener noreferrer" className="btn-outline">More on our YouTube channel →</a>
          </div>
        </div>
      </section>
    </>
  );
}
