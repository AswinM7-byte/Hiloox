"use client";

import clsx from "clsx";

// Gradients live in globals.css (.hover-fill--*) — they're soft multi-stop
// radial glows, which are unwieldy as Tailwind arbitrary values.
const FILLS = {
  primary: "hover-fill--primary",
  secondary: "hover-fill--secondary",
  dark: "hover-fill--dark",
};

/**
 * Card whose brand-gradient panel sweeps up from the bottom edge on hover.
 *
 * The sweep is a real element rather than a pseudo-element so it can coexist
 * with other pseudo-element effects, and it
 * sits at -z-10 inside an isolated stacking context — above the card's own
 * background, below its content.
 *
 * Children should use `group-hover/card:` utilities to invert their colours.
 *
 * The group is NAMED (`group/card`) on purpose: these cards sit inside a
 * Marquee row that is itself a `group` (for pause-on-hover). With an unnamed
 * group, hovering anywhere in the row would match every card's `group-hover:`
 * rules and fill them all at once. Naming it scopes the effect to the one
 * card actually under the cursor.
 */
export default function HoverCard({ children, className, tone = "primary" }) {
  return (
    <div className={clsx("group/card relative isolate overflow-hidden", className)}>
      {/* Soft bloom: fades in and drifts up a few pixels over 700ms rather
          than wiping across the card. Slower and gentler than a sweep. */}
      <span
        aria-hidden
        className={clsx(
          "pointer-events-none absolute inset-0 -z-10 translate-y-4 opacity-0",
          "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "group-hover/card:translate-y-0 group-hover/card:opacity-100 motion-reduce:transition-none",
          FILLS[tone]
        )}
      />
      {children}
    </div>
  );
}
