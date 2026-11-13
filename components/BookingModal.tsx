"use client";
import { useEffect, useState } from "react";
import LeadForm from "./LeadForm";

/** Opens the booking pop-up from anywhere: <BookButton project="Tree Shades – Hyderabad">Book Site Visit</BookButton> */
export const openBooking = (project = "") => window.dispatchEvent(new CustomEvent("open-booking", { detail: project }));

export function BookButton({ project, className, children }: { project?: string; className?: string; children: React.ReactNode }) {
  return <button type="button" onClick={() => openBooking(project)} className={className}>{children}</button>;
}

/** Site-wide "Book a site visit" pop-up. The form sends the details straight to WhatsApp. */
export default function BookingModal() {
  const [open, setOpen] = useState(false);
  const [project, setProject] = useState("");

  useEffect(() => {
    const onOpen = (e: Event) => { setProject((e as CustomEvent<string>).detail || ""); setOpen(true); };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    // links ending in #book-visit (e.g. shared on WhatsApp/Instagram) open the pop-up directly
    const fromHash = () => { if (location.hash === "#book-visit") { setProject(""); setOpen(true); history.replaceState(null, "", location.pathname + location.search); } };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    window.addEventListener("open-booking", onOpen);
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("open-booking", onOpen); window.removeEventListener("keydown", onKey); window.removeEventListener("hashchange", fromHash); };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [open]);

  if (!open) return null;
  return (
    <div role="dialog" aria-modal aria-label="Book a site visit" className="fixed inset-0 z-[95] flex items-end justify-center sm:items-center">
      <button aria-label="Close" onClick={() => setOpen(false)} className="absolute inset-0 animate-[ptFade_.25s_ease_both] bg-black/55 backdrop-blur-sm" />
      <div className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-[1.75rem] bg-white shadow-2xl animate-[pageIn_.35s_cubic-bezier(.2,.7,.2,1)_both] sm:max-w-xl sm:rounded-[1.75rem]">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-brand-line bg-white/95 px-6 pb-4 pt-6 backdrop-blur sm:px-8">
          <div>
            <p className="text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-brand-red">Free site visit</p>
            <h2 className="mt-1 text-3xl font-semibold text-brand-ink">Book a site visit</h2>
            <p className="mt-1 text-sm text-brand-muted">Fill in your details — we&apos;ll confirm on WhatsApp.</p>
          </div>
          <button onClick={() => setOpen(false)} aria-label="Close" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-cream text-xl text-brand-ink transition hover:bg-brand-red hover:text-white">×</button>
        </div>
        <div className="px-6 pb-8 pt-5 sm:px-8">
          <LeadForm key={project} variant="appointment" defaultProject={project} />
        </div>
      </div>
    </div>
  );
}
