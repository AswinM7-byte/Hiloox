"use client";

import { useRef, } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import clsx from "clsx";

/**
 * Wraps a media block (product screenshot, device mock) with two effects:
 * 1. A clip-path wipe reveal the first time it scrolls into view.
 * 2. A restrained 3D tilt that follows the cursor while hovering.
 * Both respect prefers-reduced-motion.
 */
export default function TiltReveal({ children, className, maxTilt = 6 }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  function handleMouseMove(e) {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * maxTilt * 2);
    rotateX.set(-py * maxTilt * 2);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      initial={reduceMotion ? undefined : { clipPath: "inset(0 0 14% 0)", y: 16 }}
      whileInView={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={clsx(className)}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX: springX, rotateY: springY, transformPerspective: 1000 }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
