import type { Metadata } from "next";
import BrochureExplorer from "@/components/BrochureExplorer";
import BrochureSearch from "@/components/BrochureSearch";
import { PhoneIcon, WhatsAppIcon } from "@/components/Icons";
import PageHero from "@/components/PageHero";
import { CLIP } from "@/lib/heroVideos";
import { BROCHURES, getAlbum } from "@/lib/content";
import { SITE, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Brochures, Layout Plans & RERA Certificates",
  description: "Download Subhagruha project brochures, approved layout plans and RERA certificates for ventures in Hyderabad, Visakhapatnam and Vijayawada.",
  alternates: { canonical: "/brochures" },
};

// Banner slideshow: real site photos from the Photo Gallery (parks, pool, entrance, avenues).
const SLIDES = ["sukrithi-samyuktha-phase-1", "sukrithi-udbhava", "sukriti-delight", "sukrithi-ananthika", "sukrithi-saanvi-phase-1", "subhagruha-sukrithi-saanvi-phase-2", "sukrithi-nivas-phase-3"]
  .map((slug) => getAlbum(slug)?.cover).filter(Boolean) as string[];

export default function BrochuresPage() {

  return (
    <>
      <PageHero clips={[CLIP.tennis]} title="Brochures &" accent="Documents" intro="Brochures, layout plans and RERA certificates"
        crumbs={[{ name: "Brochures", path: "/brochures" }]} slides={SLIDES}>
        <BrochureSearch />
      </PageHero>

      {/* explorer */}
      <section id="documents" className="relative scroll-mt-24 overflow-hidden py-12 md:py-16">
        <div aria-hidden className="absolute -left-32 top-24 h-80 w-80 rounded-full bg-brand-leaf/10 blur-3xl" />
        <div aria-hidden className="absolute -right-32 top-[40%] h-80 w-80 rounded-full bg-brand-gold/20 blur-3xl" />
        <div className="wrap relative">
          <BrochureExplorer groups={BROCHURES} />
        </div>
      </section>

      {/* help band */}
      <section id="help" className="scroll-mt-24 pb-24">
        <div className="wrap">
          <div className="relative isolate overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-[#5a0b10] via-brand-green to-[#2a0507] text-white shadow-[0_40px_80px_-40px_rgba(74,10,13,.9)]" data-aos="fade-up">
            {/* texture + light */}
            <div aria-hidden className="absolute inset-0 -z-10 opacity-[.07] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:18px_18px]" />
            <div aria-hidden className="absolute -left-24 -top-24 -z-10 h-72 w-72 rounded-full bg-brand-gold/25 blur-3xl" />
            <div aria-hidden className="absolute -bottom-28 right-10 -z-10 h-80 w-80 rounded-full bg-brand-orange/25 blur-3xl" />
            <div aria-hidden className="absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent" />
            <div aria-hidden className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/70 to-transparent" />

            <div className="grid items-center gap-10 p-8 md:p-14 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">
                  <span className="h-px w-10 bg-brand-gold" /> Need help?
                </p>
                <h2 className="mt-4 text-4xl font-semibold leading-[1.05] md:text-5xl lg:text-[3.4rem]" style={{ fontFamily: "var(--font-serif)" }}>
                  Can&apos;t find a <span className="italic text-brand-gold">document?</span>
                </h2>
                <p className="mt-4 max-w-lg text-[1rem] leading-relaxed text-white/80">
                  Tell us the project you&apos;re interested in, and we&apos;ll send the latest brochure, price sheet and layout plan straight to your WhatsApp.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href={waLink("Hi Subhagruha, please send me the latest brochure, price sheet and layout.")} target="_blank" rel="noopener noreferrer"
                    className="pulse-green flex items-center gap-2.5 rounded-full bg-[#25d366] px-7 py-3.5 font-bold text-white shadow-[0_14px_30px_-10px_rgba(37,211,102,.7)] transition hover:-translate-y-0.5 hover:bg-[#20c25c]">
                    <WhatsAppIcon className="h-5 w-5" /> Get it on WhatsApp
                  </a>
                  <a href={`tel:${SITE.phones[0].dial}`}
                    className="flex items-center gap-2.5 rounded-full px-7 py-3.5 font-bold text-white ring-1 ring-white/30 transition hover:bg-white/10">
                    <PhoneIcon className="h-4 w-4 text-brand-gold" /> {SITE.phones[0].display}
                  </a>
                </div>
              </div>

              {/* chat preview */}
              <div aria-hidden className="relative mx-auto w-full max-w-sm" data-aos="fade-left" data-aos-delay="150">
                <div className="float-3d rounded-[1.75rem] bg-[#efeae2] p-4 shadow-[0_30px_60px_-20px_rgba(0,0,0,.6)] ring-1 ring-white/20" style={{ ["--r" as string]: "-2deg" }}>
                  <div className="-mx-4 -mt-4 mb-4 flex items-center gap-3 rounded-t-[1.75rem] bg-[#075e54] px-4 py-3">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-xs font-black text-brand-red">SG</span>
                    <span className="leading-tight">
                      <b className="block text-sm text-white">Subhagruha</b>
                      <span className="text-[0.6875rem] text-white/70">online</span>
                    </span>
                  </div>
                  <div className="ml-auto w-fit max-w-[85%] rounded-xl rounded-tr-sm bg-[#d9fdd3] px-3 py-2 text-[0.8125rem] text-brand-ink shadow-sm">
                    Hi, please send the Tree Shades brochure 🙏
                    <span className="mt-0.5 block text-right text-[0.625rem] text-brand-muted">10:24 ✓✓</span>
                  </div>
                  <div className="mt-2 w-fit max-w-[85%] rounded-xl rounded-tl-sm bg-white px-3 py-2 text-[0.8125rem] text-brand-ink shadow-sm">
                    Sure! Here you go 👇
                    <span className="mt-2 flex items-center gap-2.5 rounded-lg bg-brand-cream p-2">
                      <span className="grid h-9 w-8 place-items-center rounded bg-brand-red text-[0.5625rem] font-black text-white">PDF</span>
                      <span className="leading-tight">
                        <b className="block text-[0.75rem]">Tree-Shades-Brochure.pdf</b>
                        <span className="text-[0.625rem] text-brand-muted">Brochure · Layout · Price sheet</span>
                      </span>
                    </span>
                    <span className="mt-0.5 block text-right text-[0.625rem] text-brand-muted">10:25</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
