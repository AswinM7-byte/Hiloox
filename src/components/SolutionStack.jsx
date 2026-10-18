"use client";

import { Children, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

function Card({ children, index, count, progress }) {
  const reduced = useReducedMotion();
  const scale = useTransform(progress, [index / count, (index + 1) / count], [1, index === count - 1 ? 1 : .965]);
  return <motion.div className="solution-stack-card" style={{ "--card-index": index, zIndex: index + 1, scale: reduced ? 1 : scale }}>{children}</motion.div>;
}

export default function SolutionStack({ children }) {
  const target = useRef(null);
  const cards = Children.toArray(children);
  const { scrollYProgress } = useScroll({ target, offset: ["start 120px", "end end"] });
  return <div ref={target} className="container-page solution-stories solution-stack">{cards.map((child, i) => <Card key={child.key} index={i} count={cards.length} progress={scrollYProgress}>{child}</Card>)}</div>;
}
