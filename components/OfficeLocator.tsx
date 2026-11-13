import { SITE, waLink } from "@/lib/site";
import { MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "./Icons";
import OfficesMap from "./OfficesMap";

// Approximate office positions (for the overview map pins).
const COORDS: Record<string, [number, number]> = {
  Hyderabad: [17.4126, 78.4482],     // Lumbini Jewel Mall, Banjara Hills
  Vijayawada: [16.5085, 80.6410],    // Veterinary Colony
  Visakhapatnam: [17.7310, 83.3058], // Gurudwara Junction
};

/** One large map with all three offices pinned, and the three addresses listed below (no boxes). */
export default function OfficeLocator() {
  const offices = SITE.offices.map((o) => ({ ...o, coords: COORDS[o.city] ?? [17.4, 78.5] }));

  return (
    <div>
      <div className="overflow-hidden rounded-[1.75rem] shadow-[0_30px_70px_-35px_rgba(74,10,13,.5)] ring-1 ring-brand-line" data-aos="fade-up">
        <OfficesMap offices={offices.map((o) => ({ city: o.city, type: o.type, lat: o.coords[0], lng: o.coords[1], directions: o.map }))} />
      </div>

      <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-brand-line">
        {offices.map((o, i) => (
          <address key={o.city} className="not-italic md:px-8 md:first:pl-0 md:last:pr-0" data-aos="fade-up" data-aos-delay={i * 100}>
            <p className={`flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] ${i === 0 ? "text-brand-red" : "text-brand-orange"}`}>
              <PinIcon className="h-3.5 w-3.5" />{o.type}
            </p>
            <h3 className="mt-2 text-3xl font-semibold text-brand-ink" style={{ fontFamily: "var(--font-serif)" }}>
              {o.city} <span className="font-sans text-sm font-medium text-brand-muted">· {o.region}</span>
            </h3>
            <span aria-hidden className="mt-3 block h-px w-12 bg-gradient-to-r from-brand-gold to-transparent" />
            <p className="mt-4 text-[15px] leading-relaxed text-brand-muted">{o.street}, {o.locality} – {o.postal}</p>
            <div className="mt-4 space-y-1.5 text-sm font-semibold text-brand-ink">
              <a href={`tel:${SITE.phones[0].dial}`} className="flex items-center gap-2 hover:text-brand-red"><PhoneIcon className="h-4 w-4 text-brand-red" />{SITE.phones[0].display}</a>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 hover:text-brand-red"><MailIcon className="h-4 w-4 text-brand-red" />{SITE.email}</a>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-5 text-sm font-bold">
              <a href={o.map} target="_blank" rel="noopener noreferrer" className="text-brand-red underline decoration-brand-red/30 underline-offset-4 hover:decoration-brand-red">Get directions →</a>
              <a href={waLink(`Hi Subhagruha, I'd like to visit your ${o.city} office.`)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-brand-leaf hover:text-brand-leaf-dark">
                <WhatsAppIcon className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </address>
        ))}
      </div>
    </div>
  );
}
