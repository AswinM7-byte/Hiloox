"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin gradient bar pinned to the very top of the viewport, tracking overall
 * page scroll. Purposeful for a long single-page site — gives the visitor a
 * sense of "how much is left" without adding decorative chrome.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 40,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-primary via-secondary to-primary"
    />
  );
}
