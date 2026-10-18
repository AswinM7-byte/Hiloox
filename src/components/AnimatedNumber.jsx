"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * Smoothly tweens between number values whenever `value` changes — used for
 * live-updating figures (e.g. a savings calculator) rather than a one-time
 * scroll-triggered count. Unlike CountUp, this has no "once in view" gate.
 */
export default function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  locale = "en-IN",
  className,
}) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const motionValue = useMotionValue(value);
  const spring = useSpring(motionValue, { stiffness: 120, damping: 20, mass: 0.6 });

  useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);

  useEffect(() => {
    if (reduceMotion && ref.current) {
      ref.current.textContent = `${prefix}${value.toLocaleString(locale)}${suffix}`;
    }
  }, [reduceMotion, value, prefix, suffix, locale]);

  useEffect(() => {
    const unsub = spring.on("change", (latest) => {
      if (ref.current && !reduceMotion) {
        ref.current.textContent = `${prefix}${Math.round(latest).toLocaleString(locale)}${suffix}`;
      }
    });
    return unsub;
  }, [spring, prefix, suffix, locale, reduceMotion]);

  return (
    <motion.span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString(locale)}
      {suffix}
    </motion.span>
  );
}
