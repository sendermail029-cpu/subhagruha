"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { CITIES, PROJECTS } from "@/lib/projects";

type Hit = { key: string; name: string; sub: string; href: string; image?: string; badge: "Ongoing" | "Completed" | "City"; text: string };

const INDEX: Hit[] = [
  ...PROJECTS.map((p) => ({
    key: p.slug, name: p.name, sub: p.location, href: `/projects/${p.slug}`, image: p.image, badge: "Ongoing" as const,
    text: [p.name, p.location, p.city, p.area, ...p.tags, ...p.registrations.map((r) => r.value)].join(" ").toLowerCase(),
  })),
  ...CITIES.map((c) => ({
    key: `city-${c.slug}`, name: `All projects in ${c.name}`, sub: c.approvals, href: `/projects/${c.slug}`, badge: "City" as const,
    text: `${c.name} ${c.name === "Visakhapatnam" ? "vizag" : ""} ${c.approvals}`.toLowerCase(),
  })),
  ...CITIES.flatMap((c) => c.completed.map((p) => ({
    key: `done-${c.slug}-${p.name}`, name: p.name, sub: `${c.name} · Completed`, href: `/projects/${c.slug}#completed`, image: p.image, badge: "Completed" as const,
    text: `${p.name} ${c.name} ${c.name === "Visakhapatnam" ? "vizag" : ""}`.toLowerCase(),
  }))),
];

function search(q: string) {
  const terms = q.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return INDEX.filter((h) => terms.every((t) => h.text.includes(t)))
    .sort((a, b) => Number(b.name.toLowerCase().startsWith(terms[0])) - Number(a.name.toLowerCase().startsWith(terms[0])) || (a.badge === "Ongoing" ? -1 : 1))
    .slice(0, 8);
}

export default function SearchBox({ className = "", autoFocus = false, onNavigate }: { className?: string; autoFocus?: boolean; onNavigate?: () => void }) {
  const router = useRouter();
  const id = useId();
  const box = useRef<HTMLDivElement>(null);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const hits = useMemo(() => search(q), [q]);

  useEffect(() => {
    const close = (e: MouseEvent) => { if (box.current && !box.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  function go(h?: Hit) {
    if (!h) return;
    setOpen(false);
    setQ("");
    onNavigate?.();
    router.push(h.href);
  }

  return (
    <div ref={box} className={`relative ${className}`}>
      <form role="search" onSubmit={(e) => { e.preventDefault(); go(hits[active] ?? hits[0]); }}
        className="flex h-12 overflow-hidden rounded-full border border-brand-line bg-white transition focus-within:border-brand-red focus-within:ring-2 focus-within:ring-brand-red/15">
        <input
          type="search" value={q} autoFocus={autoFocus} placeholder="Search projects…" aria-label="Search projects"
          role="combobox" aria-expanded={open && q.length > 0} aria-controls={id} aria-autocomplete="list"
          onChange={(e) => { setQ(e.target.value); setActive(0); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, hits.length - 1)); }
            if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
            if (e.key === "Escape") setOpen(false);
          }}
          className="min-w-0 flex-1 bg-transparent pl-5 pr-2 text-[0.9375rem] text-brand-ink outline-none placeholder:text-brand-muted [&::-webkit-search-cancel-button]:hidden"
        />
        <button type="submit" aria-label="Search" className="grid w-14 shrink-0 place-items-center bg-brand-red text-white transition hover:bg-brand-red-dark">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
        </button>
      </form>

      {open && q.trim() && (
        <div id={id} role="listbox" className="absolute right-0 top-[calc(100%+8px)] z-[60] w-full min-w-[20rem] overflow-hidden rounded-2xl border border-brand-line bg-white shadow-card">
          {hits.length ? hits.map((h, i) => (
            <button key={h.key} role="option" aria-selected={i === active} onMouseEnter={() => setActive(i)} onClick={() => go(h)}
              className={`flex w-full items-center gap-3 px-3 py-2.5 text-left transition ${i === active ? "bg-brand-cream" : ""}`}>
              <span className="relative h-11 w-14 shrink-0 overflow-hidden rounded-lg bg-brand-green-soft">
                {h.image ? <Image src={h.image} alt="" fill sizes="56px" className="object-cover" /> : <span className="grid h-full place-items-center text-lg">📍</span>}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-bold text-brand-green-dark">{h.name}</span>
                <span className="block truncate text-xs text-brand-muted">{h.sub}</span>
              </span>
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-[0.625rem] font-extrabold uppercase tracking-wider ${h.badge === "Ongoing" ? "bg-emerald-50 text-emerald-700" : h.badge === "Completed" ? "bg-brand-green-soft text-brand-green" : "bg-brand-red-soft text-brand-red"}`}>{h.badge}</span>
            </button>
          )) : (
            <p className="px-4 py-4 text-sm text-brand-muted">No projects match “{q}”. Try a city or area, e.g. <b>Shadnagar</b> or <b>Vizag</b>.</p>
          )}
        </div>
      )}
    </div>
  );
}
