"use client";
import { useId, useMemo, useState } from "react";
import { PROJECTS } from "@/lib/projects";
import { SITE, waLink } from "@/lib/site";
import { WhatsAppIcon } from "./Icons";

type Props = { variant?: "quick" | "appointment"; defaultProject?: string };

const SLOTS = ["Morning (9–12)", "Afternoon (12–4)", "Evening (4–7)"];

export default function LeadForm({ variant = "appointment", defaultProject = "" }: Props) {
  const [done, setDone] = useState(false);
  const uid = useId().replace(/:/g, "");
  const minDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  }, []);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const msg =
      variant === "appointment"
        ? `*New Site Visit Request*\nName: ${d.name}\nMobile: ${d.phone}\nProject: ${d.project || "Not sure"}\nDate: ${d.date ? new Date(d.date).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" }) : "-"}\nSlot: ${d.slot}\nMessage: ${d.msg || "-"}`
        : `*New Enquiry – Best Deals*\nName: ${d.name}\nMobile: ${d.phone}\nInterested in: ${d.project || "Not sure"}`;
    // open WhatsApp in a new tab; if the browser blocks it, open it in this tab instead
    const url = waLink(msg);
    const w = window.open(url, "_blank");
    if (w) w.opener = null;
    else window.location.href = url;
    setDone(true);
  }

  if (done)
    return (
      <div className="py-8 text-center">
        <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-brand-green text-3xl text-white">✓</div>
        <h3 className="text-3xl font-bold text-brand-green-dark">{variant === "appointment" ? "Appointment requested!" : "Thank you!"}</h3>
        <p className="mx-auto mt-2 max-w-xs text-sm text-brand-muted">
          WhatsApp has opened with your details. Our team will call you shortly from {SITE.phones[0].display}.
        </p>
        <button onClick={() => setDone(false)} className="btn-outline mt-5">Send another</button>
      </div>
    );

  const projectSelect = (
    <div>
      <label className="field-label" htmlFor={`${variant}-${uid}-project`}>{variant === "quick" ? "Interested In" : "Project"}</label>
      <select id={`${variant}-${uid}-project`} name="project" defaultValue={defaultProject} className="field-input">
        <option value="">Select a project</option>
        {PROJECTS.map((p) => (
          <option key={p.slug} value={`${p.name} – ${p.city}`}>{p.name} – {p.city}</option>
        ))}
        <option>Not sure – suggest me</option>
      </select>
    </div>
  );

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className={variant === "appointment" ? "grid gap-3 sm:grid-cols-2" : "space-y-3"}>
        <div>
          <label className="field-label" htmlFor={`${variant}-${uid}-name`}>Full Name</label>
          <input id={`${variant}-${uid}-name`} name="name" required placeholder="Your name" autoComplete="name" className="field-input" />
        </div>
        <div>
          <label className="field-label" htmlFor={`${variant}-${uid}-phone`}>Mobile Number</label>
          <input id={`${variant}-${uid}-phone`} name="phone" required type="tel" inputMode="tel" pattern="[0-9+ ]{10,15}" placeholder="10-digit mobile" autoComplete="tel" className="field-input" />
        </div>
      </div>

      {variant === "appointment" ? (
        <>
          <div className="grid gap-3 sm:grid-cols-2">
            {projectSelect}
            <div>
              <label className="field-label" htmlFor={`${variant}-${uid}-date`}>Preferred Date</label>
              <input id={`${variant}-${uid}-date`} name="date" type="date" min={minDate} required className="field-input" />
            </div>
          </div>
          <fieldset>
            <legend className="field-label">Time Slot</legend>
            <div className="grid grid-cols-3 gap-2">
              {SLOTS.map((s, idx) => (
                <label key={s} className="cursor-pointer">
                  <input type="radio" name="slot" value={s} defaultChecked={idx === 0} className="peer sr-only" />
                  <span className="block rounded-lg border-[1.5px] border-brand-line py-2.5 text-center text-xs font-bold text-brand-muted transition peer-checked:border-brand-green peer-checked:bg-brand-green peer-checked:text-white">
                    {s.split(" ")[0]}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <div>
            <label className="field-label" htmlFor={`${variant}-${uid}-msg`}>Message (optional)</label>
            <textarea id={`${variant}-${uid}-msg`} name="msg" rows={2} placeholder="Plot size, budget, questions…" className="field-input" />
          </div>
        </>
      ) : (
        projectSelect
      )}

      <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25d366] px-6 py-3.5 text-[0.9375rem] font-bold text-white shadow-[0_5px_0_#1a9e4b,0_16px_28px_-10px_rgba(37,211,102,.6)] transition hover:-translate-y-0.5 hover:bg-[#20c25c] active:translate-y-[3px] active:shadow-[0_2px_0_#1a9e4b]"><WhatsAppIcon className="h-5 w-5" />{variant === "appointment" ? "Book Visit on WhatsApp" : "Get Deals on WhatsApp"}</button>
      <p className="text-center text-xs text-brand-muted">🔒 Your details are safe with us · Instant reply on WhatsApp</p>
    </form>
  );
}
