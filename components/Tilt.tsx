"use client";
import { useRef } from "react";

/**
 * 3D tilt wrapper: the element leans towards the mouse with a moving light glare.
 * Mouse only (no effect on touch), and disabled for users who prefer reduced motion via CSS.
 */
export default function Tilt({ children, className = "", max = 9, as: Tag = "div" }: { children: React.ReactNode; className?: string; max?: number; as?: "div" | "address" | "article" | "li" }) {
  const ref = useRef<HTMLElement>(null);

  function move(e: React.PointerEvent) {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    ref.current.style.transform = `perspective(1000px) rotateX(${(0.5 - y) * max}deg) rotateY(${(x - 0.5) * max}deg) translateY(-6px)`;
    ref.current.style.setProperty("--gx", `${x * 100}%`);
    ref.current.style.setProperty("--gy", `${y * 100}%`);
  }
  function leave() {
    if (ref.current) ref.current.style.transform = "";
  }

  return (
    <Tag ref={ref as never} onPointerMove={move} onPointerLeave={leave} className={`tilt relative ${className}`}>
      {children}
      <span aria-hidden className="tilt-glare" />
    </Tag>
  );
}
