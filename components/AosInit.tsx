"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Animate-on-scroll: elements with data-aos="fade-up" etc. animate in as they enter the viewport. */
export default function AosInit() {
  const path = usePathname();
  useEffect(() => {
    document.documentElement.classList.add("aos-ready");
    AOS.init({ duration: 800, easing: "ease-out-cubic", once: true, offset: 60, disable: () => window.matchMedia("(prefers-reduced-motion: reduce)").matches });
  }, []);
  useEffect(() => {
    // re-scan after client-side navigation so new pages animate too
    const t = setTimeout(() => AOS.refreshHard(), 50);
    return () => clearTimeout(t);
  }, [path]);
  return null;
}
