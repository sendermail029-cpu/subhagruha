import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import JsonLd from "@/components/JsonLd";
import LeadForm from "@/components/LeadForm";
import ProjectCard from "@/components/ProjectCard";
import { PinIcon } from "@/components/Icons";
import AmenityIcon from "@/components/AmenityIcon";
import { BookButton } from "@/components/BookingModal";
import CityProjects from "@/components/CityProjects";
import { CITIES, PROJECTS, getCity, getProject } from "@/lib/projects";
import { breadcrumbSchema, projectSchema } from "@/lib/schema";
import { SITE, waLink } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return [...CITIES.map((c) => ({ slug: c.slug })), ...PROJECTS.map((p) => ({ slug: p.slug }))];
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const slug = (await params).slug;
  const c = getCity(slug);
  if (c) {
    return {
      title: { absolute: c.seoTitle },
      description: c.seoDescription,
      keywords: c.keywords,
      alternates: { canonical: `/projects/${c.slug}` },
      openGraph: { type: "website", title: c.seoTitle, description: c.seoDescription, url: `${SITE.url}/projects/${c.slug}` },
    };
  }
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: { absolute: p.seoTitle },
    description: p.seoDescription,
    keywords: p.keywords,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: {
      type: "website",
      title: p.seoTitle,
      description: p.seoDescription,
      url: `${SITE.url}/projects/${p.slug}`,
      images: [{ url: p.image, alt: p.name }],
    },
    twitter: { card: "summary_large_image", title: p.seoTitle, description: p.seoDescription, images: [p.image] },
  };
}

export default async function ProjectPage({ params }: Params) {
  const slug = (await params).slug;
  const city = getCity(slug);
  if (city) return <CityProjects city={city} />;
  const p = getProject(slug);
  if (!p) notFound();
  const cityInfo = CITIES.find((c) => c.name === p.city)!;
  const others = PROJECTS.filter((x) => x.slug !== p.slug).sort((a, b) => Number(b.city === p.city) - Number(a.city === p.city)).slice(0, 3);

  return (
    <>
      <JsonLd data={projectSchema(p)} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Projects", path: "/projects" }, { name: p.name, path: `/projects/${p.slug}` }])} />

      {/* hero */}
      <section className="relative overflow-hidden bg-brand-green-deep text-white">
        <Image src={p.image} alt={`${p.name} – plots in ${p.area}, ${p.city}`} fill priority sizes="100vw" className="object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-green-deep via-brand-green-deep/60 to-transparent" />
        <div className="wrap relative py-24 md:py-32">
          <nav aria-label="Breadcrumb" className="mb-5 text-sm text-white/70">
            <Link href="/" className="hover:text-brand-gold">Home</Link> / <Link href="/projects" className="hover:text-brand-gold">Projects</Link> / <Link href={`/projects/${cityInfo.slug}`} className="hover:text-brand-gold">{p.city}</Link> / <span className="text-white">{p.name}</span>
          </nav>
          <span className="eyebrow !text-brand-gold">{p.city} · {p.status}</span>
          <h1 className="mt-3 max-w-4xl text-5xl font-bold leading-[1.05] md:text-6xl">{p.name}</h1>
          <p className="mt-3 flex items-center gap-2 text-lg text-white/85"><PinIcon className="h-5 w-5 shrink-0 text-brand-gold" />{p.location}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {p.registrations.filter((r) => r.label.includes("RERA")).slice(0, 2).map((r, i) => (
              <span key={i} className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur">{r.label}: <span className="text-brand-gold">{r.value}</span></span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <BookButton project={`${p.name} – ${p.city}`} className="btn-red">Book Site Visit</BookButton>
            <a href={waLink(`Hi, please send me the brochure, price sheet and layout for ${p.name}, ${p.city}.`)} target="_blank" rel="noopener noreferrer" className="btn-ghost">Get Brochure on WhatsApp</a>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="wrap grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <h2 className="section-title !text-4xl">Project Overview</h2>
            <p className="mt-3 text-[17px] text-brand-muted">{p.summary}</p>
            <div className="mt-5 flex flex-wrap gap-2">{p.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>

            <h2 className="mt-12 flex items-center gap-3 font-sans text-xl font-bold text-brand-green-dark"><span className="h-0.5 w-6 bg-brand-red" />Salient Features</h2>
            <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {p.amenities.map((a) => (
                <li key={a} className="group flex flex-col items-center gap-3 rounded-2xl bg-white px-3 py-5 text-center shadow-[0_14px_30px_-22px_rgba(74,10,13,.45)] ring-1 ring-brand-line transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-22px_rgba(74,10,13,.55)]">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-red-soft to-[#FFF2DC] text-brand-red transition duration-300 group-hover:from-brand-red group-hover:to-brand-orange group-hover:text-white">
                    <AmenityIcon name={a} className="h-7 w-7" />
                  </span>
                  <span className="text-[14px] font-semibold leading-snug text-brand-ink">{a}</span>
                </li>
              ))}
            </ul>

            <h2 className="mt-12 flex items-center gap-3 font-sans text-xl font-bold text-brand-green-dark"><span className="h-0.5 w-6 bg-brand-red" />Location Highlights</h2>
            <ul className="mt-4 space-y-2.5">
              {p.highlights.map((h) => <li key={h} className="flex gap-3"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-red" />{h}</li>)}
            </ul>

            <h2 className="mb-4 mt-12 flex items-center gap-3 font-sans text-xl font-bold text-brand-green-dark"><span className="h-0.5 w-6 bg-brand-red" />Layout Plan, Location Map & Gallery</h2>
            <Gallery items={p.gallery} name={p.name} />
            {p.mapUrl && <a href={p.mapUrl} target="_blank" rel="noopener noreferrer" className="btn-outline mt-5">Open location in Google Maps →</a>}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-brand-line bg-white p-6">
              <h2 className="mb-3 font-sans text-lg font-bold text-brand-green-dark">Approvals & RERA</h2>
              <dl className="rounded-xl border border-dashed border-brand-orange bg-brand-cream p-4 text-sm">
                {p.registrations.map((r, i) => (
                  <div key={i} className="flex justify-between gap-3 py-1">
                    <dt className="font-semibold text-brand-muted">{r.label}</dt>
                    <dd className="break-all text-right font-extrabold text-brand-green-dark">{r.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-4 grid gap-2">
                {SITE.phones.map((ph) => <a key={ph.dial} href={`tel:${ph.dial}`} className="btn-green">Call {ph.display}</a>)}
              </div>
            </div>
            <div id="book" className="scroll-mt-24 rounded-3xl bg-white p-6 shadow-card">
              <h2 className="text-3xl font-bold text-brand-green-dark">Book a Site Visit</h2>
              <p className="mb-4 text-sm text-brand-muted">Visit {p.name} with our team.</p>
              <LeadForm variant="appointment" defaultProject={`${p.name} – ${p.city}`} />
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="wrap">
          <span className="eyebrow">You may also like</span>
          <h2 className="section-title mb-10">Other Subhagruha projects</h2>
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">{others.map((o) => <ProjectCard key={o.slug} p={o} />)}</div>
        </div>
      </section>
    </>
  );
}
