"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Background video for page banners. Muted, no controls, plays continuously and a little faster.
 * With several clips it plays them one after another in a loop, cross-fading between two video layers.
 */
export default function HeroVideo({ clips, rate = 0.8 }: { clips: string[]; rate?: number }) {
  const a = useRef<HTMLVideoElement>(null);
  const b = useRef<HTMLVideoElement>(null);
  const [front, setFront] = useState<0 | 1>(0);
  const [idx, setIdx] = useState(0);
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [go, setGo] = useState(false);
  // start videos only after the page has loaded and the browser is idle (poster shows meanwhile)
  useEffect(() => {
    const start = () => {
      const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
      ric ? ric(() => setGo(true), { timeout: 2500 }) : setTimeout(() => setGo(true), 1200);
    };
    if (document.readyState === "complete") start(); else window.addEventListener("load", start, { once: true });
  }, []);

  useEffect(() => { setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches); }, []);

  // start the current clip on the front layer, preload the next one on the back layer
  useEffect(() => {
    if (reduced || !go) return;
    const vids = [a.current, b.current];
    const cur = vids[front], next = vids[front ^ 1];
    if (!cur) return;
    cur.playbackRate = rate;
    // the video may already be playing before this code loads, so check instead of waiting for "playing"
    if (!cur.paused && cur.readyState >= 2) setReady(true);
    cur.play().then(() => setReady(true)).catch(() => {});
    if (next && clips.length > 1) {
      const n = (idx + 1) % clips.length;
      if (!next.src.endsWith(encodeURI(clips[n]))) { next.src = clips[n]; next.load(); }
    }
  }, [front, idx, clips, rate, reduced, go]);

  const onEnded = () => {
    if (clips.length < 2) return;
    const back = [a.current, b.current][front ^ 1];
    if (back) { back.currentTime = 0; back.playbackRate = rate; back.play().catch(() => {}); }
    setFront((f) => (f ^ 1) as 0 | 1);
    setIdx((i) => (i + 1) % clips.length);
  };

  if (reduced || !go || !clips.length) return null;
  const single = clips.length === 1;
  const common = "absolute inset-0 h-full w-full object-cover transition-opacity duration-700";

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}>
      <video ref={a} src={clips[0]} poster={clips[0].replace(/\.mp4$/, ".webp")} muted playsInline autoPlay loop={single} preload="auto"
        onPlaying={() => setReady(true)} onTimeUpdate={() => setReady(true)} onEnded={front === 0 ? onEnded : undefined}
        className={`${common} ${front === 0 ? "opacity-100" : "opacity-0"}`} />
      {!single && (
        <video ref={b} muted playsInline preload="metadata" onEnded={front === 1 ? onEnded : undefined}
          className={`${common} ${front === 1 ? "opacity-100" : "opacity-0"}`} />
      )}
    </div>
  );
}
