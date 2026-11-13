import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import { PinIcon } from "./Icons";
import Tilt from "./Tilt";
import { BookButton } from "./BookingModal";

export default function ProjectCard({ p }: { p: Project }) {
  const shown = p.registrations.slice(0, 2);
  const more = p.registrations.length - shown.length;
  return (
    <Tilt as="article" max={7} className="card-3d group flex flex-col overflow-hidden">
      <Link href={`/projects/${p.slug}`} className="relative block aspect-[16/11] overflow-hidden bg-brand-green-soft">
        <Image src={p.image} alt={`${p.name} – open plots in ${p.area}, ${p.city}`} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
        <span className="absolute left-3.5 top-3.5 flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-brand-green">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" /> {p.status}
        </span>
        <span className="absolute right-3.5 top-3.5 rounded-full bg-brand-red px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white">{p.city}</span>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-[26px] font-bold leading-tight text-brand-green-dark">
          <Link href={`/projects/${p.slug}`} className="hover:text-brand-red">{p.name}</Link>
        </h3>
        <p className="mb-4 mt-1.5 flex items-center gap-1.5 text-sm text-brand-muted"><PinIcon className="h-4 w-4 text-brand-red" />{p.location}</p>

        <dl className="mb-4 rounded-xl border border-dashed border-brand-orange bg-brand-cream px-3.5 py-2.5 text-xs">
          {shown.map((r, idx) => (
            <div key={idx} className="flex justify-between gap-3 py-0.5">
              <dt className="whitespace-nowrap font-semibold text-brand-muted">{r.label}</dt>
              <dd className="break-all text-right font-extrabold text-brand-green-dark">{r.value}</dd>
            </div>
          ))}
          {more > 0 && <div className="pt-0.5 font-bold text-brand-orange">+{more} more approvals</div>}
        </dl>

        <div className="mb-5 flex flex-wrap gap-2">{p.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>

        <div className="mt-auto grid grid-cols-2 gap-2.5">
          <Link href={`/projects/${p.slug}`} className="btn-outline !px-3 !py-3">View Details</Link>
          <BookButton project={`${p.name} – ${p.city}`} className="btn-green !px-3 !py-3">Book Visit</BookButton>
        </div>
      </div>
    </Tilt>
  );
}
