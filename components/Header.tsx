"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CITIES } from "@/lib/projects";
import { SITE } from "@/lib/site";
import { MailIcon, PhoneIcon, PinIcon } from "./Icons";
import SearchBox from "./SearchBox";
import SocialLinks from "./SocialLinks";
import { openBooking } from "./BookingModal";

type Child = { href: string; label: string; pin?: boolean };
type NavItem = { href: string; label: string; children?: Child[] };

const NAV: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects", children: CITIES.map((c) => ({ href: `/projects/${c.slug}`, label: c.name, pin: true })) },
  { href: "/gallery/photos", label: "Gallery", children: [{ href: "/gallery/photos", label: "Photos" }, { href: "/gallery/videos", label: "Videos" }] },
  { href: "/brochures", label: "Brochures" },
  {
    href: "/about", label: "About", children: [
      { href: "/about", label: "About Us" },
      { href: "/careers", label: "Careers" },
      { href: "/nri-guidelines", label: "NRI Guidelines" },
      { href: "/master-plans", label: "Master Plans" },
      { href: "/blog", label: "Blog" },
    ],
  },
  { href: "/contact", label: "Contact" },
];

const Chevron = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className={`h-4 w-4 ${className}`}>
    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
  </svg>
);

const isActive = (path: string, n: NavItem) =>
  n.href === "/" ? path === "/" : n.href.startsWith("/#") ? false : path.startsWith(n.href) || !!n.children?.some((c) => path.startsWith(c.href));

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => { setOpen(false); setSearchOpen(false); }, [path]);

  return (
    <>
      <div className="bg-gradient-to-r from-brand-green-deep via-brand-green to-brand-green-deep text-[13px] text-white/90">
        <div className="wrap flex flex-wrap items-center justify-between gap-3 py-2">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            {SITE.phones.map((p) => (
              <a key={p.dial} href={`tel:${p.dial}`} className="flex items-center gap-1.5 hover:text-brand-gold">
                <PhoneIcon className="h-3.5 w-3.5" /> {p.display}
              </a>
            ))}
            <a href={`mailto:${SITE.email}`} className="hidden items-center gap-1.5 hover:text-brand-gold sm:flex">
              <MailIcon className="h-3.5 w-3.5" /> {SITE.email}
            </a>
          </div>
          <div className="hidden items-center gap-4 md:flex">
            <span className="hidden font-semibold text-brand-gold xl:block">HMDA · DTCP · VMRDA · APCRDA · RERA Approved</span>
            <SocialLinks tone="bar" />
          </div>
        </div>
      </div>

      <header className={`sticky top-0 z-50 border-b border-brand-line bg-white/95 backdrop-blur-md transition-shadow duration-300 ${scrolled ? "shadow-[0_10px_30px_-18px_rgba(74,10,13,.45)]" : ""}`}>
        <div className="wrap flex h-20 items-center justify-between gap-4">
          <Link href="/" aria-label="Subhagruha Group of Companies – Home" className="shrink-0">
            <Image src="/logo.svg" alt="Subhagruha Group of Companies logo" width={240} height={60} priority unoptimized className="h-12 w-auto sm:h-14" />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-6 text-[15px] font-semibold lg:flex xl:gap-7">
            {NAV.map((n) => {
              const active = isActive(path, n);
              const base = `relative flex items-center gap-1 py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-brand-red after:transition-all ${active ? "text-brand-red after:w-full" : "after:w-0"}`;
              return n.children ? (
                <div key={n.label} className="group relative">
                  <Link href={n.href} aria-haspopup="true" className={`${base} group-hover:text-brand-red group-hover:after:w-full group-focus-within:text-brand-red`}>
                    {n.label} <Chevron className="transition group-hover:rotate-180 group-focus-within:rotate-180" />
                  </Link>
                  <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4 opacity-0 transition duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <ul className="relative w-64 overflow-hidden rounded-2xl bg-white p-2 shadow-[0_24px_50px_-20px_rgba(74,10,13,.45)] ring-1 ring-brand-line before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-gradient-to-r before:from-brand-red before:via-brand-orange before:to-brand-gold">
                      {n.children.map((c) => (
                        <li key={c.href}>
                          <Link href={c.href} className={`flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-[14px] font-semibold transition hover:translate-x-1 hover:bg-brand-cream hover:text-brand-red focus:bg-brand-cream focus:text-brand-red focus:outline-none ${path === c.href ? "bg-brand-cream text-brand-red" : "text-brand-ink"}`}>
                            {c.pin && <PinIcon className="h-4 w-4 shrink-0" />} {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <Link key={n.label} href={n.href} className={`${base} hover:text-brand-red hover:after:w-full`}>{n.label}</Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <SearchBox className="hidden w-64 xl:block" />
            <button onClick={() => setSearchOpen(!searchOpen)} aria-label="Search projects" aria-expanded={searchOpen}
              className="grid h-11 w-11 place-items-center rounded-full bg-brand-red text-white xl:hidden">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            </button>
            <button onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open} className="p-2 lg:hidden">
              <span className={`block h-0.5 w-6 bg-brand-green-dark transition ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`my-1.5 block h-0.5 w-6 bg-brand-green-dark transition ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-6 bg-brand-green-dark transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-brand-line bg-white py-3 xl:hidden">
            <div className="wrap"><SearchBox autoFocus onNavigate={() => setSearchOpen(false)} /></div>
          </div>
        )}

        {open && (
          <nav aria-label="Mobile" className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-brand-line bg-white lg:hidden">
            <div className="wrap flex flex-col py-3">
              {NAV.map((n) =>
                n.children ? (
                  <div key={n.label} className="border-b border-brand-line">
                    <button onClick={() => setSub(sub === n.label ? null : n.label)} aria-expanded={sub === n.label} className="flex w-full items-center justify-between py-3 text-left font-semibold">
                      {n.label} <Chevron className={`transition ${sub === n.label ? "rotate-180" : ""}`} />
                    </button>
                    {sub === n.label && (
                      <div className="mb-3 flex flex-col rounded-xl bg-brand-cream">
                        {n.children.map((c) => (
                          <Link key={c.href} href={c.href} onClick={() => setOpen(false)} className="flex items-center gap-2 px-4 py-3 text-[15px] font-semibold text-brand-green-dark">
                            {c.pin && <PinIcon className="h-4 w-4 text-brand-red" />} {c.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link key={n.label} href={n.href} onClick={() => setOpen(false)} className="border-b border-brand-line py-3 font-semibold">{n.label}</Link>
                ),
              )}
              <button type="button" onClick={() => { setOpen(false); openBooking(); }} className="btn-red mt-4">Book Site Visit</button>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
