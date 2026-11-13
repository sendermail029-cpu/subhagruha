"use client";
import { useEffect, useState } from "react";
import type { Review } from "@/lib/reviews";

const initials = (n: string) => n.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]!.toUpperCase()).join("");

/** One review at a time, sliding to the next every few seconds. Pauses on hover. */
export default function ReviewCarousel({ reviews }: { reviews: Review[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = reviews.length;

  useEffect(() => {
    if (paused || n < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), 6000);
    return () => clearInterval(t);
  }, [paused, n, i]);

  if (!n) return null;
  const go = (d: number) => setI((x) => (x + d + n) % n);

  return (
    <div className="relative mx-auto max-w-4xl" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel" aria-label="Customer reviews">
      {/* slides */}
      <div className="relative overflow-hidden rounded-[2rem] bg-white shadow-[0_40px_80px_-40px_rgba(142,18,24,.45)] ring-1 ring-white">
        <div aria-hidden className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-brand-gold/15 blur-2xl" />
        <span aria-hidden className="pointer-events-none absolute left-6 top-0 select-none text-[10rem] leading-none text-brand-red/10 md:left-10" style={{ fontFamily: "var(--font-serif)" }}>“</span>
        <div className="flex transition-transform duration-700 ease-[cubic-bezier(.65,0,.35,1)]" style={{ transform: `translateX(-${i * 100}%)` }}>
          {reviews.map((r, k) => (
            <figure key={r.name + k} aria-hidden={k !== i} className="relative w-full shrink-0 px-7 pb-10 pt-14 text-center md:px-16 md:pb-12 md:pt-16">
              <div className="text-xl tracking-[4px] text-brand-gold" aria-label={`${r.rating ?? 5} out of 5 stars`}>
                {"★".repeat(r.rating ?? 5)}<span className="text-brand-line">{"★".repeat(5 - (r.rating ?? 5))}</span>
              </div>
              <blockquote className="mx-auto mt-6 max-w-2xl text-2xl leading-snug text-brand-ink md:text-[2rem]" style={{ fontFamily: "var(--font-serif)" }}>
                “{r.quote}”
              </blockquote>
              <figcaption className="mt-8 flex items-center justify-center gap-4">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-brand-red to-brand-green text-lg font-bold text-brand-gold shadow-lg ring-4 ring-brand-gold/30">{initials(r.name)}</span>
                <span className="text-left">
                  <b className="block text-lg text-brand-ink">{r.name}</b>
                  <span className="text-sm text-brand-muted">{[r.role, r.project, r.city].filter(Boolean).join(" · ")}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* controls */}
      {n > 1 && (
        <div className="mt-8 flex items-center justify-center gap-5">
          <button onClick={() => go(-1)} aria-label="Previous review" className="grid h-11 w-11 place-items-center rounded-full bg-white text-xl text-brand-ink shadow-md ring-1 ring-brand-line transition hover:bg-brand-red hover:text-white">‹</button>
          <div className="flex gap-2">
            {reviews.map((r, k) => (
              <button key={k} onClick={() => setI(k)} aria-label={`Show review ${k + 1}`} aria-current={k === i}
                className={`h-2 rounded-full transition-all duration-500 ${k === i ? "w-10 bg-brand-red" : "w-2 bg-brand-red/25 hover:bg-brand-red/50"}`} />
            ))}
          </div>
          <button onClick={() => go(1)} aria-label="Next review" className="grid h-11 w-11 place-items-center rounded-full bg-white text-xl text-brand-ink shadow-md ring-1 ring-brand-line transition hover:bg-brand-red hover:text-white">›</button>
        </div>
      )}
    </div>
  );
}
