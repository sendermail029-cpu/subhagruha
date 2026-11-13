import Image from "next/image";
import Link from "next/link";
import OfficeLocator from "@/components/OfficeLocator";
import ProjectsHero from "@/components/ProjectsHero";
import ReviewCarousel from "@/components/ReviewCarousel";
import { REVIEWS } from "@/lib/reviews";
import LeadForm from "@/components/LeadForm";
import ProjectExplorer from "@/components/ProjectExplorer";
import JsonLd from "@/components/JsonLd";
import { WhatsAppIcon, BuildingIcon, PhoneIcon, PinIcon, PlayIcon, ShieldIcon, UsersIcon } from "@/components/Icons";
import { COMPLETED, FAQS, MORE_COMPLETED, PROJECTS, VIDEOS } from "@/lib/projects";
import { POSTS } from "@/lib/content";
import { faqSchema, officesSchema } from "@/lib/schema";
import { SITE, waLink } from "@/lib/site";

const STATS = [
  { n: "15+", l: "Years of Experience" },
  { n: "100+", l: "Approved Ventures" },
  { n: "3", l: "Cities · TS & AP" },
  { n: "100+", l: "Landmarks" },
];

const WHY = [
  { Icon: ShieldIcon, t: "100% Approved", d: "HMDA, DTCP, VMRDA, APCRDA and RERA approved layouts with clear titles." },
  { Icon: PinIcon, t: "Prime Locations", d: "Near RRR, ORR, NH-43, Bhogapuram airport, IT hubs and smart-city corridors." },
  { Icon: BuildingIcon, t: "Ready Infrastructure", d: "BT roads, underground drainage & electricity, street lights and compound wall." },
  { Icon: UsersIcon, t: "NRI Friendly", d: "Dedicated NRI guidance, documentation support and virtual site tours." },
];

const STEPS = [
  { t: "Schedule a Visit", d: "Pick a date and time — we arrange pick-up & drop for site visits." },
  { t: "See the Site", d: "Walk the layout, check roads, amenities and connectivity in person." },
  { t: "Verify Documents", d: "Review the RERA certificate, layout approval and title documents." },
  { t: "Register & Own", d: "Choose your plot, complete booking and register it in your name." },
];

const BLOGS = POSTS.slice(0, 3);

const rera = PROJECTS.flatMap((p) => p.registrations.filter((r) => r.label.includes("RERA")).map((r) => `${p.name}: ${r.label.replace(/\s*No\.?/, "")} ${r.value}`));

export default function Home() {
  return (
    <>
      <JsonLd data={faqSchema} />
      {officesSchema.map((o, i) => <JsonLd key={i} data={o} />)}

      {/* HERO: all projects */}
      <ProjectsHero projects={PROJECTS} />

      {/* RERA TICKER */}
      <div className="overflow-hidden whitespace-nowrap bg-gradient-to-r from-brand-gold to-brand-orange text-sm font-bold text-brand-green-deep" aria-label="RERA registration numbers">
        <div className="inline-flex animate-ticker gap-12 py-3">
          {[...rera, ...rera].map((t, i) => <span key={i} className="before:mr-3 before:text-[10px] before:content-['◆']">{t}</span>)}
        </div>
      </div>

      {/* STATS */}
      <div className="wrap relative z-10 -mt-px">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-b-3xl bg-brand-line shadow-card md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.l} className="bg-white px-4 py-8 text-center">
              <b className="block font-display text-5xl text-brand-red">{s.n}</b>
              <span className="text-sm font-semibold text-brand-muted">{s.l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="py-24">
        <div className="wrap grid items-center gap-16 lg:grid-cols-2">
          <div className="relative">
            <Image src="https://subhagruha.com/uploads/1654603714.webp" alt="Subhagruha gated community layout with BT roads and greenery" width={640} height={690} className="aspect-[4/4.3] w-full rounded-3xl object-cover shadow-card" />
            <div className="absolute bottom-10 right-3 rounded-2xl bg-brand-red px-7 py-5 text-center text-white shadow-glow lg:-right-6">
              <b className="block font-display text-5xl leading-none text-brand-gold">{SITE.founded}</b>
              <small className="text-xs uppercase tracking-[0.14em]">Established</small>
            </div>
          </div>
          <div>
            <span className="eyebrow">About Subhagruha</span>
            <h2 className="section-title">South India&apos;s trusted gated-community plot developer</h2>
            <p className="mt-4 text-brand-muted">
              {SITE.legalName} has delivered 100+ plotted ventures approved by HMDA, DTCP, VMRDA and RERA across Telangana and Andhra Pradesh. We choose locations close to IT hubs, airports, highways and growth corridors — so your land grows in value from day one.
            </p>
            <ul className="my-7 grid gap-3.5 sm:grid-cols-2">
              {["Clear, legally verified titles", "100% Vastu-compliant layouts", "Wide BT internal roads", "Underground infrastructure", "Landscaped green spaces", "Transparent, ethical dealings"].map((c) => (
                <li key={c} className="flex items-start gap-2.5 text-[15px] font-semibold">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-green-soft text-xs font-extrabold text-brand-green">✓</span>{c}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4 rounded-r-2xl border-l-4 border-brand-red bg-white px-5 py-4">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-brand-green-dark font-extrabold text-brand-gold">NK</div>
              <div><b>{SITE.chairman}</b><small className="block text-brand-muted">Chairman, Subhagruha Group</small></div>
            </div>
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <div><h3 className="font-sans text-base font-bold text-brand-green-dark">Our Vision</h3><p className="text-sm text-brand-muted">To be South India&apos;s most trusted gated-community plotted development brand through strategic locations, strong infrastructure and ethical practices.</p></div>
              <div><h3 className="font-sans text-base font-bold text-brand-green-dark">Our Mission</h3><p className="text-sm text-brand-muted">Develop legally approved, well-planned gated-community and villa plots that are transparent, customer-focused and future-ready.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="bg-white py-24">
        <div className="wrap">
          <span className="eyebrow">Our Projects</span>
          <h2 className="section-title">Ongoing ventures — book your plot today</h2>
          <p className="mb-8 mt-3 max-w-2xl text-brand-muted">Every project is RERA registered. Open a project for its layout plan, location map, amenities and approvals.</p>
          <ProjectExplorer />

          <div id="completed" className="mt-24 text-center">
            <span className="eyebrow">Delivered with pride</span>
            <h2 className="section-title">Completed Projects</h2>
          </div>
          <div className="mt-10 grid gap-7 md:grid-cols-3">
            {COMPLETED.map((c) => (
              <article key={c.name} className="overflow-hidden rounded-3xl border border-brand-line bg-brand-cream">
                <div className="relative aspect-[16/11]">
                  <Image src={c.image} alt={`${c.name} – completed project in ${c.city}`} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />
                  <span className="absolute left-3.5 top-3.5 rounded-full bg-brand-gold px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-brand-green-deep">Completed</span>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-brand-green-dark">{c.name}</h3>
                  <p className="text-sm text-brand-muted">{c.city}{c.rera ? ` · AP RERA ${c.rera}` : ""}</p>
                </div>
              </article>
            ))}
          </div>
          <ul className="mt-9 flex flex-wrap justify-center gap-2.5">
            {MORE_COMPLETED.map((n) => <li key={n} className="rounded-full border border-brand-line bg-brand-cream px-4 py-2 text-sm font-semibold text-brand-green">✓ {n}</li>)}
          </ul>
        </div>
      </section>

      {/* WHY */}
      <section className="relative isolate overflow-hidden bg-brand-green-deep py-24 text-white">
        <Image src="/images/why-bg.webp" alt="" fill sizes="100vw" quality={85} className="why-zoom -z-20 object-cover object-[60%_50%]" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-[#1a0506]/95 via-[#1a0506]/70 to-[#1a0506]/20" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-[#1a0506]/90 via-transparent to-[#1a0506]/40" />
        <div className="absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full border border-brand-gold/15" />
        <div className="wrap relative">
          <span className="eyebrow !text-brand-gold">Why Subhagruha</span>
          <h2 className="section-title !text-white">Land you can trust. Value you can see.</h2>
          <p className="mt-3 max-w-2xl text-white/70">For over 15 years, families and NRIs have chosen Subhagruha for safe, approved and future-ready plots.</p>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map(({ Icon, t, d }) => (
              <div key={t} className="rounded-2xl border border-white/10 bg-white/5 p-7 transition hover:-translate-y-1 hover:bg-white/10">
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand-red to-brand-orange p-3"><Icon className="h-6 w-6" /></div>
                <h3 className="mb-2 font-sans text-lg font-bold">{t}</h3>
                <p className="text-sm text-white/70">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="py-24">
        <div className="wrap">
          <div className="text-center"><span className="eyebrow">Simple & transparent</span><h2 className="section-title">Book your plot in 4 easy steps</h2></div>
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.t} className="rounded-2xl border border-brand-line bg-white p-7">
                <span className="mb-2 block font-display text-5xl font-bold leading-none text-brand-red">0{i + 1}</span>
                <h3 className="mb-1.5 font-sans text-lg font-bold text-brand-green-dark">{s.t}</h3>
                <p className="text-sm text-brand-muted">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* VIDEOS */}
      <section id="gallery" className="bg-white py-24">
        <div className="wrap">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
            <div><span className="eyebrow">News & Events</span><h2 className="section-title">Watch our ventures come alive</h2></div>
            <Link href="/gallery/videos" className="btn-outline">Video Gallery →</Link>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {VIDEOS.map((v) => (
              <a key={v} href={`https://www.youtube.com/watch?v=${v}`} target="_blank" rel="noopener noreferrer" className="group relative aspect-video overflow-hidden rounded-2xl bg-black" aria-label="Watch Subhagruha video on YouTube">
                <Image src={`https://i.ytimg.com/vi/${v}/hqdefault.jpg`} alt="Subhagruha project video" fill sizes="(max-width:1024px) 50vw, 25vw" className="object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-60" />
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-white/95 text-brand-red shadow-[0_0_0_10px_rgba(255,255,255,.2)]"><PlayIcon className="ml-1 h-5 w-5" /></span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FFF4EA] via-[#FDF0F2] to-[#F3F6EE] py-20 md:py-28">
        <div aria-hidden className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-[#FFD9C7]/60 blur-3xl" />
        <div aria-hidden className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#FFE9A8]/50 blur-3xl" />
        <div className="wrap relative">
          <div className="mb-12 text-center" data-aos="fade-up">
            <span className="eyebrow justify-center">Happy Families</span>
            <h2 className="section-title">What our <span className="italic text-brand-red">customers</span> say</h2>
          </div>
          <div data-aos="zoom-in"><ReviewCarousel reviews={REVIEWS} /></div>
          <div className="mt-10 text-center" data-aos="fade-up">
            <p className="text-brand-muted">Bought a plot with us? We&apos;d love to hear from you.</p>
            <a href={waLink("Hi Subhagruha, I'd like to share my experience. Project: ___ . My review: ___ . You may publish it on your website with my name.")}
              target="_blank" rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#25d366] px-6 py-3 font-bold text-white shadow-[0_12px_26px_-10px_rgba(37,211,102,.7)] transition hover:-translate-y-0.5">
              <WhatsAppIcon className="h-5 w-5" /> Share your experience
            </a>
          </div>
        </div>
      </section>

      {/* APPOINTMENT */}
      <section id="appointment" className="scroll-mt-24 bg-gradient-to-br from-brand-green-dark to-brand-green-deep py-24 text-white">
        <div className="wrap grid items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <span className="eyebrow !text-brand-gold">Free Site Visit</span>
            <h2 className="section-title !text-white">Schedule your appointment</h2>
            <p className="mt-3 text-white/70">Choose a project, pick a convenient day, and our relationship manager will confirm your visit within minutes.</p>
            <ul className="my-8 space-y-4">
              {[["🚗", "Pick-up & drop for site visits"], ["📄", "Brochure, layout & price sheet on WhatsApp"], ["🏦", "Guidance on bank loans & documentation"]].map(([i, t]) => (
                <li key={t} className="flex items-center gap-4"><span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-gold/15 text-xl">{i}</span>{t}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              {SITE.phones.map((p) => (
                <a key={p.dial} href={`tel:${p.dial}`} className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-5 py-3.5 transition hover:bg-white/10">
                  <PhoneIcon className="h-6 w-6 text-brand-gold" />
                  <span><small className="block text-xs text-white/60">Call us</small><b className="text-lg">{p.display}</b></span>
                </a>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-white p-7 text-brand-ink shadow-2xl md:p-8">
            <h3 className="text-3xl font-bold text-brand-green-dark">Book a Site Visit</h3>
            <p className="mb-5 text-sm text-brand-muted">Takes less than 30 seconds.</p>
            <LeadForm variant="appointment" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24">
        <div className="wrap grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <span className="eyebrow">FAQs</span>
            <h2 className="section-title">Questions buyers ask us</h2>
            <p className="mt-3 text-brand-muted">Still have questions? Our team is a call away.</p>
            <a href={waLink("Hi, I have a question about Subhagruha plots.")} target="_blank" rel="noopener noreferrer" className="btn-green mt-6">Ask on WhatsApp</a>
          </div>
          <div className="space-y-3">
            {FAQS.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-brand-line bg-white px-6 py-5 open:shadow-card">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-brand-green-dark">
                  {f.q}<span className="text-2xl text-brand-red transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-brand-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="bg-white py-24">
        <div className="wrap">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
            <div><span className="eyebrow">Insights</span><h2 className="section-title">From our blog</h2></div>
            <Link href="/blog" className="btn-outline">All articles →</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {BLOGS.map((b) => (
              <Link key={b.slug} href={`/blog/${b.slug}`} className="group overflow-hidden rounded-2xl border border-brand-line bg-brand-cream transition hover:-translate-y-1 hover:shadow-card">
                <span className="relative block aspect-[16/10] overflow-hidden">{b.image && <Image src={b.image} alt={b.imageAlt} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />}</span>
                <span className="block p-7">
                  <time className="text-xs font-bold uppercase tracking-widest text-brand-red">{b.date}</time>
                  <span className="mb-4 mt-2 block text-2xl font-bold leading-snug text-brand-green-dark group-hover:text-brand-red">{b.title}</span>
                  <span className="text-sm font-bold text-brand-green">Read more →</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* OFFICES */}
      <section id="contact" className="scroll-mt-24 py-24">
        <div className="wrap">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div><span className="eyebrow">Visit Us</span><h2 className="section-title">Our Offices</h2></div>
            <Link href="/contact" className="btn-outline">Contact page →</Link>
          </div>
          <OfficeLocator />
        </div>
      </section>
    </>
  );
}
