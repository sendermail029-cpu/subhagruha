import type { Metadata } from "next";
import ProjectExplorer from "@/components/ProjectExplorer";
import JsonLd from "@/components/JsonLd";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { CLIP } from "@/lib/heroVideos";
import { HERO_IMG } from "@/lib/heroImages";
import { CITIES, PROJECTS } from "@/lib/projects";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ongoing Projects – RERA Approved Plots in Hyderabad, Vijayawada & Vizag",
  description:
    "Explore Subhagruha's ongoing RERA-approved gated community plot projects: Tree Shades (Shadnagar), Sukrithi Pride (Sadashivpet), Sukrithi Signature (Nunna), Ananda Phase II, Sukrithi Aria and Sukrithi Saanvi Phase 4 (Vizag).",
  alternates: { canonical: "/projects" },
};

const itemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: PROJECTS.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.name, url: `${SITE.url}/projects/${p.slug}` })),
};

export default function ProjectsPage() {
  return (
    <>
      <JsonLd data={itemList} />
      <PageHero clips={[CLIP.openPlot]} title="Our" accent="Projects" intro="RERA approved plots in Hyderabad, Vizag & Vijayawada"
        crumbs={[{ name: "Projects", path: "/projects" }]} images={[HERO_IMG.projects]} />
      <section className="py-16"><div className="wrap"><ProjectExplorer /></div></section>
    </>
  );
}
