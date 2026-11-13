"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/projects";
import { openBooking } from "./BookingModal";

// Best full-width photo per project: a real site photo, else the campaign still, else a rendered view.
const OVERRIDE: Record<string, string> = {
  "sukrithi-pride": "/images/why-bg.webp",          // dusk aerial of Sukrithi Pride (from the project film)
  "sukrithi-windsor": "/videos/house.webp",          // no site photos yet – rendered villa view
};
const bgOf = (p: Project) =>
  OVERRIDE[p.slug] ??
  p.gallery.find((g) => g.caption === "Site Photo")?.src ??
  p.gallery.find((g) => g.caption === "Brand Campaign")?.src ??
  p.image;

/** Homepage banner: full-width slideshow of ongoing projects with details on the left and a thumbnail strip. */
export default function ProjectsHero({ projects }: { projects: Project[] }) {
  // featured first: Sukrithi Signature, then Sukrithi Pride, then the rest in their usual order
  const FIRST = ["subhagruha-sukrithi-signature-vijayawada", "sukrithi-pride"];
  const ongoing = projects.filter((p) => p.status === "Ongoing");
  const list = [...FIRST.map((slug) => ongoing.find((p) => p.slug === slug)).filter((p): p is Project => !!p), ...ongoing.filter((p) => !FIRST.includes(p.slug))];
  const n = list.length;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const strip = useRef<HTMLDivElement>(null);

  // keep the current project's thumbnail centred in the strip (scrolls only the strip, not the page)
  useEffect(() => {
    const box = strip.current;
    const el = box?.querySelector<HTMLElement>(`[data-thumb="${i}"]`);
    if (!box || !el) return;
    box.scrollTo({ left: el.offsetLeft - box.clientWidth / 2 + el.clientWidth / 2, behavior: "smooth" });
  }, [i]);

  useEffect(() => {
    if (paused || n < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), 6000);
    return () => clearInterval(t);
  }, [paused, n, i]);

  if (!n) return null;
  const p = list[i];
  const go = (d: number) => setI((x) => (x + d + n) % n);
  const rera = p.registrations.find((r) => /RERA/i.test(r.label)) ?? p.registrations[0];

  return (
    <section id="home" aria-roledescription="carousel" aria-label="Ongoing projects"
      className="relative isolate flex min-h-[640px] flex-col overflow-hidden bg-[#1a0506] text-white md:min-h-[680px] lg:h-[min(88vh,780px)]"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* background photo (cross-fade + slow zoom) */}
      {list.map((x, k) => (
        <div key={x.slug} aria-hidden className={`absolute inset-0 -z-20 transition-opacity duration-1000 ${k === i ? "opacity-100" : "opacity-0"}`}>
          {(k === i || k === (i + 1) % n) && (
            <Image src={bgOf(x)} alt="" fill sizes="100vw" priority={k === 0} className={`object-cover object-[70%_30%] md:object-center ${k === i ? "why-zoom" : ""}`} />
          )}
        </div>
      ))}
      <div aria-hidden className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-[#1a0506]/95 via-[#1a0506]/65 to-[#1a0506]/10 md:block" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-[#1a0506]/30 via-[#1a0506]/60 to-[#1a0506] md:hidden" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-[#1a0506] via-transparent to-[#1a0506]/30" />

      {/* slide content */}
      <div className="wrap flex flex-1 items-end pb-6 pt-40 md:items-center md:pb-8 md:pt-12">
        <div key={p.slug} className="max-w-2xl animate-[pageIn_.8s_cubic-bezier(.2,.7,.2,1)_both]">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] ring-1 ring-white/20 backdrop-blur">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> Ongoing
            </span>
            <span className="text-[12px] font-bold uppercase tracking-[0.22em] text-brand-gold">{p.city}</span>
          </div>

          <h1 className="mt-3 text-[2.05rem] font-semibold leading-[1.05] sm:text-[2.6rem] md:mt-5 [text-shadow:0_4px_24px_rgba(0,0,0,.45)] md:text-6xl lg:text-7xl">{p.name}</h1>
          <p className="mt-3 flex items-start gap-2 text-[14px] text-white/85 md:mt-4 md:items-center md:text-lg">
            <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-brand-gold" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
            {p.location}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5 md:mt-5 md:gap-2">
            {p.tags.slice(0, 3).map((t, ti) => (
              <span key={t} className={`rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold ring-1 ring-white/15 backdrop-blur md:px-3 md:text-[12px] ${ti === 2 ? "hidden sm:inline" : ""}`}>{t}</span>
            ))}
            {rera && <span className="rounded-full bg-brand-gold/90 px-2.5 py-1 text-[11px] font-bold text-[#1a0506] md:px-3 md:text-[12px]">{rera.label.replace(/ No\.?$/, "")}: {rera.value}</span>}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2.5 pr-14 sm:pr-0 md:mt-8 md:flex md:flex-wrap md:items-center md:gap-3">
            <Link href={`/projects/${p.slug}`} className="btn-red !px-4 !py-3 text-[13px] md:!px-7 md:!py-3.5 md:text-sm">View Project →</Link>
            <button type="button" onClick={() => openBooking(`${p.name} – ${p.city}`)}
              className="rounded-full px-4 py-3 text-[13px] font-bold text-white ring-1 ring-white/40 backdrop-blur transition hover:bg-white hover:text-brand-ink md:px-7 md:py-3.5 md:text-sm">
              Book Site Visit
            </button>
          </div>
        </div>

        {/* logo badge (desktop) */}
        <Link href={`/projects/${p.slug}`} key={`logo-${p.slug}`} aria-label={`${p.name} details`}
          className="ml-auto hidden h-40 w-56 shrink-0 animate-[pageIn_.9s_.15s_cubic-bezier(.2,.7,.2,1)_both] overflow-hidden rounded-3xl bg-white p-3 shadow-[0_30px_60px_-25px_rgba(0,0,0,.7)] ring-4 ring-white/30 lg:block">
          <span className="relative block h-full w-full"><Image src={p.image} alt={`${p.name} logo`} fill sizes="224px" className="object-contain" /></span>
        </Link>
      </div>

      {/* controls + thumbnails */}
      <div className="wrap pb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => go(-1)} aria-label="Previous project" className="hidden h-11 w-11 sm:grid shrink-0 place-items-center rounded-full bg-white/10 text-xl ring-1 ring-white/20 backdrop-blur transition hover:bg-white hover:text-brand-ink">‹</button>
          <div ref={strip} className="relative min-w-0 flex-1 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
            <ul className="flex w-max gap-2.5 px-6 py-1.5">
              {list.map((x, k) => (
                <li key={x.slug} data-thumb={k}>
                  <button onClick={() => setI(k)} aria-label={`Show ${x.name}`} aria-current={k === i}
                    className={`relative block h-12 w-20 overflow-hidden rounded-xl bg-white transition md:h-16 md:w-28 ${k === i ? "ring-2 ring-brand-gold ring-offset-2 ring-offset-[#1a0506]" : "opacity-55 hover:opacity-100"}`}>
                    <Image src={x.image} alt="" fill sizes="112px" className="object-contain p-1" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button onClick={() => go(1)} aria-label="Next project" className="hidden h-11 w-11 sm:grid shrink-0 place-items-center rounded-full bg-white/10 text-xl ring-1 ring-white/20 backdrop-blur transition hover:bg-white hover:text-brand-ink">›</button>
        </div>
        {/* progress bar */}
        <div className="mt-4 h-[3px] w-full overflow-hidden rounded-full bg-white/15">
          <div key={`${i}-${paused}`} className="h-full origin-left bg-gradient-to-r from-brand-red via-brand-orange to-brand-gold" style={{ animation: paused ? "none" : "heroProgress 6s linear both", transform: paused ? "scaleX(0)" : undefined }} />
        </div>
      </div>
    </section>
  );
}
