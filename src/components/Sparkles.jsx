"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Lightweight canvas particle field — a dependency-free stand-in for
 * tsparticles. Drifting, twinkling dots with an optional cursor-repel
 * interaction. Kept intentionally simple (single canvas, rAF loop) so it
 * stays cheap even with a few hundred particles.
 */
export default function Sparkles({
  className,
  density = 800,
  color = "#ffffff",
  size = 1.6,
  speed = 0.35,
  mousemove = false,
}) {
  const canvasRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    let particles = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };

    function seed() {
      const area = width * height;
      const count = Math.max(24, Math.min(320, Math.round((area / (800 * 800)) * density)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * size + 0.4,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed - speed * 0.15,
        alpha: Math.random(),
        alphaDir: Math.random() > 0.5 ? 1 : -1,
        twinkleSpeed: 0.004 + Math.random() * 0.01,
      }));
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function drawStatic() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;
      for (const p of particles) {
        ctx.globalAlpha = 0.35;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function tick() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (mousemove) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          const radius = 90;
          if (dist < radius && dist > 0.001) {
            const force = (1 - dist / radius) * 0.6;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }

        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        p.alpha += p.alphaDir * p.twinkleSpeed;
        if (p.alpha >= 1) {
          p.alpha = 1;
          p.alphaDir = -1;
        } else if (p.alpha <= 0.15) {
          p.alpha = 0.15;
          p.alphaDir = 1;
        }

        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(tick);
    }

    function handlePointerMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    if (mousemove) window.addEventListener("pointermove", handlePointerMove, { passive: true });

    if (reduceMotion) {
      drawStatic();
    } else {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      if (mousemove) window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [density, color, size, speed, mousemove, reduceMotion]);

  return <canvas ref={canvasRef} aria-hidden className={className} style={{ pointerEvents: "none" }} />;
}
