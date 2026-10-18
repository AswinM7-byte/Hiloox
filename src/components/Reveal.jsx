"use client";

import { motion, useReducedMotion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  once = true,
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : "hidden"}
      whileInView="show"
      viewport={{ once, margin: "-80px" }}
      variants={{
        hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : y },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function RevealGroup({
  children,
  className,
  stagger = 0.08,
}

) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ staggerChildren: stagger }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}

) {
  const reduced = useReducedMotion();
  return (
    <motion.div className={className} variants={reduced ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } } : variants} transition={{ duration: reduced ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}
