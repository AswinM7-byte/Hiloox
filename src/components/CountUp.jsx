"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * Animates a number counting up to `value` once it scrolls into view.
 * Used for stat callouts that would otherwise just appear as static text.
 */
export default function CountUp({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
  duration = 1.4,
  locale = "en-US",
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });

  useEffect(() => {
    if (inView) motionValue.set(reduceMotion ? value : value);
  }, [inView, motionValue, value, reduceMotion]);

  useEffect(() => {
    const unsub = spring.on("change", (latest) => {
      if (ref.current) {
        const formatted = latest.toLocaleString(locale, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        });
        ref.current.textContent = `${prefix}${formatted}${suffix}`;
      }
    });
    return unsub;
  }, [spring, prefix, suffix, decimals, locale]);

  return (
    <motion.span ref={ref} className={className}>
      {prefix}
      {(0).toFixed(decimals)}
      {suffix}
    </motion.span>
  );
}
