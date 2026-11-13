"use client";
import Image from "next/image";
import { useState } from "react";
import type { Video } from "@/lib/content";
import { PlayIcon } from "./Icons";

export default function VideoGrid({ videos }: { videos: Video[] }) {
  const [playing, setPlaying] = useState<string | null>(null);
  return (
    <div className="grid gap-7 md:grid-cols-2">
      {videos.map((v) => (
        <figure key={v.id} className="overflow-hidden rounded-3xl border border-brand-line bg-white">
          <div className="relative aspect-video bg-black">
            {playing === v.id ? (
              <iframe src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`} title={v.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="absolute inset-0 h-full w-full" />
            ) : (
              <button onClick={() => setPlaying(v.id)} aria-label={`Play: ${v.title}`} className="group absolute inset-0">
                <Image src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`} alt={v.title} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-70" />
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-brand-red text-white shadow-[0_0_0_12px_rgba(255,255,255,.2)] transition group-hover:scale-110"><PlayIcon className="ml-1 h-6 w-6" /></span>
                </span>
              </button>
            )}
          </div>
          <figcaption className="px-5 py-4 text-lg font-bold leading-snug text-brand-green-dark">{v.title}</figcaption>
        </figure>
      ))}
    </div>
  );
}
