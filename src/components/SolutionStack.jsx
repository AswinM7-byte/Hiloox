"use client";

import { Children, useEffect, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import useViewportReveal from "@/lib/useViewportReveal";

function Card({ children, index }) {
  const marker = useRef(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: marker,
    offset: ["start 90%", "start 22%"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [12, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [0.97, 1]);
  const emphasis = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const arrivalY = useTransform(scrollYProgress, [0, .85, 1], [14, 0, 0]);
  const arrivalOpacity = useTransform(scrollYProgress, [0, .75, 1], [.86, 1, 1]);

  return (
    <>
      <div
        ref={marker}
        className="solution-stack-marker"
        aria-hidden="true"
      />

      <motion.div
        className="solution-stack-card"
        style={{
          "--card-index": index,
          "--solution-image-y": reduced ? 0 : imageY,
          "--solution-image-scale": reduced ? 1 : imageScale,
          "--solution-emphasis": reduced ? 0 : emphasis,
          "--solution-arrival-y": reduced ? 0 : arrivalY,
          "--solution-arrival-opacity": reduced ? 1 : arrivalOpacity,
        }}
      >
        {children}
      </motion.div>
    </>
  );
}

export default function SolutionStack({ children }) {
  const target = useViewportReveal(
    ".solution-copy > *, .solution-diagram > :not(.solution-image-depth), .solution-diagram li",
    { className: "solution-enter" }
  );

  const cards = Children.toArray(children);

  useEffect(() => {
    const root = target.current;
    const stories = [...root.querySelectorAll(".solution-story")];
    const media = matchMedia("(min-width: 761px) and (prefers-reduced-motion: no-preference)");
    let frame = 0;

    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const styles = getComputedStyle(root);
        const top = parseFloat(styles.getPropertyValue("--stack-top"));
        const gap = parseFloat(styles.getPropertyValue("--stack-gap"));
        const height = Math.ceil(Math.max(...stories.map(story => story.offsetHeight))) + 2;
        root.style.setProperty("--stack-card-height", `${height}px`);
        root.dataset.stackFit = String(media.matches && height + top + (stories.length - 1) * gap + 24 <= window.innerHeight);
      });
    };

    const observer = new ResizeObserver(measure);
    stories.forEach(story => observer.observe(story));
    media.addEventListener("change", measure);
    window.addEventListener("resize", measure);
    measure();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      media.removeEventListener("change", measure);
      window.removeEventListener("resize", measure);
    };
  }, [target]);

  return (
    <div
      ref={target}
      className="container-page solution-stories solution-stack"
    >
      {cards.map((child, index) => (
        <Card key={child.key ?? index} index={index}>
          {child}
        </Card>
      ))}
    </div>
  );
}
