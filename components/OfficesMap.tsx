"use client";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";

export type MapOffice = { city: string; type: string; lat: number; lng: number; directions: string };

/**
 * One large map with all offices pinned and labelled.
 * Uses Leaflet + OpenStreetMap tiles (free, attribution shown). Scroll-zoom is off so the page scrolls normally.
 */
export default function OfficesMap({ offices }: { offices: MapOffice[] }) {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: import("leaflet").Map | undefined;
    let cancelled = false;
    const node = el.current;
    let io: IntersectionObserver | undefined;
    const init = async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !el.current) return;
      map = L.map(el.current, { scrollWheelZoom: false, zoomControl: true, attributionControl: true });
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
        className: "map-tiles-warm",
      }).addTo(map);

      const pts: [number, number][] = [];
      offices.forEach((o, i) => {
        const hq = i === 0;
        const icon = L.divIcon({
          className: "",
          iconSize: [0, 0],
          html: `
            <div class="office-pin ${hq ? "office-pin--hq" : ""}">
              <span class="office-pin__pulse"></span>
              <span class="office-pin__dot"></span>
              <span class="office-pin__label"><b>${o.city}</b><small>${o.type}</small></span>
            </div>`,
        });
        L.marker([o.lat, o.lng], { icon, keyboard: true, title: `${o.city} – ${o.type}` })
          .addTo(map!)
          .on("click", () => window.open(o.directions, "_blank", "noopener"));
        pts.push([o.lat, o.lng]);
      });
      map.fitBounds(L.latLngBounds(pts), { padding: [70, 70] });
    };
    if (node && "IntersectionObserver" in window) {
      io = new IntersectionObserver((e) => { if (e[0].isIntersecting) { io?.disconnect(); init(); } }, { rootMargin: "300px" });
      io.observe(node);
    } else init();
    return () => {
      cancelled = true;
      io?.disconnect();
      map?.remove();
    };
  }, [offices]);

  return <div ref={el} className="h-[23.75rem] w-full md:h-[32.5rem]" role="region" aria-label="Map of Subhagruha offices in Hyderabad, Vijayawada and Visakhapatnam" />;
}
