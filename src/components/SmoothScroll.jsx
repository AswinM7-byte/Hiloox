"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";

/**
 * Site-wide inertial smooth scroll (Lenis). Wraps the whole document so
 * every section — not just individual components — gets the same eased
 * scroll feel. Falls back to instant, un-eased scrolling under
 * prefers-reduced-motion rather than forcing momentum on people who've
 * asked for less motion.
 */
export default function SmoothScroll({ children }) {
  const reduceMotion = useReducedMotion();

  return (
    <ReactLenis
      root
      options={{
        lerp: reduceMotion ? 1 : 0.1,
        duration: reduceMotion ? 0 : 1.15,
        smoothWheel: !reduceMotion,
        syncTouch: false,
        anchors: { immediate: Boolean(reduceMotion) },
      }}
    >
      {children}
    </ReactLenis>
  );
}

