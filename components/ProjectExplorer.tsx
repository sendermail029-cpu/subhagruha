"use client";
import { useState } from "react";
import { PROJECTS, type City } from "@/lib/projects";
import ProjectCard from "./ProjectCard";

const TABS: ("All" | City)[] = ["All", "Hyderabad", "Vijayawada", "Visakhapatnam"];

export default function ProjectExplorer() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");
  const list = PROJECTS.filter((p) => tab === "All" || p.city === tab);
  return (
    <>
      <div role="tablist" className="mb-10 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)}
            className={`rounded-full border-[1.5px] px-5 py-2.5 text-sm font-bold transition ${tab === t ? "border-brand-green bg-brand-green text-white" : "border-brand-line bg-white text-brand-muted hover:border-brand-green hover:text-brand-green"}`}>
            {t === "Visakhapatnam" ? "Vizag" : t}
          </button>
        ))}
      </div>
      <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => <ProjectCard key={p.slug} p={p} />)}
      </div>
    </>
  );
}
