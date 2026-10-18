import clsx from "clsx";

/**
 * Infinite auto-scrolling row. Duplicates its children `repeat` times and
 * animates the track by exactly "100% + gap" so the loop is seamless,
 * following the pattern from ui-layouts.com/components/marquee. Pure CSS —
 * no client JS needed, works as a server component.
 */
export default function Marquee({
  children,
  className,
  reverse = false,
  pauseOnHover = true,
  repeat = 2,
  duration = "36s",
  gap = "1.25rem",
}) {
  return (
    <div
      className={clsx("group flex w-full overflow-hidden", className)}
      style={{ ["--gap" ]: gap, ["--duration" ]: duration }}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          aria-hidden={i > 0}
          className={clsx(
            "flex shrink-0 items-stretch",
            reverse ? "animate-marquee-x-reverse" : "animate-marquee-x",
            pauseOnHover && "group-hover:[animation-play-state:paused]"
          )}
          style={{ gap, paddingRight: gap }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
