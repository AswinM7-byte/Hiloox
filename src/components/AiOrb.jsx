"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { Pause, Play, Sparkles } from "lucide-react";
import { createOrbScene } from "@/lib/orb-scene.mjs";

export function DepthSurface({ children, className = "" }) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 130, damping: 22 });
  const rotateY = useSpring(y, { stiffness: 130, damping: 22 });

  function move(event) {
    if (reduced || event.pointerType !== "mouse" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(((event.clientY - rect.top) / rect.height - 0.5) * -10);
    y.set(((event.clientX - rect.left) / rect.width - 0.5) * 12);
  }

  return (
    <motion.div
      className={className}
      onPointerMove={move}
      onPointerLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX: reduced ? 0 : rotateX, rotateY: reduced ? 0 : rotateY, transformPerspective: 1000 }}
    >
      {children}
    </motion.div>
  );
}

/** An illustrative particle instrument, never connected to audio or a microphone. */
export default function AiOrb({ compact = false }) {
  const stage = useRef(null);
  const canvas = useRef(null);
  const lights = useRef([]);
  const scene = useRef(null);
  const helpId = useId();
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    scene.current = createOrbScene(canvas.current, stage.current, lights.current);
    return () => { scene.current?.destroy(); scene.current = null; };
  }, []);

  useEffect(() => { scene.current?.setPaused(paused); }, [paused]);

  function release(index, event, cancelled = false) {
    scene.current?.release(index, cancelled);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  return (
    <figure className={`voice-orb ${compact ? "voice-orb-compact" : ""}`}>
      <div
        className="voice-particle-stage"
        ref={stage}
        onPointerMove={(event) => { if (event.pointerType === "mouse") scene.current?.point(event); }}
        onPointerLeave={() => scene.current?.point(null)}
      >
        <div className="voice-orb-fallback" aria-hidden="true" />
        <canvas ref={canvas} className="voice-particle-canvas" role="img" aria-label="An illustrative violet voice orb surrounded by flowing white particle waves and luminous orbital rings" />
        {[0, 1, 2].map((index) => (
          <button
            key={index}
            ref={(node) => { lights.current[index] = node; }}
            type="button"
            className={`voice-light voice-light-${index}`}
            aria-label={`Move decorative light ${index + 1}`}
            aria-describedby={helpId}
            onPointerDown={(event) => {
              if (!event.isPrimary || event.button !== 0) return;
              event.currentTarget.setPointerCapture(event.pointerId);
              scene.current?.grab(index, event);
            }}
            onPointerMove={(event) => scene.current?.move(index, event)}
            onPointerUp={(event) => release(index, event)}
            onPointerCancel={(event) => release(index, event, true)}
            onLostPointerCapture={() => scene.current?.release(index, true)}
            onKeyDown={(event) => {
              if (scene.current?.nudge(index, event.key)) event.preventDefault();
            }}
            onClick={() => scene.current?.pulse()}
          >
            <span aria-hidden="true" />
          </button>
        ))}
      </div>
      <figcaption className="voice-orb-caption">
        <span className="voice-orb-label"><Sparkles size={12} aria-hidden="true" /> YONA / VOICE INTELLIGENCE</span>
        <p id={helpId}>Drag the lights. Use arrow keys to move, Home to reset. Decorative only.</p>
        <button
          className="voice-motion-toggle"
          type="button"
          disabled={Boolean(reduced)}
          aria-pressed={paused || Boolean(reduced)}
          onClick={() => setPaused((value) => !value)}
        >
          {paused || reduced ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
          {reduced ? "Reduced motion" : paused ? "Resume motion" : "Pause motion"}
        </button>
      </figcaption>
    </figure>
  );
}
