/** Picks a line icon for a project amenity from its wording (roads, vastu, security, water…). */
const P = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const ICONS: { test: RegExp; svg: React.ReactNode }[] = [
  { test: /road|bt |cc |footpath|kerb|walking tiles/i, svg: <><path d="M5 21 9 3M19 21 15 3" {...P} /><path d="M12 5v2M12 11v2M12 17v2" {...P} /></> },
  { test: /vast/i, svg: <><circle cx="12" cy="12" r="9" {...P} /><path d="m12 7 2 5-2 5-2-5z" {...P} /></> },
  { test: /electric|power|light/i, svg: <path d="M13 2 4 14h7l-1 8 9-12h-7z" {...P} /> },
  { test: /secur|cctv|gate guard/i, svg: <><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z" {...P} /><path d="m9 12 2 2 4-4" {...P} /></> },
  { test: /water|tank|drain|harvest/i, svg: <path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z" {...P} /> },
  { test: /plant|green|garden|park|landscap|tree|avenue/i, svg: <><path d="M12 21V11" {...P} /><path d="M12 11c-4 0-6-3-6-7 4 0 6 3 6 7zM12 14c3 0 5-2 5-5-3 0-5 2-5 5z" {...P} /></> },
  { test: /arch|entrance|gate/i, svg: <><path d="M4 21V9a8 8 0 0 1 16 0v12" {...P} /><path d="M8 21v-8a4 4 0 0 1 8 0v8M2 21h20" {...P} /></> },
  { test: /fenc|compound|wall/i, svg: <><path d="M5 21V7l2-3 2 3v14M15 21V7l2-3 2 3v14" {...P} /><path d="M3 10h18M3 16h18" {...P} /></> },
  { test: /child|play/i, svg: <><circle cx="12" cy="5" r="2" {...P} /><path d="M12 7v6m-4 8 4-8 4 8M7 10h10" {...P} /></> },
  { test: /club|house|pool|swim/i, svg: <><path d="M3 11 12 4l9 7" {...P} /><path d="M5 10v10h14V10M10 20v-6h4v6" {...P} /></> },
  { test: /tennis|sport|court|jog|track/i, svg: <><circle cx="12" cy="12" r="9" {...P} /><path d="M5 6c3 2 3 10 0 12M19 6c-3 2-3 10 0 12" {...P} /></> },
];
const DEFAULT = <><path d="M12 3 3 8v13h18V8z" {...P} /><path d="m9 13 2 2 4-4" {...P} /></>;

export default function AmenityIcon({ name, className = "h-7 w-7" }: { name: string; className?: string }) {
  const icon = ICONS.find((i) => i.test.test(name))?.svg ?? DEFAULT;
  return <svg viewBox="0 0 24 24" aria-hidden className={className}>{icon}</svg>;
}
