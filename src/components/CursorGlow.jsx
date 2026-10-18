"use client";

import { useEffect, useRef, } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * A soft radial light that follows the cursor within `boundsRef`, eased so
 * it trails slightly rather than snapping — reads as the background itself
 * responding to the user rather than a UI element. Fades out on
 * pointerleave and is skipped entirely under prefers-reduced-motion.
 */
export default function CursorGlow({
  boundsRef,
  className,
  size = 560,
  colorA = "90,49,244",
  colorB = "0,198,174",
}) {
  const glowRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const bounds = boundsRef.current;
    const glow = glowRef.current;
    if (!bounds || !glow || reduceMotion) return;

    let raf = 0;
    let targetX = bounds.clientWidth / 2;
    let targetY = bounds.clientHeight / 2;
    let curX = targetX;
    let curY = targetY;

    function handleMove(e) {
      const rect = bounds.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      glow.style.opacity = "1";
    }

    function handleLeave() {
      glow.style.opacity = "0";
    }

    function loop() {
      curX += (targetX - curX) * 0.12;
      curY += (targetY - curY) * 0.12;
      glow.style.transform = `translate3d(${curX - size / 2}px, ${curY - size / 2}px, 0)`;
      raf = requestAnimationFrame(loop);
    }

    bounds.addEventListener("pointermove", handleMove, { passive: true });
    bounds.addEventListener("pointerleave", handleLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      bounds.removeEventListener("pointermove", handleMove);
      bounds.removeEventListener("pointerleave", handleLeave);
    };
  }, [boundsRef, reduceMotion, size]);

  if (reduceMotion) return null;

  return (
    <div aria-hidden className={className} style={{ mixBlendMode: "screen" }}>
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: size,
          height: size,
          opacity: 0,
          transition: "opacity 500ms ease",
          background: `radial-gradient(circle, rgba(${colorA},0.4) 0%, rgba(${colorB},0.16) 45%, transparent 72%)`,
          filter: "blur(30px)",
          willChange: "transform, opacity",
        }}
      />
    </div>
  );
}
