import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import LeadForm from "@/components/LeadForm";
import PageHero from "@/components/PageHero";
import { CITY_CLIPS } from "@/lib/heroVideos";
import ProjectCard from "@/components/ProjectCard";
import Tilt from "@/components/Tilt";
import { CITIES, PROJECTS, type CityInfo } from "@/lib/projects";
import { SITE } from "@/lib/site";

export default function CityProjects({ city }: { city: CityInfo }) {
  const ongoing = PROJECTS.filter((p) => p.city === city.name);
  const path = `/projects/${city.slug}`;
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Subhagruha projects in ${city.name}`,
    itemListElement: ongoing.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.name, url: `${SITE.url}/projects/${p.slug}` })),
  };

  return (
    <>
      <JsonLd data={itemList} />
      <PageHero clips={CITY_CLIPS[city.slug] ?? []} title="Plots in" accent={city.name} intro={`${city.approvals} approved`}
        crumbs={[{ name: "Projects", path: "/projects" }, { name: city.name, path }]}
        images={ongoing.map((p) => p.gallery.find((g) => g.caption === "Site Photo")?.src ?? p.image)} />

      <section className="py-16">
        <div className="wrap">
          <span className="eyebrow">Ongoing</span>
          <h2 className="section-title">Ongoing projects in {city.name}</h2>
          <p className="mb-10 mt-3 max-w-3xl text-brand-muted">
            <b className="text-brand-ink">{city.heading}.</b> {city.intro}{" "}
            <span className="font-semibold text-brand-green">{ongoing.length} ongoing · {city.completed.length} completed.</span>
          </p>
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {ongoing.map((p) => <ProjectCard key={p.slug} p={p} />)}
          </div>
        </div>
      </section>

      <section id="completed" className="scroll-mt-24 bg-white py-16">
        <div className="wrap">
          <span className="eyebrow">Delivered</span>
          <h2 className="section-title mb-10">Completed projects in {city.name}</h2>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {city.completed.map((c) => (
              <Tilt key={c.name} max={8} className="card-3d group overflow-hidden !rounded-2xl"><figure>
                <div className="relative aspect-[4/3] overflow-hidden bg-brand-green-soft">
                  <Image src={c.image} alt={`${c.name} – completed Subhagruha project in ${city.name}`} fill sizes="(max-width:768px) 50vw, 25vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  <span className="absolute left-2.5 top-2.5 rounded-full bg-brand-green px-2.5 py-0.5 text-[0.625rem] font-extrabold uppercase tracking-wider text-white">✓ Completed</span>
                </div>
                <figcaption className="px-4 py-3 text-[0.9375rem] font-bold leading-snug text-brand-green-dark">{c.name}</figcaption>
              </figure></Tilt>
            ))}
          </div>
        </div>
      </section>

      <section id="book" className="scroll-mt-24 py-16">
        <div className="wrap max-w-3xl">
          <div className="card-3d p-6 md:p-8">
            <h2 className="text-3xl font-bold text-brand-green-dark">Book a site visit in {city.name}</h2>
            <p className="mb-4 text-sm text-brand-muted">Choose a project and slot. Our team will confirm and arrange pick-up.</p>
            <LeadForm variant="appointment" defaultProject={ongoing[0] ? `${ongoing[0].name} – ${city.name}` : undefined} />
          </div>
        </div>
      </section>
    </>
  );
}
