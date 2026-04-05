"use client";

import { useEffect, useRef } from "react";

/** Full-viewport dark radial pool that follows the pointer. Sits above stars, below content (see globals `.app-cursor-orb`). */
export function AppPointerAmbience() {
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const orb = orbRef.current;
    if (!orb) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const onMove = (e: PointerEvent) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      orb.style.setProperty("--orb-x", `${(e.clientX / w) * 100}%`);
      orb.style.setProperty("--orb-y", `${(e.clientY / h) * 100}%`);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return <div ref={orbRef} aria-hidden className="app-cursor-orb" />;
}
