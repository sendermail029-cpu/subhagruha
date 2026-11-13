"use client";
import { useState } from "react";
import { waLink } from "@/lib/site";
import { WhatsAppIcon } from "./Icons";

export default function CareerForm({ positions }: { positions: string[] }) {
  const [sent, setSent] = useState(false);
  const field = "h-12 w-full rounded-xl border border-brand-line bg-white px-4 text-[15px] outline-none focus:border-brand-green";

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const body = [
      "Hi Subhagruha, I'd like to apply for a job.",
      "",
      `*Position:* ${d.position}`,
      `*Name:* ${d.first} ${d.last}`,
      `*Email:* ${d.email}`,
      `*Phone:* ${d.phone}`,
      `*Experience:* ${d.experience} years`,
      `*Skills:* ${d.skills || "-"}`,
      "",
      "I will share my resume in this chat.",
    ].join("\n");
    window.open(waLink(body), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
      <label className="sm:col-span-2">
        <span className="mb-1.5 block text-sm font-bold text-brand-green-dark">Position</span>
        <select name="position" required className={field}>{positions.map((p) => <option key={p}>{p}</option>)}</select>
      </label>
      <label><span className="mb-1.5 block text-sm font-bold text-brand-green-dark">First name</span><input name="first" required className={field} /></label>
      <label><span className="mb-1.5 block text-sm font-bold text-brand-green-dark">Last name</span><input name="last" required className={field} /></label>
      <label><span className="mb-1.5 block text-sm font-bold text-brand-green-dark">Email</span><input name="email" type="email" required className={field} /></label>
      <label><span className="mb-1.5 block text-sm font-bold text-brand-green-dark">Phone</span><input name="phone" type="tel" pattern="[0-9+ ]{10,15}" required className={field} /></label>
      <label><span className="mb-1.5 block text-sm font-bold text-brand-green-dark">Total experience (years)</span><input name="experience" type="number" min="0" max="50" required className={field} /></label>
      <label><span className="mb-1.5 block text-sm font-bold text-brand-green-dark">Skills</span><input name="skills" className={field} /></label>
      <div className="sm:col-span-2">
        <button className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25d366] px-7 py-3.5 font-bold text-white shadow-[0_14px_30px_-10px_rgba(37,211,102,.7)] transition hover:-translate-y-0.5 hover:bg-[#20c25c] sm:w-auto"><WhatsAppIcon className="h-5 w-5" /> Apply on WhatsApp</button>
        <p className="mt-3 text-xs text-brand-muted">
          {sent ? "WhatsApp is open with your details — press send, then attach your resume in the same chat." : "Your details are sent to our HR team on WhatsApp. You can attach your resume in the same chat."}
        </p>
      </div>
    </form>
  );
}
