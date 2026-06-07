"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";

/**
 * Lenis smooth scrolling. Disabled automatically when the user prefers
 * reduced motion. Exposes a global scroll-to helper for in-page anchor CTAs.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <ReactLenis
      root
      options={{
        duration: 1.1,
        lerp: 0.1,
        smoothWheel: !prefersReduced,
        syncTouch: false,
      }}
    >
      <ScrollAnchors />
      {children}
    </ReactLenis>
  );
}

/** Intercept same-page hash links so Lenis handles the scroll smoothly. */
function ScrollAnchors() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      if (!target) return;
      const id = target.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -64 });
      history.replaceState(null, "", id);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [lenis]);

  return null;
}
