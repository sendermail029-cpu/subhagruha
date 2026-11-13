import type { Metadata } from "next";
import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import OfficeLocator from "@/components/OfficeLocator";
import PageHero from "@/components/PageHero";
import SocialLinks from "@/components/SocialLinks";
import { BuildingIcon, MailIcon, PhoneIcon, PinIcon, ShieldIcon, UsersIcon, WhatsAppIcon } from "@/components/Icons";
import { CITIES, PROJECTS } from "@/lib/projects";
import { SITE, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us – Subhagruha Offices in Hyderabad, Vijayawada & Visakhapatnam",
  description: "Call, WhatsApp or visit Subhagruha Group. Corporate office in Banjara Hills, Hyderabad, with branch offices in Vijayawada and Visakhapatnam. Book a free site visit.",
  alternates: { canonical: "/contact" },
};

const STATS = [
  { v: `Since ${SITE.founded}`, l: "Trusted developer", Icon: ShieldIcon, tone: "from-brand-red to-[#ff5a3c]" },
  { v: "100+", l: "Approved ventures", Icon: BuildingIcon, tone: "from-brand-gold to-brand-orange" },
  { v: `${SITE.offices.length} Offices`, l: "Hyderabad · Vizag · Vijayawada", Icon: PinIcon, tone: "from-brand-leaf to-[#3bb36c]" },
  { v: "RERA", l: "HMDA · DTCP · VMRDA · APCRDA", Icon: UsersIcon, tone: "from-brand-green to-brand-red" },
];

export default function ContactPage() {
  const channels = [
    ...SITE.phones.map((p) => ({ href: `tel:${p.dial}`, label: "Call us", value: p.display, Icon: PhoneIcon, external: false, icon: "from-brand-gold to-brand-orange text-brand-green-deep" })),
    { href: waLink("Hi Subhagruha, I'd like to know more about your plots."), label: "WhatsApp", value: SITE.whatsapp.display, Icon: WhatsAppIcon, external: true, icon: "from-[#25d366] to-brand-leaf text-white pulse-green" },
    { href: `mailto:${SITE.email}`, label: "Email", value: SITE.email, Icon: MailIcon, external: false, icon: "from-brand-gold to-brand-orange text-brand-green-deep" },
  ];

  return (
    <>
      <PageHero title="Contact" accent="Us" intro="We are here to help"
        crumbs={[{ name: "Contact Us", path: "/contact" }]}
        images={["/images/contact-hero.webp"]} focus="40% 25%" overlay={false} height="min-h-[320px] md:min-h-[460px]" />

      {/* trust strip */}
      <section className="relative bg-white">
        <div className="wrap grid grid-cols-2 gap-px overflow-hidden lg:grid-cols-4">
          {STATS.map(({ v, l, Icon, tone }, i) => (
            <div key={v} data-aos="zoom-in" data-aos-delay={i * 100} className="group flex items-center gap-4 px-2 py-7 sm:px-5">
              <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${tone} text-white shadow-lg transition duration-500 group-hover:-translate-y-1 group-hover:rotate-6`}>
                <Icon className="h-6 w-6" />
              </span>
              <span className="min-w-0">
                <b className="block text-xl font-extrabold text-brand-ink">{v}</b>
                <span className="text-xs text-brand-muted sm:text-sm">{l}</span>
              </span>
            </div>
          ))}
        </div>
        <div aria-hidden className="h-px bg-gradient-to-r from-transparent via-brand-line to-transparent" />
      </section>

      {/* reach us + enquiry */}
      <section id="enquiry" className="dots-bg relative scroll-mt-24 overflow-hidden py-16 md:py-24">
        <div aria-hidden className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-brand-leaf/10 blur-3xl" />
        <div aria-hidden className="absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-brand-gold/20 blur-3xl" />
        <div className="wrap relative">
          <div className="mx-auto mb-12 max-w-2xl text-center" data-aos="fade-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-leaf-soft px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-brand-leaf">
              <span className="h-2 w-2 animate-pulse rounded-full bg-brand-leaf" /> We&apos;re here to help
            </span>
            <h2 className="section-title mt-4">Talk to our <span className="bg-gradient-to-r from-brand-red to-brand-orange bg-clip-text text-transparent">team</span></h2>
            <p className="mt-3 text-brand-muted">Reach us directly, or send your details and we&apos;ll arrange a free site visit with pick-up and drop.</p>
          </div>

          <div className="border-anim shadow-[0_40px_80px_-40px_rgba(74,10,13,.5)]" data-aos="fade-up" data-aos-delay="100">
            <div className="grid items-stretch overflow-hidden rounded-[calc(2rem-2px)] bg-white lg:grid-cols-[5fr_7fr]">
              {/* left: contact channels */}
              <div className="relative flex flex-col overflow-hidden bg-gradient-to-br from-brand-green via-[#6e0e13] to-brand-green-deep p-7 text-white md:p-10" data-aos="fade-right" data-aos-delay="200">
                <div aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-gold/25 blur-3xl" />
                <div aria-hidden className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-brand-leaf/25 blur-3xl" />
                <h3 className="relative text-2xl font-extrabold">Reach us directly</h3>
                <p className="relative mt-1 text-sm text-white/70">Call, WhatsApp or email our team.</p>

                <ul className="relative mt-8 space-y-3">
                  {channels.map(({ href, label, value, Icon, external, icon }, i) => (
                    <li key={href} data-aos="fade-left" data-aos-delay={300 + i * 100}>
                      <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="shine group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[.07] p-4 transition duration-300 hover:translate-x-1 hover:border-brand-gold/50 hover:bg-white/[.12]">
                        <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br shadow-lg ${icon}`}>
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">{label}</span>
                          <span className="block truncate text-base font-bold md:text-lg">{value}</span>
                        </span>
                        <span className="ml-auto text-brand-gold transition group-hover:translate-x-1">→</span>
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="relative mt-8 flex flex-wrap items-center gap-4">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">Follow us</span>
                  <SocialLinks />
                </div>

                <ul className="relative mt-8 grid gap-2 border-t border-white/15 pt-6 text-sm text-white/85 sm:grid-cols-2 lg:mt-auto">
                  {["Corporate office in Hyderabad", "Branches in Vijayawada & Vizag", "Pick-up & drop for site visits", "Support for NRI buyers"].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-brand-leaf text-[10px] text-white">✓</span>{t}
                    </li>
                  ))}
                </ul>
              </div>

              {/* right: form */}
              <div className="p-7 md:p-10" data-aos="fade-left" data-aos-delay="200">
                <span className="eyebrow">Send an enquiry</span>
                <h3 className="mt-2 text-3xl font-extrabold text-brand-ink">Book a free site visit</h3>
                <p className="mb-6 mt-1 text-sm text-brand-muted">Pick a project, date and time slot. We&apos;ll confirm on WhatsApp.</p>
                <LeadForm variant="appointment" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* project shortcuts */}
      <section className="pb-16 md:pb-24">
        <div className="wrap">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3" data-aos="fade-up">
            <div><span className="eyebrow">Explore</span><h2 className="section-title">Find your plot</h2></div>
            <Link href="/projects" className="text-sm font-bold text-brand-red hover:underline">All projects →</Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CITIES.map((c, i) => {
              const tones = ["bg-brand-red-soft text-brand-red", "bg-amber-50 text-brand-orange", "bg-brand-leaf-soft text-brand-leaf"];
              return (
                <Link key={c.slug} href={`/projects/${c.slug}`} data-aos="fade-up" data-aos-delay={i * 100}
                  className="card-3d grow-bar shine group flex items-center gap-4 p-5 transition duration-300 hover:-translate-y-1.5">
                  <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl transition duration-500 group-hover:scale-110 ${tones[i % 3]}`}><PinIcon className="h-5 w-5" /></span>
                  <span className="min-w-0">
                    <span className="block font-bold text-brand-ink group-hover:text-brand-red">{c.name}</span>
                    <span className="text-sm text-brand-muted">View projects · {PROJECTS.filter((p) => p.city === c.name).length} ongoing</span>
                  </span>
                </Link>
              );
            })}
            <Link href="/brochures" data-aos="fade-up" data-aos-delay={300}
              className="grow-bar shine group flex items-center gap-4 rounded-[1.75rem] bg-gradient-to-br from-brand-leaf to-brand-leaf-dark p-5 text-white shadow-[0_18px_40px_-18px_rgba(20,107,57,.7)] transition duration-300 hover:-translate-y-1.5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/15 text-lg font-black transition duration-500 group-hover:scale-110">↓</span>
              <span className="min-w-0">
                <span className="block font-bold">Download brochures</span>
                <span className="text-sm text-white/80">Layouts &amp; RERA certificates</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* offices */}
      <section id="offices" className="relative scroll-mt-24 overflow-hidden bg-white py-16 md:py-24">
        <div aria-hidden className="absolute right-0 top-0 h-72 w-72 rounded-full bg-brand-leaf/10 blur-3xl" />
        <div className="wrap relative">
          <div className="mx-auto mb-12 max-w-2xl text-center" data-aos="fade-up">
            <span className="eyebrow">Visit us</span>
            <h2 className="section-title">Our offices</h2>
            <p className="mt-3 text-brand-muted">Corporate office in Hyderabad with branches in Vijayawada and Visakhapatnam.</p>
          </div>
          <OfficeLocator />
        </div>
      </section>
    </>
  );
}
