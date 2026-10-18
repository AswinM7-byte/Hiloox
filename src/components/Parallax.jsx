"use client";

import { useRef, } from "react";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";

/**
 * Scroll-linked vertical parallax wrapper.
 *
 * Note: this applies a transform, which creates a containing block — do not
 * wrap elements that rely on `position: sticky` or `fixed` children, as the
 * transform will break their positioning.
 */
export default function Parallax({ children, className, speed = 50, smooth = true }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const raw = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  const smoothed = useSpring(raw, { stiffness: 140, damping: 30, mass: 0.3 });

  return (
    <motion.div ref={ref} style={{ y: reduceMotion ? 0 : smooth ? smoothed : raw }} className={className}>
      {children}
    </motion.div>
  );
}
