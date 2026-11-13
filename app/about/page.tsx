import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FeatureVideo from "@/components/FeatureVideo";
import PageHero from "@/components/PageHero";
import { CLIP } from "@/lib/heroVideos";
import { HERO_IMG } from "@/lib/heroImages";
import { MANAGEMENT } from "@/lib/content";
import { CITIES, PROJECTS } from "@/lib/projects";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us – Subhagruha Group, Gated Community Plot Developer since 2011",
  description: "Subhagruha Group has delivered 100+ HMDA, DTCP, VMRDA & RERA approved plotted ventures across Hyderabad, Visakhapatnam and Vijayawada since 2011. Meet our management.",
  alternates: { canonical: "/about" },
};

const STATS = [
  { v: SITE.founded, l: "Established" },
  { v: "100+", l: "Ventures delivered" },
  { v: String(PROJECTS.length), l: "Ongoing projects" },
  { v: String(CITIES.length), l: "Cities" },
];

const Ornament = ({ className = "" }: { className?: string }) => (
  <div aria-hidden className={`flex items-center gap-3 ${className}`}>
    <span className="h-px w-12 bg-gradient-to-r from-transparent to-brand-gold" />
    <span className="h-1.5 w-1.5 rotate-45 bg-brand-gold" />
    <span className="h-px w-12 bg-gradient-to-l from-transparent to-brand-gold" />
  </div>
);

export default function AboutPage() {
  return (
    <>
      <PageHero clips={[CLIP.family, CLIP.youngerPeople]} title="About" accent="Subhagruha" intro="A legacy of trust since 2011"
        crumbs={[{ name: "About Us", path: "/about" }]} images={[HERO_IMG.about]} />

      {/* story */}
      <section className="py-16 md:py-24">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div data-aos="fade-up">
            <span className="eyebrow">Who we are</span>
            <h2 className="section-title">A reliable, vibrant and <span className="italic text-brand-red">eminent</span> real estate company</h2>
            <div className="mt-6 space-y-4 text-[1rem] leading-relaxed text-brand-muted md:text-[1.0625rem]">
              <p>
                <b className="text-brand-ink">Subhagruha Group</b> is a leading gated-community plotted development company across Hyderabad, Visakhapatnam and Vijayawada. Since {SITE.founded} we have delivered 100+ HMDA, DTCP, VMRDA and RERA-approved ventures, earning the trust of thousands of families and investors.
              </p>
              <p>
                We develop gated community and villa plots in high-growth corridors near IT hubs, airports and highways, with clear titles, Vastu-compliant layouts, wide internal roads, underground infrastructure and green spaces.
              </p>
            </div>
            <Link href="/projects" className="btn-red mt-8">Explore our projects</Link>
          </div>
          <div className="relative" data-aos="fade-left">
            {/* photo with gold offset frame */}
            <div aria-hidden className="absolute -right-3 -top-3 bottom-10 left-6 rounded-[1.75rem] border-2 border-brand-gold/60" />
            <figure className="group relative overflow-hidden rounded-[1.75rem] shadow-[0_40px_70px_-35px_rgba(74,10,13,.6)] ring-4 ring-white">
              <Image src="/images/chiranjeevi-launch.webp" alt="Megastar Chiranjeevi with the Subhagruha leadership at the brand campaign launch"
                width={1412} height={668} sizes="(max-width:1024px) 100vw, 560px" className="h-auto w-full transition duration-700 group-hover:scale-[1.03]" />
            </figure>
            {/* stats strip overlapping the photo */}
            <div className="relative z-10 mx-3 -mt-6 grid grid-cols-4 divide-x divide-brand-line rounded-2xl bg-white py-4 shadow-[0_24px_50px_-24px_rgba(74,10,13,.5)] ring-1 ring-brand-line sm:mx-6">
              {STATS.map((st, i) => (
                <div key={st.l} className="px-1 text-center">
                  <b className={`block text-2xl font-semibold leading-none md:text-3xl ${i === 0 ? "text-brand-gold" : "text-brand-red"}`} style={{ fontFamily: "var(--font-serif)" }}>{st.v}</b>
                  <span className="mt-1.5 block text-[0.5625rem] font-bold uppercase leading-tight tracking-[0.12em] text-brand-muted sm:text-[0.625rem]">{st.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* brand film */}
      <section className="relative overflow-hidden bg-[#140707] py-16 text-white md:py-24">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_15%_10%,rgba(142,18,24,.55),transparent_70%),radial-gradient(ellipse_45%_50%_at_90%_90%,rgba(252,204,6,.12),transparent_70%)]" />
        <div className="wrap relative">
          <div className="mx-auto mb-10 max-w-3xl text-center" data-aos="fade-up">
            <span className="eyebrow justify-center !text-brand-gold">Our story</span>
            <h2 className="section-title !text-white">Watch the <span className="italic text-brand-gold">Subhagruha</span> film</h2>
            <Ornament className="mt-5 justify-center" />
            <p className="mt-5 text-[1rem] leading-relaxed text-white/75">
              Our brand film featuring Megastar Chiranjeevi, Kushboo and Anasuya, directed by Sukumar, the director of Pushpa. A glimpse of the trust and happiness behind every Subhagruha venture.
            </p>
          </div>
          <div data-aos="zoom-in">
            <FeatureVideo id="U-PgRUHyDdc" title="Subhagruha Group brand film" />
          </div>
        </div>
      </section>

      {/* founders */}
      <section className="relative overflow-hidden bg-white py-16 md:py-24">
        <div aria-hidden className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-brand-gold/10 blur-3xl" />
        <div className="wrap relative">
          <div className="mx-auto mb-14 max-w-2xl text-center" data-aos="fade-up">
            <span className="eyebrow justify-center">Leadership</span>
            <h2 className="section-title">The visionaries behind <span className="italic text-brand-red">Subhagruha</span></h2>
            <Ornament className="mt-5 justify-center" />
          </div>

          <div className="space-y-20 md:space-y-24">
            {MANAGEMENT.map((m, i) => {
              const flip = i % 2 === 1;
              return (
                <article key={m.name} className="grid items-center gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-14">
                  {/* portrait in an arch */}
                  <div className={`relative mx-auto w-full max-w-[19rem] sm:max-w-sm ${flip ? "md:order-2" : ""}`} data-aos={flip ? "fade-left" : "fade-right"}>
                    <div aria-hidden className="absolute -inset-3 rounded-t-[12rem] rounded-b-[2rem] border border-brand-gold/50" />
                    <div className="relative aspect-[4/5] overflow-hidden rounded-t-[11rem] rounded-b-[1.75rem] bg-gradient-to-b from-[#FFF3DC] via-[#FDE7C7] to-[#F6C99B] shadow-[0_40px_70px_-35px_rgba(74,10,13,.6)]">
                      <Image src={m.photo} alt={`${m.name}, ${m.role} of Subhagruha Group`} fill sizes="(max-width:768px) 90vw, 400px" className="object-cover object-top mix-blend-multiply" />
                    </div>
                    <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-brand-red to-[#ff4a3a] px-6 py-2.5 text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-white shadow-lg">
                      {m.role}
                    </span>
                  </div>

                  {/* text */}
                  <div className={`text-center md:text-left ${flip ? "md:order-1 md:text-right" : ""}`} data-aos="fade-up" data-aos-delay="100">
                    <span className="block text-7xl leading-none text-brand-gold/60" style={{ fontFamily: "var(--font-serif)" }} aria-hidden>“</span>
                    <h3 className="-mt-6 text-4xl font-semibold leading-tight text-brand-ink md:text-5xl" style={{ fontFamily: "var(--font-serif)" }}>{m.name}</h3>
                    <p className="mt-2 text-xs font-bold uppercase tracking-[0.25em] text-brand-red">{m.role} · Subhagruha Group</p>
                    <Ornament className={`mt-5 justify-center ${flip ? "md:justify-end" : "md:justify-start"}`} />
                    <p className="mt-5 text-[1rem] leading-relaxed text-brand-muted md:text-[1.0625rem]">{m.bio}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* vision & mission */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FFF4EA] via-[#FDF0F2] to-[#F3F6EE] py-16 md:py-24">
        <div aria-hidden className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#FFD9C7]/60 blur-3xl" />
        <div aria-hidden className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#FFE9A8]/50 blur-3xl" />
        <div className="wrap relative">
          <div className="mx-auto mb-12 max-w-2xl text-center" data-aos="fade-up">
            <span className="eyebrow justify-center">What drives us</span>
            <h2 className="section-title">Our vision &amp; <span className="italic text-brand-red">mission</span></h2>
            <Ornament className="mt-5 justify-center" />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              { k: "01", t: "Our Vision", icon: "◎", body: "To become the most trusted and leading gated community plotted development brand in South India by shaping sustainable residential communities across Andhra Pradesh and Telangana through strategic locations, world-class infrastructure and ethical real estate practices." },
              { k: "02", t: "Our Mission", icon: "✦", body: "To develop legally approved, well-planned gated community and villa plots across Hyderabad, Visakhapatnam and Vijayawada by delivering transparent, customer-focused and future-ready plotted developments that create long-term value for homeowners and investors." },
            ].map((c, i) => (
              <div key={c.t} data-aos="fade-up" data-aos-delay={i * 120}
                className="group relative overflow-hidden rounded-[2rem] bg-white/80 p-8 shadow-[0_30px_60px_-35px_rgba(142,18,24,.35)] ring-1 ring-white backdrop-blur transition duration-500 hover:-translate-y-1 hover:shadow-[0_40px_70px_-35px_rgba(142,18,24,.45)] md:p-10">
                <span aria-hidden className="absolute right-6 top-2 text-8xl font-semibold text-brand-red/[.07]" style={{ fontFamily: "var(--font-serif)" }}>{c.k}</span>
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-gold to-brand-orange text-2xl text-white shadow-lg">{c.icon}</span>
                <h3 className="mt-6 text-3xl font-semibold text-brand-ink md:text-4xl" style={{ fontFamily: "var(--font-serif)" }}>{c.t}</h3>
                <span className="mt-4 block h-px w-16 bg-gradient-to-r from-brand-gold to-transparent transition-all duration-500 group-hover:w-32" />
                <p className="mt-5 text-[1rem] leading-relaxed text-brand-muted">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
