"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * A "live call" overlay: animated audio bars plus a transcript line that
 * swaps every few seconds. Purely illustrative — it communicates what the
 * voice agent does far faster than a static screenshot does.
 */
export default function VoiceWaveform({ transcript, bars = 28 }) {
  const reduceMotion = useReducedMotion();
  const [line, setLine] = useState(0);

  // Fixed pseudo-random profile so bars differ but don't reshuffle on render.
  const barConfig = useMemo(
    () =>
      Array.from({ length: bars }, (_, i) => ({
        duration: 620 + ((i * 137) % 620),
        delay: (i * 83) % 700,
        height: 22 + ((i * 47) % 60),
      })),
    [bars]
  );

  useEffect(() => {
    if (reduceMotion || transcript.length <= 1) return;
    const id = setInterval(() => setLine((v) => (v + 1) % transcript.length), 3200);
    return () => clearInterval(id);
  }, [reduceMotion, transcript.length]);

  return (
    <div className="rounded-2xl border border-white/15 bg-black/45 p-4 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
        </span>
        <span className="text-[11px] font-medium text-white/80">Simulated voice conversation</span>
        <span className="ml-auto text-[11px] tabular-nums text-white/50">Example</span>
      </div>

      <div className="mt-3 flex h-10 items-center gap-[3px]">
        {barConfig.map((b, i) => (
          <span
            key={i}
            className="wave-bar w-full rounded-full bg-gradient-to-t from-secondary/60 to-secondary"
            style={
              {
                height: `${b.height}%`,
                "--bar-duration": `${b.duration}ms`,
                "--bar-delay": `${b.delay}ms`,
              } 
            }
          />
        ))}
      </div>

      <div className="mt-3 h-8 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={line}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="text-xs leading-relaxed text-white/70"
          >
            {transcript[line]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

