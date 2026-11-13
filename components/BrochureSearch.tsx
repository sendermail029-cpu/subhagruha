"use client";
import { useState } from "react";

/** Single brochure search, shown in the banner. Sends the text to the document list below and scrolls to it. */
export default function BrochureSearch() {
  const [q, setQ] = useState("");
  const send = (v: string) => window.dispatchEvent(new CustomEvent("brochure-search", { detail: v }));

  return (
    <form role="search" className="mx-auto mt-7 flex h-14 w-full max-w-xl overflow-hidden rounded-full bg-white shadow-[0_18px_40px_-12px_rgba(0,0,0,.45)] ring-1 ring-black/5"
      onSubmit={(e) => { e.preventDefault(); send(q); document.getElementById("documents")?.scrollIntoView({ behavior: "smooth" }); }}>
      <input type="search" value={q} placeholder="Search brochures, layouts, RERA certificates…" aria-label="Search documents"
        onChange={(e) => { setQ(e.target.value); send(e.target.value); }}
        className="min-w-0 flex-1 bg-transparent px-6 text-[0.9375rem] text-brand-ink outline-none [text-shadow:none] placeholder:text-brand-muted" />
      <button type="submit" aria-label="Search" className="grid w-16 shrink-0 place-items-center bg-brand-red text-white transition hover:bg-brand-red-dark">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
      </button>
    </form>
  );
}
