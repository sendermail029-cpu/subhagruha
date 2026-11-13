"use client";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useRef } from "react";

/**
 * Plays on every page change, including sub-pages (keyed by the full path):
 * a warm cream screen shows the full Subhagruha logo with a gold line drawing beneath it,
 * then the screen lifts away like a curtain while the new page rises into place.
 * Skipped on the very first page a visitor lands on, so the page shows instantly (better speed & SEO).
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const firstPath = useRef(path);
  const navigated = useRef(false);
  useEffect(() => { if (path !== firstPath.current) navigated.current = true; }, [path]);
  const animate = navigated.current || path !== firstPath.current;

  if (!animate) return <>{children}</>;
  return (
    <Fragment key={path}>
      <div aria-hidden className="pt-curtain">
        <div className="pt-glow" />
        <div className="pt-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="" className="pt-logo" />
          <span className="pt-line" />
        </div>
        <span className="pt-edge" />
      </div>
      <div className="page-enter">{children}</div>
    </Fragment>
  );
}
