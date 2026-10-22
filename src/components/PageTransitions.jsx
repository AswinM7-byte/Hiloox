"use client";

import useViewportReveal from "@/lib/useViewportReveal";

export default function PageTransitions({ children, className = "", id }) {
  const root = useViewportReveal(
    "h1, h2, h3, .brand-copy, .brand-lead, .brand-artwork, .brand-actions, .brand-video, .workflow-art, .brand-card",
    { exclude: ".solution-stack, .scroll-story, .product-parallax, .solutions-push-hero, .contact-split" },
  );
  return <div ref={root} className={className} id={id}>{children}</div>;
}
