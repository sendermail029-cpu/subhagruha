import Image from "next/image";
import Link from "next/link";
import { CITIES, PROJECTS } from "@/lib/projects";
import { SITE, waLink } from "@/lib/site";
import { MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "./Icons";
import SocialLinks from "./SocialLinks";

const LINKS = [
  ["About Us", "/about"], ["Photo Gallery", "/gallery/photos"], ["Video Gallery", "/gallery/videos"],
  ["Brochures", "/brochures"], ["Master Plans", "/master-plans"], ["NRI Guidelines", "/nri-guidelines"],
  ["Careers", "/careers"], ["Blog", "/blog"], ["Contact Us", "/contact"],
];

const Heading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mb-5 flex items-center gap-3 font-sans text-[0.8125rem] font-bold uppercase tracking-[0.2em] text-brand-gold">
    <span className="h-px w-6 bg-brand-gold/60" />{children}
  </h2>
);

const FLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="group inline-flex items-center gap-2 text-white/70 transition hover:text-white">
    <span className="h-px w-0 bg-brand-gold transition-all duration-300 group-hover:w-3" />{children}
  </Link>
);

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#120808] text-sm text-white/70">
      {/* warm light + texture */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_15%_0%,rgba(142,18,24,.45),transparent_70%),radial-gradient(ellipse_50%_40%_at_90%_10%,rgba(252,204,6,.10),transparent_70%)]" />

      <div className="wrap relative">
        {/* columns */}
        <div className="grid gap-10 pb-8 pt-14 md:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1.25fr]">
          <div>
            <Link href="/" aria-label="Subhagruha – Home" className="inline-block rounded-2xl bg-white px-4 py-3 shadow-[0_18px_40px_-18px_rgba(0,0,0,.6)]">
              <Image src="/logo.svg" alt="Subhagruha Group of Companies" width={288} height={72} unoptimized className="h-14 w-auto" />
            </Link>
            <p className="mt-6 leading-relaxed">Premium gated-community and villa plots in Hyderabad, Visakhapatnam and Vijayawada since {SITE.founded}.</p>
            <p className="mt-3 text-[0.9375rem] font-semibold text-brand-gold">{SITE.teluguTagline}</p>
            <p className="mt-6 text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-brand-gold">Follow us</p>
            <SocialLinks className="mt-3" />
          </div>

          <div>
            <Heading>Our Projects</Heading>
            <ul className="space-y-3">
              {CITIES.map((c) => (
                <li key={c.slug} className="flex items-center justify-between gap-3">
                  <FLink href={`/projects/${c.slug}`}>{c.name}</FLink>
                  <span className="rounded-full bg-white/[.06] px-2 py-0.5 text-[0.6875rem] text-white/50">{PROJECTS.filter((p) => p.city === c.name).length}</span>
                </li>
              ))}
              <li><FLink href="/projects">All Projects</FLink></li>
            </ul>
          </div>

          <div>
            <Heading>Quick Links</Heading>
            <ul className="grid grid-cols-1 gap-3">
              {LINKS.map(([l, h]) => <li key={h}><FLink href={h}>{l}</FLink></li>)}
            </ul>
          </div>

          <div>
            <Heading>Get in Touch</Heading>
            <ul className="space-y-4">
              {SITE.phones.map((p) => (
                <li key={p.dial}>
                  <a href={`tel:${p.dial}`} className="group flex items-center gap-3 hover:text-white">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-white/[.06] text-brand-gold ring-1 ring-white/10 transition group-hover:bg-brand-gold group-hover:text-[#120808]"><PhoneIcon className="h-4 w-4" /></span>{p.display}
                  </a>
                </li>
              ))}
              <li>
                <a href={waLink("Hi Subhagruha, I'm interested in your plots.")} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 hover:text-white">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-white/[.06] text-[#25d366] ring-1 ring-white/10 transition group-hover:bg-[#25d366] group-hover:text-white"><WhatsAppIcon className="h-4 w-4" /></span>{SITE.whatsapp.display}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="group flex items-center gap-3 hover:text-white">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-white/[.06] text-brand-gold ring-1 ring-white/10 transition group-hover:bg-brand-gold group-hover:text-[#120808]"><MailIcon className="h-4 w-4" /></span>{SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/[.06] text-brand-gold ring-1 ring-white/10"><PinIcon className="h-4 w-4" /></span>
                <span className="pt-2 leading-relaxed">Banjara Hills, Hyderabad · Vijayawada · Visakhapatnam</span>
              </li>
            </ul>
          </div>
        </div>

        <p className="border-t border-white/10 pt-6 text-xs leading-relaxed text-white/40">
          Disclaimer: Project images are artistic impressions for representation only. RERA registration numbers and layout approvals are as issued by the respective authorities (TS RERA / AP RERA, HMDA, VMRDA, APCRDA). Buyers are advised to verify details on the official RERA portals before booking.
        </p>
        <div className="flex flex-wrap justify-between gap-3 py-5 text-xs text-white/55">
          <span>© {new Date().getFullYear()} {SITE.legalName}. All rights reserved.</span>
          <span className="tracking-wider">HMDA · DTCP · VMRDA · APCRDA · RERA Approved</span>
        </div>
      </div>

    </footer>
  );
}
