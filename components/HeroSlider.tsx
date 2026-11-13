"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HERO_SLIDES } from "@/lib/projects";

export default function HeroSlider() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % HERO_SLIDES.length), 5500);
    return () => clearInterval(t);
  }, [i]);

  return (
    <>
      {HERO_SLIDES.map((s, idx) => (
        <div key={s.src} className={`absolute inset-0 transition-opacity duration-1000 ${idx === i ? "slide-active opacity-100" : "opacity-0"}`} aria-hidden={idx !== i}>
          <Image src={s.src} alt={s.name} fill priority={idx === 0} sizes="100vw" className="slide-img object-cover" />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-green-deep/95 via-brand-green-deep/70 to-brand-green-deep/10" />
      <div className="absolute bottom-8 left-[4%] z-10 flex items-center gap-4">
        <div className="flex gap-2">
          {HERO_SLIDES.map((s, idx) => (
            <button key={s.src} onClick={() => setI(idx)} aria-label={`Show ${s.name}`} className={`h-1 rounded-full transition-all ${idx === i ? "w-14 bg-brand-gold" : "w-8 bg-white/40"}`} />
          ))}
        </div>
        <span className="hidden text-xs font-semibold uppercase tracking-[0.14em] text-white/80 sm:block">{HERO_SLIDES[i].name}</span>
      </div>
    </>
  );
}
