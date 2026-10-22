"use client";

import { useEffect, useRef } from "react";

/** Animate only after observation; server-rendered content is always visible. */
export default function useViewportReveal(selector, { exclude = "", className = "content-enter" } = {}) {
  const root = useRef(null);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nodes = [...element.querySelectorAll(selector)].filter(node => !exclude || !node.closest(exclude));
    let observer;
    const reset = () => {
      observer?.disconnect();
      nodes.forEach(node => node.classList.remove(className));
    };
    const start = () => {
      reset();
      if (preference.matches || !("IntersectionObserver" in window)) return;
      observer = new IntersectionObserver(entries => {
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting) return;
          target.classList.add(className);
          observer.unobserve(target);
        });
      }, { threshold: .08 });
      nodes.forEach(node => observer.observe(node));
    };
    start();
    preference.addEventListener("change", start);
    return () => { reset(); preference.removeEventListener("change", start); };
  }, [selector, exclude, className]);
  return root;
}
