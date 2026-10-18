"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { DecorLayer, DecorCluster } from "@/components/Decor";
import { useMediaQuery } from "@/lib/hooks";
import { useCases } from "@/lib/content";

/**
 * Brand-gradient card with animated film grain and drifting specks. The
 * gradient itself is static; only the noise moves. No hover state, so this
 * deliberately doesn't use HoverCard.
 */
function UseCaseCard({
  tag,
  title,
  desc,
  tone,
}

) {
  return (
    <div className="w-[78vw] shrink-0 sm:w-[340px]">
      <div
        className={`gradient-card particle-card particle-card--vivid grain-animated relative isolate h-full overflow-hidden rounded-2xl border border-white/15 p-7 shadow-[0_18px_40px_-26px_rgba(90,49,244,0.5)] ${
          tone === "secondary" ? "gradient-card--alt" : ""
        }`}
      >
        <span className="text-[11px] font-semibold uppercase tracking-wide text-white/70">{tag}</span>
        <h3 className="mt-3 text-lg font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/75">{desc}</p>
      </div>
    </div>
  );
}

export default function UseCases() {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const [measured, setMeasured] = useState(0);

  // Scroll-jacking is only appropriate on larger screens — on touch/small
  // viewports the row stays a normal swipeable overflow container.
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const enabled = isDesktop && !reduceMotion;

  // Derived, not stored: avoids writing state just to zero it out.
  const travel = enabled ? measured : 0;

  useEffect(() => {
    if (!enabled) return;
    const track = trackRef.current;
    if (!track) return;

    function measure() {
      const el = trackRef.current;
      if (!el) return;
      // Distance the track must slide so its last card ends flush with the
      // right edge of the viewport.
      setMeasured(Math.max(0, el.scrollWidth - window.innerWidth + 48));
    }

    // ResizeObserver fires once on observe, so the initial measurement
    // happens in its callback rather than synchronously in this effect.
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [enabled]);

  // The target element below is always mounted (both branches render it),
  // so this ref is never dangling during hydration.
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // Spring-smooth the mapping so the horizontal travel eases rather than
  // tracking the scroll position frame-for-frame.
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const x = useTransform(smooth, [0, 1], [0, -travel]);
  const progress = useTransform(smooth, [0, 1], ["0%", "100%"]);

  const header = (
    <Reveal className="max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">What Can Your Agent Do?</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">One Agent, Dozens of Jobs</h2>
      <p className="mt-4 text-base text-muted">Trained on your business, working for your customers.</p>
    </Reveal>
  );

  return (
    <section id="use-cases" className="section-curve section-curve--wave relative bg-background">

      {/* This element is the useScroll target and must stay mounted in every
          branch, otherwise the ref dangles during hydration. */}
      <div
        ref={wrapperRef}
        className={enabled ? "relative" : "py-24 md:py-32"}
        style={enabled ? { height: `calc(100vh + ${travel}px)` } : undefined}
      >
        {enabled ? (
          <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-20">
            {/* Sibling of the content, not an ancestor — safe alongside sticky */}
            <DecorLayer>
              <DecorCluster variant="b" size={300} className="-left-24 top-6 text-primary/[0.14]" />
              <DecorCluster variant="a" size={240} className="-right-20 bottom-8 text-secondary/[0.20]" />
            </DecorLayer>

            <div className="container-page relative">{header}</div>

            <div className="mt-12 overflow-hidden">
              <motion.div ref={trackRef} style={{ x }} className="flex w-max gap-5 pl-6 md:pl-10">
                {useCases.map((u, i) => (
                  <UseCaseCard
                    key={u.title}
                    tag={u.tag}
                    title={u.title}
                    desc={u.desc}
                    tone={i % 2 === 0 ? "primary" : "secondary"}
                  />
                ))}
              </motion.div>
            </div>

            <div className="container-page mt-10">
              <div className="h-1 w-40 overflow-hidden rounded-full bg-border">
                <motion.div style={{ width: progress }} className="h-full rounded-full bg-primary" />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="container-page">{header}</div>
            <div className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 md:px-10">
              {useCases.map((u, i) => (
                <div key={u.title} className="snap-start">
                  <UseCaseCard
                    tag={u.tag}
                    title={u.title}
                    desc={u.desc}
                    tone={i % 2 === 0 ? "primary" : "secondary"}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
