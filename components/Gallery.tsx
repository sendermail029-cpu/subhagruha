"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Gallery({ items, name }: { items: { caption: string; src: string }[]; name: string }) {
  const [open, setOpen] = useState<string | null>(null);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);
  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {items.map((g, i) => (
          <button key={i} onClick={() => setOpen(g.src)} className="group overflow-hidden rounded-2xl border border-brand-line bg-white text-left">
            <span className="relative block aspect-[4/3] overflow-hidden">
              <Image src={g.src} alt={`${name} – ${g.caption}`} fill sizes="(max-width:768px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" />
            </span>
            <span className="block px-3 py-2 text-xs font-bold text-brand-green-dark">{g.caption}</span>
          </button>
        ))}
      </div>
      {open && (
        <div role="dialog" aria-modal onClick={() => setOpen(null)} className="fixed inset-0 z-[100] grid cursor-zoom-out place-items-center bg-black/90 p-4">
          <Image src={open} alt={name} width={1600} height={1200} className="max-h-[90vh] w-auto rounded-lg object-contain" />
          <button className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white text-2xl" aria-label="Close">×</button>
        </div>
      )}
    </>
  );
}
