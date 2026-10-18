"use client";

import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useScrolledPast } from "@/lib/hooks";

export default function ScrollToTop() {
  const reduced = useReducedMotion();
  const visible = useScrolledPast(560);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reduced ? "instant" : "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: reduced ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white/90 text-ink backdrop-blur-sm transition-colors hover:bg-primary hover:text-white hover:border-primary md:bottom-8 md:right-8"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

