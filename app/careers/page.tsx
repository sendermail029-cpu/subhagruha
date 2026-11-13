import type { Metadata } from "next";
import CareerForm from "@/components/CareerForm";
import PageHero from "@/components/PageHero";
import { CLIP } from "@/lib/heroVideos";
import { HERO_IMG } from "@/lib/heroImages";
import { JOBS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Careers – Jobs at Subhagruha Group",
  description: "Build your career with Subhagruha, a leading real estate company. Current openings: Civil Engineer (Plotting Development) and Sales & Marketing Executive in Hyderabad.",
  alternates: { canonical: "/careers" },
};

const fmt = (d: string) => new Date(d + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function CareersPage() {
  return (
    <>
      <PageHero clips={[CLIP.shakeHand]} title="Build your" accent="career" intro="Join the Subhagruha family"
        crumbs={[{ name: "Careers", path: "/careers" }]} images={[HERO_IMG.careers]} />

      <section className="py-16">
        <div className="wrap">
          <span className="eyebrow">Open positions</span>
          <h2 className="section-title mb-8">Current openings</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {JOBS.map((j) => (
              <article key={j.position} className="rounded-3xl border border-brand-line bg-white p-6">
                <span className="chip">{j.department}</span>
                <h3 className="mt-3 text-2xl font-bold leading-tight text-brand-green-dark">{j.position}</h3>
                <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                  <div><dt className="text-xs font-bold uppercase tracking-wider text-brand-muted">Experience</dt><dd className="font-semibold">{j.experience}</dd></div>
                  <div><dt className="text-xs font-bold uppercase tracking-wider text-brand-muted">Vacancies</dt><dd className="font-semibold">{j.vacancies}</dd></div>
                  <div><dt className="text-xs font-bold uppercase tracking-wider text-brand-muted">Location</dt><dd className="font-semibold">{j.location}</dd></div>
                  <div><dt className="text-xs font-bold uppercase tracking-wider text-brand-muted">Apply by</dt><dd className="font-semibold text-brand-red">{fmt(j.lastDate)}</dd></div>
                </dl>
                <a href="#apply" className="btn-green mt-6 w-full">Apply now</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="apply" className="scroll-mt-24 bg-white py-16">
        <div className="wrap max-w-3xl">
          <span className="eyebrow">Apply</span>
          <h2 className="section-title mb-8">Send us your application</h2>
          <CareerForm positions={JOBS.map((j) => j.position)} />
        </div>
      </section>
    </>
  );
}
