"use client";
import { useEffect, useRef, useState } from "react";

type Poster = { enabled: boolean; link: string; title: string; width: number; height: number; updatedAt: number };

export default function AdminPage() {
  const [state, setState] = useState<"loading" | "login" | "ready">("loading");
  const [poster, setPoster] = useState<Poster | null>(null);
  const [pw, setPw] = useState("");
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function load() {
    const r = await fetch("/api/admin/poster", { cache: "no-store" });
    if (r.status === 401) return setState("login");
    const j = await r.json();
    setPoster(j.poster);
    setLink(j.poster?.link ?? "");
    setTitle(j.poster?.title ?? "");
    setState("ready");
  }
  useEffect(() => { load(); }, []);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setMsg(null);
    const r = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: pw }) });
    setBusy(false);
    if (!r.ok) return setMsg({ type: "err", text: (await r.json()).error ?? "Login failed" });
    setPw(""); load();
  }

  async function upload(e: React.FormEvent) {
    e.preventDefault();
    const f = fileRef.current?.files?.[0];
    if (!f) return setMsg({ type: "err", text: "Choose an image first." });
    setBusy(true); setMsg(null);
    const fd = new FormData();
    fd.append("file", f); fd.append("link", link); fd.append("title", title || f.name.replace(/\.[^.]+$/, "")); fd.append("enabled", "true");
    const r = await fetch("/api/admin/poster", { method: "POST", body: fd });
    const j = await r.json();
    setBusy(false);
    if (!r.ok) return setMsg({ type: "err", text: j.error });
    setPoster(j.poster); setPreview(null); if (fileRef.current) fileRef.current.value = "";
    setMsg({ type: "ok", text: `Uploaded and converted to WebP (${j.originalKB} KB → ${j.webpKB} KB). It is now live on the website.` });
  }

  async function patch(body: object, ok: string) {
    setBusy(true); setMsg(null);
    const r = await fetch("/api/admin/poster", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const j = await r.json(); setBusy(false);
    if (!r.ok) return setMsg({ type: "err", text: j.error });
    setPoster(j.poster); setMsg({ type: "ok", text: ok });
  }

  async function remove() {
    if (!confirm("Remove the popup poster from the website?")) return;
    setBusy(true);
    await fetch("/api/admin/poster", { method: "DELETE" });
    setBusy(false); setPoster(null); setMsg({ type: "ok", text: "Poster removed." });
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setState("login"); setPoster(null);
  }

  const card = "rounded-3xl bg-white p-6 shadow-[0_24px_50px_-30px_rgba(74,10,13,.45)] ring-1 ring-brand-line md:p-8";
  const input = "h-12 w-full rounded-xl border border-brand-line bg-white px-4 text-[0.9375rem] outline-none focus:border-brand-red";

  return (
    <section className="min-h-[70vh] bg-brand-cream py-12">
      <div className="wrap max-w-4xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-brand-red">Admin panel</p>
            <h1 className="text-4xl font-semibold text-brand-ink">Popup poster</h1>
          </div>
          {state === "ready" && <button onClick={logout} className="rounded-full px-4 py-2 text-sm font-bold text-brand-muted ring-1 ring-brand-line hover:text-brand-red">Log out</button>}
        </div>

        {msg && <p className={`mb-6 rounded-2xl px-5 py-3 text-sm font-semibold ${msg.type === "ok" ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-700"}`}>{msg.text}</p>}

        {state === "loading" && <p className="text-brand-muted">Loading…</p>}

        {state === "login" && (
          <form onSubmit={login} className={`${card} mx-auto max-w-md`}>
            <h2 className="text-2xl font-semibold text-brand-ink">Log in</h2>
            <p className="mb-5 mt-1 text-sm text-brand-muted">Enter your admin PIN.</p>
            <input type="password" inputMode="numeric" autoComplete="current-password" value={pw} onChange={(e) => setPw(e.target.value)} autoFocus required placeholder="PIN" className={`${input} text-center text-2xl tracking-[0.5em]`} />
            <button disabled={busy} className="btn-red mt-4 w-full">{busy ? "Checking…" : "Log in"}</button>
          </form>
        )}

        {state === "ready" && (
          <div className="grid gap-6 md:grid-cols-[1fr_1fr]">
            {/* current poster */}
            <div className={card}>
              <h2 className="text-xl font-semibold text-brand-ink">Current poster</h2>
              {poster ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/api/poster/image?v=${poster.updatedAt}`} alt={poster.title} className="mt-4 w-full rounded-2xl ring-1 ring-brand-line" />
                  <p className="mt-3 text-xs text-brand-muted">{poster.width}×{poster.height} WebP · updated {new Date(poster.updatedAt).toLocaleString("en-IN")}</p>
                  <div className="mt-4 flex items-center justify-between rounded-2xl bg-brand-cream px-4 py-3">
                    <span className="text-sm font-bold">{poster.enabled ? "🟢 Showing on website" : "⚪ Hidden"}</span>
                    <button disabled={busy} onClick={() => patch({ enabled: !poster.enabled }, poster.enabled ? "Popup hidden." : "Popup is live again.")}
                      className={`rounded-full px-4 py-2 text-sm font-bold text-white ${poster.enabled ? "bg-brand-muted" : "bg-emerald-600"}`}>
                      {poster.enabled ? "Hide" : "Show"}
                    </button>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button disabled={busy} onClick={() => patch({ reshow: true }, "Visitors will see the popup again.")} className="rounded-full px-4 py-2 text-sm font-bold ring-1 ring-brand-line hover:text-brand-red">Show again to everyone</button>
                    <button disabled={busy} onClick={remove} className="rounded-full px-4 py-2 text-sm font-bold text-red-600 ring-1 ring-red-200 hover:bg-red-50">Remove</button>
                  </div>
                </>
              ) : (
                <p className="mt-4 rounded-2xl border-2 border-dashed border-brand-line p-8 text-center text-brand-muted">No poster yet. Upload one →</p>
              )}
            </div>

            {/* upload + settings */}
            <div className="space-y-6">
              <form onSubmit={upload} className={card}>
                <h2 className="text-xl font-semibold text-brand-ink">{poster ? "Replace poster" : "Upload poster"}</h2>
                <p className="mt-1 text-sm text-brand-muted">JPG, PNG or WebP up to 20 MB. It is converted to WebP automatically and pops up 3 seconds after someone opens the website.</p>
                <label className="mt-5 block cursor-pointer rounded-2xl border-2 border-dashed border-brand-line p-5 text-center hover:border-brand-red">
                  <input ref={fileRef} type="file" accept="image/*" className="sr-only"
                    onChange={(e) => { const f = e.target.files?.[0]; setPreview(f ? URL.createObjectURL(f) : null); }} />
                  {preview
                    // eslint-disable-next-line @next/next/no-img-element
                    ? <img src={preview} alt="" className="mx-auto max-h-64 rounded-xl" />
                    : <span className="text-sm font-semibold text-brand-red">Click to choose an image</span>}
                </label>
                <label className="mt-4 block text-sm font-bold text-brand-ink">Title (for accessibility)
                  <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Sukrithi Pride Bhoomi Pooja" className={`${input} mt-1.5 font-normal`} />
                </label>
                <label className="mt-4 block text-sm font-bold text-brand-ink">Link when clicked (optional)
                  <input value={link} onChange={(e) => setLink(e.target.value)} placeholder="Leave empty to open the booking form" className={`${input} mt-1.5 font-normal`} />
                </label>
                <button disabled={busy} className="btn-red mt-5 w-full">{busy ? "Uploading…" : "Upload & publish"}</button>
              </form>

              {poster && (
                <div className={card}>
                  <h2 className="text-xl font-semibold text-brand-ink">Settings</h2>
                  <label className="mt-4 block text-sm font-bold text-brand-ink">Title
                    <input value={title} onChange={(e) => setTitle(e.target.value)} className={`${input} mt-1.5 font-normal`} />
                  </label>
                  <label className="mt-4 block text-sm font-bold text-brand-ink">Link when clicked
                    <input value={link} onChange={(e) => setLink(e.target.value)} placeholder="Empty = open booking form" className={`${input} mt-1.5 font-normal`} />
                  </label>
                  <button disabled={busy} onClick={() => patch({ link, title }, "Settings saved.")} className="btn-outline mt-5 w-full">Save settings</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
