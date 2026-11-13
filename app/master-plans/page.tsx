import type { Metadata } from "next";
import MasterPlanExplorer from "@/components/MasterPlanExplorer";
import PageHero from "@/components/PageHero";
import { CLIP } from "@/lib/heroVideos";
import { MASTER_PLANS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Master Plans – HMDA 2031, VMRDA 2041 & Amaravati CRDA",
  description: "View HMDA 2031 master plans for Hyderabad mandals, VMRDA 2041 master plans for Visakhapatnam & Vizianagaram, and the Amaravati capital city master plan.",
  alternates: { canonical: "/master-plans" },
};

// Banner slideshow: real master plan maps (local previews built by scripts/master-plan-thumbs.mjs)
const SLIDES = ["1648198185", "1656876927", "1700819858", "1774287135"].map((n) => `/master-plans/${n}.webp`);

export default function MasterPlansPage() {
  return (
    <>
      <PageHero clips={[CLIP.city]} title="Master" accent="Plans" intro="HMDA 2031 · VMRDA 2041 · Amaravati CRDA"
        crumbs={[{ name: "Master Plans", path: "/master-plans" }]} slides={SLIDES} />
      <section className="py-16">
        <div className="wrap"><MasterPlanExplorer plans={MASTER_PLANS} /></div>
      </section>
    </>
  );
}
