"use client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { Brochure, BrochureKind } from "@/lib/content";

type Group = { city: string; image?: string; items: Brochure[] };
type Kind = "All" | BrochureKind;

const KINDS: Kind[] = ["All", "Brochure", "Layout Plan", "RERA Certificate"];

// per-type look: paper colour, accent, label
const LOOK: Record<BrochureKind, { stage: string; chip: string }> = {
  Brochure: { stage: "bg-[radial-gradient(circle_at_50%_120%,#ffd9c2,transparent_60%),linear-gradient(135deg,#fff4ea,#ffe3dc)]", chip: "bg-brand-red text-white" },
  "Layout Plan": { stage: "bg-[radial-gradient(circle_at_50%_120%,#ffe7a8,transparent_60%),linear-gradient(135deg,#fff8e6,#fdeccc)]", chip: "bg-brand-orange text-white" },
  "RERA Certificate": { stage: "bg-[radial-gradient(circle_at_50%_120%,#c9efd8,transparent_60%),linear-gradient(135deg,#f0fbf4,#dcf3e5)]", chip: "bg-brand-leaf text-white" },
};

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></svg>
);
const DownIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden><path d="M12 4v11m0 0l-4.5-4.5M12 15l4.5-4.5M5 20h14" /></svg>
);

/** small stable hash so each document gets its own plot pattern */
const seed = (t: string) => { let h = 7; for (const ch of t) h = (h * 31 + ch.charCodeAt(0)) >>> 0; return h; };

export default function BrochureExplorer({ groups }: { groups: Group[] }) {
  const [city, setCity] = useState("All");
  const [kind, setKind] = useState<Kind>("All");
  const [q, setQ] = useState("");
  useEffect(() => {
    const on = (e: Event) => setQ((e as CustomEvent<string>).detail ?? "");
    window.addEventListener("brochure-search", on);
    return () => window.removeEventListener("brochure-search", on);
  }, []);

  // every document tagged with its city, so "All" can mix locations
  const items = useMemo(() => groups.flatMap((g) => g.items.map((b) => ({ ...b, city: g.city }))), [groups]);
  const inCity = useMemo(() => items.filter((b) => city === "All" || b.city === city), [items, city]);
  const list = useMemo(() => {
    const t = q.toLowerCase().trim();
    return inCity.filter((b) => (kind === "All" || b.kind === kind) && (!t || b.title.toLowerCase().includes(t)));
  }, [inCity, kind, q]);
  const tabs = ["All", ...groups.map((g) => g.city)];

  return (
    <>
      {/* one slim toolbar: locations left, types right */}
      <div className="flex flex-col gap-4 border-b border-brand-line pb-1 md:flex-row md:items-end md:justify-between" data-aos="fade-up">
        <div role="tablist" aria-label="Location" className="flex flex-wrap gap-x-7 gap-y-1">
          {tabs.map((t) => {
            const on = t === city;
            return (
              <button key={t} role="tab" aria-selected={on} onClick={() => { setCity(t); setKind("All"); }}
                className={`relative pb-3 text-[15px] font-semibold transition ${on ? "text-brand-ink" : "text-brand-muted hover:text-brand-ink"}`}>
                {t === "All" ? "All" : t}
                <span className={`absolute inset-x-0 bottom-[-5px] h-[2px] bg-brand-red transition-transform duration-300 ${on ? "scale-x-100" : "scale-x-0"}`} />
              </button>
            );
          })}
        </div>
        <div aria-label="Document type" className="flex flex-wrap gap-x-5 gap-y-1 pb-3 text-[13px]">
          {KINDS.map((k) => (
            <button key={k} onClick={() => setKind(k)} aria-pressed={kind === k}
              className={`flex items-center gap-1.5 font-medium transition ${kind === k ? "text-brand-red" : "text-brand-muted hover:text-brand-ink"}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${kind === k ? "bg-brand-red" : "bg-brand-line"}`} />
              {k === "All" ? "All types" : k === "RERA Certificate" ? "RERA" : k === "Layout Plan" ? "Layouts" : "Brochures"}
            </button>
          ))}
        </div>
      </div>

      {/* documents */}
      {list.length ? (
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((b, i) => {
            const L = LOOK[b.kind];
            const pdf = /\.pdf$/i.test(b.file);
            return (
              <li key={`${b.city}-${b.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-3xl bg-white [content-visibility:auto] [contain-intrinsic-size:auto_340px] shadow-[0_20px_45px_-28px_rgba(74,10,13,.5)] ring-1 ring-brand-line transition duration-300 hover:-translate-y-2 hover:shadow-[0_30px_60px_-28px_rgba(74,10,13,.6)]">
                {/* document preview: brochure booklet / blueprint / certificate */}
                <div className={`relative flex h-44 items-center justify-center overflow-hidden ${L.stage}`} style={{ perspective: "900px" }}>
                  {b.kind === "Brochure" && (
                    <div className="relative h-36 w-28 transition duration-500 [transform:rotateY(-24deg)_rotateX(6deg)] group-hover:[transform:rotateY(-8deg)_rotateX(2deg)_translateY(-4px)]" style={{ transformStyle: "preserve-3d" }}>
                      {/* page edges */}
                      <span className="absolute inset-y-1 -right-1.5 w-3 rounded-r bg-[repeating-linear-gradient(90deg,#fff_0_1px,#e8e2d8_1px_2px)] shadow" />
                      <div className="absolute inset-0 overflow-hidden rounded-r-md rounded-l-sm bg-white shadow-[8px_12px_24px_-6px_rgba(0,0,0,.45)]">
                        {b.cover ? <Image src={b.cover} alt="" fill sizes="112px" className="object-cover" /> : <span className="grid h-full place-items-center bg-gradient-to-br from-brand-red to-brand-green p-3 text-center text-xs font-extrabold leading-tight text-white">{b.title}</span>}
                        <span className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/35 via-black/10 to-transparent" />
                        <span className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/30" />
                      </div>
                    </div>
                  )}
                  {b.kind === "Layout Plan" && (() => {
                    const h = seed(b.slug);
                    const cols = 4 + (h % 3);           // 4–6 columns
                    const road = 1 + (h % (cols - 1));  // where the main road runs
                    const sold = new Set([h % 11, (h >> 3) % 13, (h >> 5) % 17]);
                    return (
                      <div className="relative h-32 w-48 rotate-[-3deg] overflow-hidden rounded-md bg-[#163a6b] shadow-[8px_12px_24px_-8px_rgba(0,0,0,.5)] transition duration-500 group-hover:rotate-0 group-hover:scale-105">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.10)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.10)_1px,transparent_1px)] bg-[size:8px_8px]" />
                        {/* plots */}
                        <div className="absolute inset-y-2 left-2 right-[4.25rem] grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: "repeat(4, 1fr)" }}>
                          {Array.from({ length: cols * 4 }, (_, k) => {
                            const isRoad = k % cols === road;
                            return <span key={k} className={isRoad ? "bg-white/10" : `rounded-[2px] border border-white/50 ${sold.has(k) ? "bg-brand-gold/70" : ""}`} />;
                          })}
                        </div>
                        {/* title block with project logo */}
                        <div className="absolute inset-y-2 right-2 flex w-14 flex-col items-center justify-between rounded-sm border border-white/50 bg-white/95 p-1">
                          <span className="relative block h-9 w-full overflow-hidden rounded-[2px] bg-white">
                            {b.cover && <Image src={b.cover} alt="" fill sizes="56px" className="object-contain" />}
                          </span>
                          <span className="line-clamp-3 text-center text-[6.5px] font-bold uppercase leading-tight text-[#163a6b]">{b.title}</span>
                          <span className="rounded-[2px] bg-brand-gold px-1 text-[6px] font-black text-[#163a6b]">LAYOUT</span>
                        </div>
                        <span className="absolute bottom-1 left-2 text-[7px] font-bold tracking-widest text-white/60">N ↑</span>
                      </div>
                    );
                  })()}
                  {b.kind === "RERA Certificate" && (
                    <div className="relative h-32 w-48 rotate-[2deg] rounded-md border-[5px] border-double border-brand-gold bg-[#fffdf6] px-3 pt-2 text-center shadow-[8px_12px_24px_-8px_rgba(0,0,0,.45)] transition duration-500 group-hover:rotate-0 group-hover:scale-105">
                      <span className="pointer-events-none absolute inset-1 rounded-sm border border-brand-gold/40" />
                      <span className="relative mx-auto block h-8 w-16 overflow-hidden">
                        {b.cover && <Image src={b.cover} alt="" fill sizes="64px" className="object-contain" />}
                      </span>
                      <p className="mt-0.5 font-display text-[8.5px] font-extrabold uppercase tracking-[0.16em] text-brand-leaf-dark">Certificate of Registration</p>
                      <p className="mx-auto mt-0.5 line-clamp-1 max-w-[9rem] font-display text-[11px] font-bold italic text-brand-ink">{b.title}</p>
                      <span className="mx-auto mt-1.5 block h-px w-24 bg-brand-line" />
                      <p className="mt-0.5 text-[6.5px] uppercase tracking-widest text-brand-muted">{b.city === "Hyderabad" ? "TS RERA" : "AP RERA"} · Real Estate Regulatory Authority</p>
                      <span className="absolute -bottom-3 -right-3 grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-brand-gold to-brand-orange text-[9px] font-black text-white shadow-lg ring-4 ring-white">RERA</span>
                    </div>
                  )}
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-brand-ink shadow-sm backdrop-blur">{b.kind}</span>
                  <span className={`absolute right-3 top-3 rounded-full px-2 py-1 text-[10px] font-black ${L.chip}`}>{pdf ? "PDF" : "IMG"}</span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-sans text-[15px] font-bold leading-snug text-brand-ink">{b.title}</h3>
                  <p className="mt-1 text-xs text-brand-muted">{b.city}</p>
                  <div className="mt-auto grid grid-cols-2 gap-2 pt-4">
                    <a href={b.file} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 rounded-full py-2.5 text-sm font-bold text-brand-ink ring-1 ring-brand-line transition hover:bg-brand-cream hover:ring-brand-red/40">
                      <EyeIcon /> View
                    </a>
                    <a href={b.file} download target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-brand-leaf to-brand-leaf-dark py-2.5 text-sm font-bold text-white shadow-[0_8px_18px_-8px_rgba(20,107,57,.7)] transition hover:brightness-110">
                      <DownIcon /> Download
                    </a>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="mt-8 rounded-3xl border-2 border-dashed border-brand-line bg-white p-12 text-center">
          <p className="text-4xl">🔍</p>
          <p className="mt-3 font-bold text-brand-ink">No documents match “{q}”.</p>
          <button onClick={() => { setQ(""); setKind("All"); }} className="mt-3 text-sm font-bold text-brand-red hover:underline">Clear filters</button>
        </div>
      )}
    </>
  );
}
