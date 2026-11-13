import Link from "next/link";

export default function GalleryTabs({ current }: { current: "photos" | "videos" }) {
  return (
    <div className="mt-8 flex gap-2">
      {(["photos", "videos"] as const).map((t) => (
        <Link key={t} href={`/gallery/${t}`} aria-current={current === t ? "page" : undefined}
          className={`rounded-full border-[1.5px] px-6 py-2 text-sm font-bold capitalize transition ${current === t ? "border-brand-red bg-brand-red text-white" : "border-brand-line bg-white/90 text-brand-green-dark hover:border-brand-red hover:text-brand-red"}`}>
          {t}
        </Link>
      ))}
    </div>
  );
}
