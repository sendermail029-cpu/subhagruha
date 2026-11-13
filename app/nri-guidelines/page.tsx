import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { BookButton } from "@/components/BookingModal";
import { CLIP } from "@/lib/heroVideos";
import { HERO_IMG } from "@/lib/heroImages";

export const metadata: Metadata = {
  title: "NRI Guidelines – Buying Property in India as an NRI / PIO",
  description: "FEMA & RBI guidelines for NRIs and Persons of Indian Origin buying plots in India: definitions, acquisition & transfer rules, repatriation of sale proceeds.",
  alternates: { canonical: "/nri-guidelines" },
};

const SECTIONS: { id: string; h: string; body: React.ReactNode }[] = [
  {
    id: "exchange-control",
    h: "Exchange control regulations affecting the acquisition of residential property in India",
    body: <p>Consequent to the introduction of the Foreign Exchange Management Act (FEMA), 1999, the Reserve Bank of India has made the Foreign Exchange Management (Acquisition &amp; Transfer of Immovable Property in India) Regulation with effect from June 1, 2000. The current position is as under.</p>,
  },
  {
    id: "definitions",
    h: "Important definitions",
    body: (
      <>
        <p><b>A person of Indian origin (PIO)</b> means an individual (not being a citizen of Pakistan, Bangladesh, Sri Lanka, Afghanistan, China, Iran, Nepal or Bhutan) who:</p>
        <ul>
          <li>at any time held an Indian passport; or</li>
          <li>who, or either of whose father or mother or grandfather or grandmother, was a citizen of India by virtue of the Constitution of India or the Citizenship Act, 1955 (57 of 1955).</li>
        </ul>
        <p><b>A person residing in India</b> means a person residing in India for more than 182 days during the preceding financial year, but does not include:</p>
        <ul>
          <li>A person who has gone out of India or who stays outside, in either case for taking up employment outside India, for carrying on business or vocation outside India, or for any other purpose indicating an intention to stay outside India for an uncertain period.</li>
          <li>A person who comes to or stays in India otherwise than for taking up employment in India, carrying on business or vocation in India, or any other purpose indicating an intention to stay in India for an uncertain period.</li>
        </ul>
        <p>It also includes any person or body corporate registered or incorporated in India; an office, branch or agency in India owned or controlled by a person residing outside India; and an office, branch or agency outside India owned or controlled by a person resident in India.</p>
        <p><b>Person residing outside India</b> means a person who is not residing in India.</p>
      </>
    ),
  },
  {
    id: "indian-citizen",
    h: "Acquisition & transfer of property in India by an Indian citizen residing outside India",
    body: (
      <ul>
        <li>May acquire any immovable property in India other than agricultural land / plantation / farmhouse. In case of purchase, the funds should be received in India by way of inward remittance from any place outside India, or from funds held in any non-resident account maintained under FEMA / RBI regulations.</li>
        <li>May transfer any immovable property other than agricultural land / plantation / farmhouse to a person residing outside India who is a citizen of India or a person of Indian origin.</li>
      </ul>
    ),
  },
  {
    id: "pio",
    h: "Acquisition & transfer of property in India by a person of Indian origin residing outside India",
    body: (
      <>
        <p>May acquire any immovable property other than agricultural land, farmhouse &amp; plantation by purchase, gift or inheritance, subject to the following:</p>
        <ul>
          <li><b>Purchase:</b> funds should be received in India by way of inward remittance from any place outside India, or from funds held in any non-resident account maintained under FEMA / RBI regulations.</li>
          <li><b>Gift:</b> can be from a person residing in India, or from a person residing outside India who is a citizen of India or a PIO. The property can only be commercial or residential. Agricultural land / plantation / farmhouse cannot be acquired by gift.</li>
          <li><b>Inheritance:</b> can be from a person residing outside India, provided that person acquired the property in accordance with the foreign exchange law in force at the time, or from a person residing in India.</li>
        </ul>
        <p>May transfer any immovable property in India other than agricultural land, farmhouse or plantation by sale to a person residing in India, or transfer residential or commercial property by gift to a person residing in India or to a person residing outside India who is a citizen of India or a PIO. Agricultural land, farmhouse or plantation property may be transferred by gift or sale only to a person residing in India who is a citizen of India.</p>
      </>
    ),
  },
  {
    id: "repatriation",
    h: "Repatriation of sale proceeds",
    body: (
      <>
        <p>On the sale of immovable property other than agricultural land / farmhouse / plantation property by the above two categories, repatriation of sale proceeds is possible subject to these conditions:</p>
        <ul>
          <li>The property was acquired in accordance with the foreign exchange law / regulations in force at the time of acquisition.</li>
          <li>The amount repatriated should not exceed (a) the amount paid for acquisition in foreign exchange remitted into India or out of funds held in an FCNR account, or (b) the foreign-currency equivalent, on the date of payment, of the amount paid from funds held in an NRE account.</li>
          <li>Repatriation of sale proceeds of residential property is restricted to a maximum of two properties.</li>
        </ul>
        <p>If the property was acquired out of rupee resources and/or the loan was repaid by close relatives in India (as defined in Section 6 of the Companies Act, 1956), the amount can be credited to the NRO account of the NRI / PIO, along with any capital gains. NRIs / PIOs may repatriate up to USD 1 million per financial year out of the balance in the NRO account / sale proceeds of assets, subject to documentary evidence and a tax clearance / no-objection certificate from the Income Tax Authority. Remittances above USD 1,000,000 in a financial year require prior RBI permission.</p>
      </>
    ),
  },
  {
    id: "certain-countries",
    h: "Acquisition or transfer of immovable property in India by citizens of certain countries",
    body: <p>Citizens of Pakistan, Bangladesh, Sri Lanka, Afghanistan, China, Iran, Nepal, Bhutan, Macau or Hong Kong can take immovable property in India on lease for a period not exceeding 5 years without RBI permission. All other types of acquisition or transfer of immovable property in India require prior RBI permission.</p>,
  },
];

export default function NriPage() {
  return (
    <>
      <PageHero clips={[CLIP.globe]} title="NRI" accent="Guidelines" intro="Buying property in India as an NRI"
        crumbs={[{ name: "NRI Guidelines", path: "/nri-guidelines" }]} images={[HERO_IMG.nri]} />
      {/* key facts: plain, no boxes */}
      <section className="bg-brand-cream pt-12 md:pt-16">
        <div className="wrap flex flex-col gap-6 border-b border-brand-line pb-10 sm:flex-row sm:items-center sm:gap-14">
          {[
            { icon: "§", tone: "from-brand-red to-[#ff5a3c]", v: "FEMA, 1999", l: "Governing law", d: "Foreign Exchange Management Act" },
            { icon: "₹", tone: "from-brand-gold to-brand-orange", v: "RBI", l: "Regulating authority", d: "Reserve Bank of India rules" },
          ].map((k, i) => (
            <div key={k.l} data-aos="fade-up" data-aos-delay={i * 100} className="flex items-center gap-4">
              <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br ${k.tone} text-xl font-bold text-white`}>{k.icon}</span>
              <span className="min-w-0">
                <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-brand-red">{k.l}</span>
                <b className="block font-display text-xl font-bold text-brand-ink">{k.v}</b>
                <span className="text-sm text-brand-muted">{k.d}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-b from-brand-cream to-white py-12 md:py-16">
        <div className="wrap grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-16">
          {/* contents */}
          <aside className="lg:sticky lg:top-28 lg:self-start" data-aos="fade-right">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-red">On this page</p>
            <ol className="mt-5 border-l-2 border-brand-line">
              {SECTIONS.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="-ml-[2px] flex gap-3 border-l-2 border-transparent py-2 pl-4 text-[14px] leading-snug text-brand-muted transition hover:border-brand-red hover:text-brand-ink">
                    <span className="font-semibold text-brand-red">{String(i + 1).padStart(2, "0")}</span>
                    {s.h.replace(/^Acquisition (&|or) transfer of (immovable )?property in India by /i, "").replace(/^\w/, (c) => c.toUpperCase())}
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          {/* sections */}
          <div className="nri-prose min-w-0 divide-y divide-brand-line">
            {SECTIONS.map((sec, i) => (
              <article key={sec.id} id={sec.id} data-aos="fade-up" className="prose-blog scroll-mt-28 py-10 first:pt-0">
                <p className="not-prose text-[12px] font-bold uppercase tracking-[0.22em] text-brand-red">Section {String(i + 1).padStart(2, "0")}</p>
                <h2 className="!mt-2">{sec.h}</h2>
                {sec.body}
              </article>
            ))}

            <div className="border-t-2 border-brand-red pt-8" data-aos="fade-up">
              <h2 className="font-display text-2xl font-semibold text-brand-ink">NRI buyer? <span className="text-brand-red">We&apos;ll guide you.</span></h2>
              <p className="mt-2 text-brand-muted">We handle documentation and offer virtual site tours, so you can buy with confidence from anywhere.</p>
              <div className="mt-6 flex flex-wrap gap-3"><BookButton project="Virtual tour (NRI)" className="btn-red">Book a virtual tour</BookButton><Link href="/projects" className="btn-outline">View projects</Link></div>
            </div>
            <p className="mt-8 text-xs text-brand-muted">This summary is for general information only. Please consult the latest RBI / FEMA notifications or a qualified advisor before transacting.</p>
          </div>
        </div>
      </section>
    </>
  );
}
