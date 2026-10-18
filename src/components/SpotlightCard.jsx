"use client";

import { useRef, } from "react";
import clsx from "clsx";

/**
 * Wraps a card with a cursor-tracked radial highlight instead of a static
 * "glow on hover" shadow. The highlight only follows the mouse while it's
 * inside the card, so it reads as responsive rather than decorative.
 */
export default function SpotlightCard({ children, className, dark = false }) {
  const ref = useRef(null);

  function handleMouseMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={clsx("spotlight-card", dark && "spotlight-card--dark", className)}
    >
      {children}
    </div>
  );
}
