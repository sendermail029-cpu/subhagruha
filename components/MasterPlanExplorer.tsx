"use client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { MasterPlan, Region } from "@/lib/content";

const REGIONS: Region[] = ["Hyderabad", "Visakhapatnam", "Vijayawada"];

export default function MasterPlanExplorer({ plans }: { plans: MasterPlan[] }) {
  const [region, setRegion] = useState<Region>("Hyderabad");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<MasterPlan | null>(null);
  const list = useMemo(() => plans.filter((p) => p.region === region && p.name.toLowerCase().includes(q.toLowerCase().trim())), [plans, region, q]);

  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  return (
    <>
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div role="tablist" className="flex flex-wrap gap-2">
          {REGIONS.map((r) => (
            <button key={r} role="tab" aria-selected={region === r} onClick={() => setRegion(r)}
              className={`rounded-full border-[1.5px] px-5 py-2.5 text-sm font-bold transition ${region === r ? "border-brand-green bg-brand-green text-white" : "border-brand-line bg-white text-brand-muted hover:border-brand-green hover:text-brand-green"}`}>
              {r} <span className="opacity-70">({plans.filter((p) => p.region === r).length})</span>
            </button>
          ))}
        </div>
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Find a mandal / area…" aria-label="Filter master plans"
          className="h-11 w-full rounded-full border border-brand-line bg-white px-5 text-sm outline-none focus:border-brand-green sm:w-72" />
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {list.map((p) =>
          p.isPdf ? (
            <a key={p.url} href={p.url} target="_blank" rel="noopener noreferrer" className="group flex flex-col overflow-hidden rounded-2xl border border-brand-line bg-white transition hover:-translate-y-1 hover:shadow-card">
              <span className="grid aspect-[4/3] place-items-center bg-brand-red-soft text-3xl font-black text-brand-red">PDF</span>
              <span className="p-3.5"><span className="block text-sm font-bold leading-snug text-brand-green-dark group-hover:text-brand-red">{p.name}</span><span className="text-[0.6875rem] font-bold uppercase tracking-wider text-brand-muted">{p.authority}</span></span>
            </a>
          ) : (
            <button key={p.url} onClick={() => setOpen(p)} className="group flex flex-col overflow-hidden rounded-2xl border border-brand-line bg-white text-left transition hover:-translate-y-1 hover:shadow-card">
              <span className="relative block aspect-[4/3] w-full overflow-hidden bg-brand-green-soft">
                <Image src={p.thumb ?? p.url} alt={p.name} fill sizes="(max-width:768px) 50vw, 25vw" className="object-cover transition duration-500 group-hover:scale-105" />
              </span>
              <span className="p-3.5"><span className="block text-sm font-bold leading-snug text-brand-green-dark group-hover:text-brand-red">{p.name}</span><span className="text-[0.6875rem] font-bold uppercase tracking-wider text-brand-muted">{p.authority}</span></span>
            </button>
          ),
        )}
      </div>
      {!list.length && <p className="rounded-2xl border border-dashed border-brand-line p-10 text-center text-brand-muted">No master plans match “{q}”.</p>}

      {open && (
        <div role="dialog" aria-modal aria-label={open.name} onClick={() => setOpen(null)} className="fixed inset-0 z-[100] flex cursor-zoom-out flex-col items-center justify-center gap-3 bg-black/90 p-4">
          <Image src={open.thumb ?? open.url} alt={open.name} width={1000} height={720} unoptimized className="max-h-[82vh] w-auto rounded-lg object-contain" />
          <div className="flex items-center gap-3 text-white" onClick={(e) => e.stopPropagation()}>
            <b>{open.name}</b>
            <a href={open.url} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white px-4 py-1.5 text-sm font-bold text-brand-green-dark">Open full size ↗</a>
          </div>
          <button className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white text-2xl" aria-label="Close">×</button>
        </div>
      )}
    </>
  );
}
