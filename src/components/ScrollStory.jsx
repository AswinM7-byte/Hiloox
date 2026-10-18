"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

function Word({ children, progress, start, end, reduced, from }) {
  const color = useTransform(progress, [start, end], [from, "#5a31f4"]);
  return <motion.span style={{ color: reduced ? "#5a31f4" : color }}>{children}</motion.span>;
}

/** Selectable original copy; motion values update styles without React renders. */
export default function ScrollStory({ children, className = "brand-copy", as: Tag = "p", from = "#716a80", offset = ["start 88%", "end 48%"] }) {
  const target = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target, offset });
  const words = children.split(/(\s+)/);
  const count = words.filter(word => word.trim()).length;
  let index = 0;
  return <Tag ref={target} className={`${className} scroll-story`} style={{ color: from }}>{words.map((word, i) => {
    if (!word.trim()) return word;
    const start = index++ / count;
    return <Word key={i} progress={scrollYProgress} start={start} end={Math.min(1, start + 2 / count)} reduced={reduced} from={from}>{word}</Word>;
  })}</Tag>;
}
