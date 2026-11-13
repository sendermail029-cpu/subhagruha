"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

/** Background slideshow for page banners: slow cross-fade with a gentle zoom. No controls. */
export default function HeroSlides({ images, interval = 5000 }: { images: string[]; interval?: number }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (images.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((x) => (x + 1) % images.length), interval);
    return () => clearInterval(t);
  }, [images.length, interval]);

  return (
    <div aria-hidden className="absolute inset-0 -z-30 overflow-hidden bg-brand-green-deep">
      {images.map((src, n) => (
        <div key={src} className={`absolute inset-0 transition-opacity duration-[1500ms] ${n === i ? "slide-active opacity-100" : "opacity-0"}`}>
          <Image src={src} alt="" fill priority={n === 0} sizes="100vw" quality={90} className="slide-img object-cover [filter:saturate(1.3)_contrast(1.12)_brightness(1.06)]" />
        </div>
      ))}
    </div>
  );
}
