"use client";

import clsx from "clsx";

import Parallax from "@/components/Parallax";

/**
 * Decorative geometry primitives.
 *
 * All shapes inherit their colour from `currentColor`, so placement classes
 * set both position and tint (e.g. "left-8 top-20 text-primary/10"). Motion
 * comes in two independent layers:
 *   - `speed`   → scroll-linked parallax drift (wrapper transform)
 *   - `animate` → an ambient CSS loop on the shape itself
 * They're applied to different elements, so they never fight over transform.
 *
 * These are purely presentational — always inside an aria-hidden layer, never
 * carrying meaning that isn't already in the copy.
 */

const ANIM_CLASS = {
  none: "",
  float: "decor-float",
  drift: "decor-float-diag",
  spin: "decor-spin",
  spinReverse: "decor-spin-reverse",
  pulse: "decor-pulse",
};

/** Clipping, non-interactive layer that decor shapes live inside. */
export function DecorLayer({ children, className }) {
  return (
    <div aria-hidden className={clsx("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {children}
    </div>
  );
}

/** Scroll-linked positioning wrapper. */
function Drift({
  speed = 0,
  className,
  children,
}

) {
  if (!speed) return <div className={clsx("absolute", className)}>{children}</div>;
  return (
    <Parallax speed={speed} className={clsx("absolute", className)}>
      {children}
    </Parallax>
  );
}

/** Builds the ambient-animation class + CSS vars for a shape. */
function anim(animate = "none", duration = 12, delay = 0, extra) {
  return {
    className: ANIM_CLASS[animate],
    style: {
      ["--decor-duration" ]: `${duration}s`,
      ["--decor-delay" ]: `${delay}s`,
      ...extra,
    } ,
  };
}

/** Hairline circle outline. */
export function Ring({ className, speed = 0, size = 140, animate = "none", duration, delay }) {
  const a = anim(animate, duration, delay);
  return (
    <Drift speed={speed} className={className}>
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={a.className} style={a.style}>
        <circle cx="50" cy="50" r="49" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
    </Drift>
  );
}

/** Filled disc — use at low opacity for soft accents. */
export function Circle({ className, speed = 0, size = 40, animate = "none", duration, delay }) {
  const a = anim(animate, duration, delay);
  return (
    <Drift speed={speed} className={className}>
      <span
        className={clsx("block rounded-full bg-current", a.className)}
        style={{ width: size, height: size, ...a.style }}
      />
    </Drift>
  );
}

/** Concentric rings — a target/radar motif. */
export function Concentric({ className, speed = 0, size = 160, animate = "none", duration, delay }) {
  const a = anim(animate, duration, delay);
  return (
    <Drift speed={speed} className={className}>
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={a.className} style={a.style}>
        {[49, 36, 23, 10].map((r, i) => (
          <circle
            key={r}
            cx="50"
            cy="50"
            r={r}
            stroke="currentColor"
            strokeWidth="1"
            opacity={1 - i * 0.18}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
    </Drift>
  );
}

/** Open arc — a fragment of a circle, good for framing corners. */
export function Arc({ className, speed = 0, size = 180, animate = "none", duration, delay }) {
  const a = anim(animate, duration, delay);
  return (
    <Drift speed={speed} className={className}>
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={a.className} style={a.style}>
        <path
          d="M2 50a48 48 0 0 1 48-48"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M14 62a48 48 0 0 1 48-48"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.6"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </Drift>
  );
}

/** Triangle outline, or filled when `filled` is set. */
export function Triangle({
  className,
  speed = 0,
  size = 90,
  animate = "none",
  duration,
  delay,
  filled = false,
}) {
  const a = anim(animate, duration, delay);
  return (
    <Drift speed={speed} className={className}>
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={a.className} style={a.style}>
        <path
          d="M50 6 96 92H4Z"
          fill={filled ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </Drift>
  );
}

/** Rounded square outline — usually rotated via a class for interest. */
export function Square({ className, speed = 0, size = 96, animate = "none", duration, delay }) {
  const a = anim(animate, duration, delay);
  return (
    <Drift speed={speed} className={className}>
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={a.className} style={a.style}>
        <rect
          x="3"
          y="3"
          width="94"
          height="94"
          rx="14"
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </Drift>
  );
}

/** Small solid dot, for punctuation near headings. */
export function Dot({ className, speed = 0, size = 10, animate = "none", duration, delay }) {
  const a = anim(animate, duration, delay);
  return (
    <Drift speed={speed} className={className}>
      <span
        className={clsx("block rounded-full bg-current", a.className)}
        style={{ width: size, height: size, ...a.style }}
      />
    </Drift>
  );
}

/**
 * A discrete grid of dots — an explicit rows x cols matrix:
 *
 *   . . . .
 *   . . . .
 *
 * Unlike DotGrid (a repeating CSS gradient sized by its container), this
 * renders a countable, evenly spaced set of dots and sizes itself to fit
 * them exactly, so the pattern always ends on a whole dot rather than being
 * clipped mid-row by the box.
 */
export function DotMatrix({
  rows = 4,
  cols = 4,
  gap = 14,
  dot = 3,
  className,
  speed = 0,
  animate = "none",
  duration,
  delay,
}) {
  const a = anim(animate, duration, delay);
  const w = (cols - 1) * gap + dot;
  const h = (rows - 1) * gap + dot;

  return (
    <Drift speed={speed} className={className}>
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" className={a.className} style={a.style}>
        {Array.from({ length: rows }).flatMap((_, r) =>
          Array.from({ length: cols }).map((__, c) => (
            <circle
              key={`${r}-${c}`}
              cx={c * gap + dot / 2}
              cy={r * gap + dot / 2}
              r={dot / 2}
              fill="currentColor"
            />
          ))
        )}
      </svg>
    </Drift>
  );
}

/** Repeating dot field. Size the patch with width/height classes. */
export function DotGrid({
  className,
  speed = 0,
  gap = 16,
  fade = true,
  animate = "none",
  duration,
  delay,
}) {
  const a = anim(animate, duration, delay);
  return (
    <Drift speed={speed} className={className}>
      <div
        className={clsx("h-full w-full", a.className)}
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: `${gap}px ${gap}px`,
          ...(fade
            ? {
                maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
                WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
              }
            : {}),
          ...a.style,
        }}
      />
    </Drift>
  );
}

/** Soft filled blob — the only non-outlined primitive, kept very low opacity. */
export function SoftShape({ className, speed = 0, size = 220, animate = "none", duration, delay }) {
  const a = anim(animate, duration, delay);
  return (
    <Drift speed={speed} className={className}>
      {/* Organic radius kept in an inline style — a slash inside a Tailwind
          arbitrary value gets parsed as an opacity modifier. */}
      <div
        className={clsx("bg-current blur-2xl", a.className)}
        style={{
          width: size,
          height: size,
          borderRadius: "42% 58% 63% 37% / 45% 38% 62% 55%",
          ...a.style,
        }}
      />
    </Drift>
  );
}

/** Short hairline rule, for edge detailing. */
export function Line({
  className,
  speed = 0,
  vertical = false,
  length = 120,
  animate = "none",
  duration,
  delay,
}) {
  const a = anim(animate, duration, delay);
  return (
    <Drift speed={speed} className={className}>
      <span
        className={clsx("block bg-current", a.className)}
        style={vertical ? { width: 1, height: length, ...a.style } : { height: 1, width: length, ...a.style }}
      />
    </Drift>
  );
}

/**
 * A composed group of shapes at varied sizes, positioned relative to one
 * another inside a single box.
 *
 * Individual shapes scattered across a section read as accidental; grouping
 * them into a deliberate arrangement reads as design. Everything inherits
 * `currentColor` from the caller and sits at low opacity, so a cluster adds
 * texture at the edge of vision without competing with the content.
 */
export function DecorCluster({
  variant = "a",
  size = 280,
  className,
  speed = 0,
}

) {
  const px = (f) => Math.round(size * f);

  return (
    <Drift speed={speed} className={className}>
      {/* Two members at most, generously spaced, with no crossing strokes.
          Overlapping outlines tangle into visual noise; one large quiet form
          paired with a soft texture reads as composition. */}
      <div className="relative" style={{ width: size, height: size }}>
        {variant === "a" && (
          <>
            {/* Three concentric rings sharing one centre. Offsets are
                (1 - scale) / 2 so each inner ring stays perfectly centred on
                the outer one, and they share a float duration/delay so the
                group drifts as a single object rather than decentring. */}
            <Ring size={px(1)} animate="float" duration={22} className="left-0 top-0 opacity-70" />
            <Ring size={px(0.72)} animate="float" duration={22} className="left-[14%] top-[14%] opacity-55" />
            <Ring size={px(0.46)} animate="float" duration={22} className="left-[27%] top-[27%] opacity-45" />
            <DotMatrix rows={4} cols={4} gap={15} dot={3} animate="float" duration={19} delay={1} className="left-[66%] top-[68%] opacity-70" />
          </>
        )}

        {variant === "b" && (
          <>
            <Concentric size={px(0.92)} animate="spin" duration={120} className="left-[4%] top-[4%] opacity-55" />
            <Triangle
              size={px(0.14)}
              animate="drift"
              duration={18}
              delay={1.5}
              className="left-[2%] top-[80%] rotate-12 opacity-65"
            />
          </>
        )}

        {variant === "c" && (
          <>
            <DotMatrix rows={6} cols={6} gap={17} dot={3.5} animate="drift" duration={21} className="left-[4%] top-[6%] opacity-70" />
            <Square size={px(0.42)} animate="float" duration={24} className="left-[56%] top-[52%] opacity-60" />
          </>
        )}
      </div>
    </Drift>
  );
}
