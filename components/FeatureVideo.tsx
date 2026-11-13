"use client";
import Image from "next/image";
import { useState } from "react";

/** Large YouTube video: shows a poster with a play button, loads the player only when clicked. */
export default function FeatureVideo({ id, title }: { id: string; title: string }) {
  const [play, setPlay] = useState(false);
  return (
    <div className="relative aspect-video overflow-hidden rounded-[1.75rem] bg-black shadow-[0_40px_80px_-35px_rgba(74,10,13,.6)] ring-1 ring-white/10">
      {play ? (
        <iframe src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`} title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
          className="absolute inset-0 h-full w-full border-0" />
      ) : (
        <button onClick={() => setPlay(true)} aria-label={`Play video: ${title}`} className="group absolute inset-0">
          <Image src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`} alt={title} fill sizes="(max-width:1024px) 100vw, 900px" className="object-cover transition duration-700 group-hover:scale-105" />
          <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20" />
          <span className="absolute inset-0 grid place-items-center">
            <span className="relative grid h-20 w-20 place-items-center rounded-full bg-brand-red text-white shadow-[0_0_0_14px_rgba(255,255,255,.18)] transition duration-300 group-hover:scale-110 md:h-24 md:w-24">
              <span className="absolute inset-0 animate-ping rounded-full bg-brand-red/40" />
              <svg viewBox="0 0 24 24" className="relative ml-1 h-8 w-8 md:h-10 md:w-10" fill="currentColor" aria-hidden><path d="M8 5v14l11-7z" /></svg>
            </span>
          </span>
          <span className="absolute inset-x-0 bottom-0 p-5 text-left text-white md:p-8">
            <span className="block text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-brand-gold">Watch</span>
            <span className="mt-1 block text-xl font-semibold md:text-2xl" style={{ fontFamily: "var(--font-serif)" }}>{title}</span>
          </span>
        </button>
      )}
    </div>
  );
}
