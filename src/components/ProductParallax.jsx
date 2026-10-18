"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export default function ProductParallax({ children }) {
  const target = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target, offset: ["start end", "end start"] });
  const foreground = useTransform(scrollYProgress, [0, 1], [24, -24]);
  const background = useTransform(scrollYProgress, [0, 1], [-14, 14]);
  return <div ref={target} className="product-parallax">
    <motion.div aria-hidden="true" className="product-parallax-glow" style={{ y: reduced ? 0 : background }} />
    <motion.div className="product-parallax-art" style={{ y: reduced ? 0 : foreground }}>{children}</motion.div>
  </div>;
}
