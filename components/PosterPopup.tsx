"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { openBooking } from "./BookingModal";

type Poster = { enabled: true; src: string; width: number; height: number; link: string; title: string; version: number };
const KEY = "sg_poster_seen";

/** Shows the admin-uploaded poster 3 seconds after the site opens — once per visit (again when a new poster is uploaded). */
export default function PosterPopup() {
  const path = usePathname();
  const [poster, setPoster] = useState<Poster | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (path.startsWith("/admin")) return;
    let alive = true;
    const t = setTimeout(async () => {
      try {
        const r = await fetch("/api/poster", { cache: "no-store" });
        const j = await r.json();
        if (!alive || !j.enabled) return;
        let seen: string | null = null;
        try { seen = sessionStorage.getItem(KEY); } catch {}
        if (seen === String(j.version)) return;
        setPoster(j);
        setOpen(true);
      } catch {}
    }, 3000);
    return () => { alive = false; clearTimeout(t); };
    // run once per page load, not on every navigation
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  function close() {
    setOpen(false);
    try { if (poster) sessionStorage.setItem(KEY, String(poster.version)); } catch {}
  }

  function action() {
    close();
    if (poster?.link) window.open(poster.link, poster.link.startsWith("/") ? "_self" : "_blank");
    else openBooking();
  }

  if (!open || !poster) return null;
  return (
    <div role="dialog" aria-modal aria-label={poster.title} className="fixed inset-0 z-[96] grid place-items-center p-4">
      <button aria-label="Close" onClick={close} className="absolute inset-0 animate-[ptFade_.3s_ease_both] bg-black/65 backdrop-blur-sm" />
      <div className="relative animate-[pageIn_.45s_cubic-bezier(.2,.7,.2,1)_both]">
        <button onClick={close} aria-label="Close"
          className="absolute -right-3 -top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-white text-xl font-bold text-brand-ink shadow-lg ring-2 ring-brand-gold transition hover:bg-brand-red hover:text-white">×</button>
        <button onClick={action} aria-label={poster.title} className="block overflow-hidden rounded-xl shadow-[0_40px_90px_-30px_rgba(0,0,0,.85)]">
          <Image src={poster.src} alt={poster.title} width={poster.width} height={poster.height} unoptimized priority
            className="block h-auto max-h-[86vh] w-auto max-w-[92vw]" />
        </button>
      </div>
    </div>
  );
}
