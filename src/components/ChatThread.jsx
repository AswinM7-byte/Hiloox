"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * Replays a short WhatsApp-style exchange on a loop, with a typing
 * indicator before each agent reply. Shows the messaging agent actually
 * working rather than describing it.
 */
export default function ChatThread({ script }) {
  const reduceMotion = useReducedMotion();
  const [shown, setShown] = useState(reduceMotion ? script.length : 0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;

    let cancelled = false;
    const timers = [];

    function schedule(fn, ms) {
      timers.push(setTimeout(() => !cancelled && fn(), ms));
    }

    function step(index) {
      if (index >= script.length) {
        // Hold the finished thread briefly, then restart the loop.
        schedule(() => {
          setShown(0);
          step(0);
        }, 2600);
        return;
      }

      const isAgent = script[index].from === "agent";
      const think = isAgent ? 900 : 500;

      if (isAgent) setTyping(true);

      schedule(() => {
        setTyping(false);
        setShown(index + 1);
        schedule(() => step(index + 1), 700);
      }, think);
    }

    // Scheduled rather than called directly: step() can setState, and doing
    // that synchronously in an effect body triggers cascading renders.
    schedule(() => step(0), 400);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [script, reduceMotion]);

  return (
    <div className="rounded-2xl border border-white/15 bg-black/45 p-4 backdrop-blur-md">
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
        </span>
        <span className="text-[11px] font-medium text-white/80">WhatsApp · Scripted simulation</span>
      </div>

      <div className="mt-3 flex min-h-[132px] flex-col justify-end gap-2">
        <AnimatePresence initial={false}>
          {script.slice(0, reduceMotion ? script.length : shown).map((m, i) => (
            <motion.div
              key={`${m.from}-${i}`}
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                m.from === "agent"
                  ? "self-end rounded-br-sm bg-secondary/85 text-[#04231f]"
                  : "self-start rounded-bl-sm bg-white/12 text-white/85"
              }`}
            >
              {m.text}
            </motion.div>
          ))}
        </AnimatePresence>

        {typing && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="self-end rounded-2xl rounded-br-sm bg-secondary/25 px-3 py-2.5"
          >
            <span className="flex gap-1">
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  className="wave-bar h-1.5 w-1.5 rounded-full bg-white/70"
                  style={
                    { "--bar-duration": "900ms", "--bar-delay": `${d * 160}ms` } 
                  }
                />
              ))}
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
}

