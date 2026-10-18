"use client";

import { useEffect, useRef } from "react";

/** Progressive reveals: content stays visible without JavaScript. */
export default function PageTransitions({ children, className = "", id }) {
  const root = useRef(null);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer;
    const reset = () => {
      observer?.disconnect();
      root.current?.querySelectorAll(".content-enter").forEach(node => node.classList.remove("content-enter"));
    };
    const start = () => {
      reset();
      if (preference.matches || !("IntersectionObserver" in window)) return;
      observer = new IntersectionObserver(entries => {
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting) return;
          target.classList.add("content-enter");
          observer.unobserve(target);
        });
      }, { threshold: 0.08 });
      root.current.querySelectorAll("h1, h2, h3, .brand-copy, .brand-lead, .brand-artwork, .brand-actions, .brand-video, .contact-intro, .enquiry-form, .workflow-art, .brand-card").forEach(node => {
        // Scroll-controlled sections already have their own motion. A second
        // timed reveal would briefly dim incoming cards and compete with it.
        if (!node.closest(".solution-stack, .scroll-story, .product-parallax, .solutions-push-hero, .contact-mascot-panel")) observer.observe(node);
      });
    };
    start();
    preference.addEventListener("change", start);
    return () => { reset(); preference.removeEventListener("change", start); };
  }, []);
  return <div ref={root} className={className} id={id}>{children}</div>;
}
