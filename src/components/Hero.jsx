"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { ArrowRight, CalendarCheck, Globe2, PhoneCall, ShieldCheck } from "lucide-react";

const benefits = [
  { icon: PhoneCall, title: "24/7 Availability", detail: "Never miss a call" },
  { icon: Globe2, title: "Multi-Language", detail: "100+ languages" },
  { icon: ShieldCheck, title: "Enterprise Grade", detail: "Secure & compliant" },
];

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);

  // The hero scrolls away normally; these just soften its exit. Content
  // drifts up slightly faster than the page and fades, while the video
  // backdrop lags behind it for depth.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentScale = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [1, 0.96]);
  const contentY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["0%", "-14%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], reduceMotion ? [1, 1] : [1, 0]);
  const backdropY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["0%", "18%"]);
  const backdropScale = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [1, 1.1]);

  // The hero stays pinned behind the rest of the page, so stop decoding
  // frames once it's fully covered.
  const videoRef = useRef(null);
  useEffect(() => {
    const section = ref.current;
    const video = videoRef.current;
    if (!section || !video || reduceMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.05 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <section ref={ref} className="hero-liquid relative overflow-hidden bg-[#07060e] pt-16">
      {/* Background video. `luminosity` blending keeps only the video's light
          and shadow, taking its colour from the dark base beneath — so the
          footage reads as part of the brand surface instead of sitting on
          top of it. Poster paints instantly while the file loads. */}
      <motion.div
        style={{ scale: backdropScale, y: backdropY }}
        className="pointer-events-none absolute inset-0"
      >
        <video
          ref={videoRef}
          className="h-full w-full rotate-180 object-cover opacity-[0.55] mix-blend-luminosity"
          src="/videos/bg-video-1080.mp4"
          poster="/videos/bg-video-poster.jpg"
          autoPlay={!reduceMotion}
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden
          tabIndex={-1}
        />
      </motion.div>

      {/* Brand wash — pushes the desaturated footage back toward violet/teal */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60 mix-blend-color"
        style={{
          background:
            "radial-gradient(70% 60% at 25% 20%, #5a31f4, transparent 70%)," +
            "radial-gradient(60% 60% at 85% 75%, #00c6ae, transparent 70%)",
        }}
      />

      {/* Contrast scrim: darkens the whole frame, then a soft pool of extra
          darkness directly behind the copy so the type always clears its
          background regardless of what the footage is doing. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(58% 55% at 50% 48%, rgba(7,6,14,0.88) 0%, rgba(7,6,14,0.55) 55%, transparent 100%)," +
            "linear-gradient(180deg, rgba(7,6,14,0.9) 0%, rgba(7,6,14,0.55) 35%, rgba(7,6,14,0.72) 75%, #07060e 100%)",
        }}
      />

      <div className="hero-liquid__ambient" aria-hidden />

      {/* Fine grid texture, faded out toward the copy */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "58px 58px",
          maskImage: "radial-gradient(70% 60% at 50% 15%, black, transparent)",
          WebkitMaskImage: "radial-gradient(70% 60% at 50% 15%, black, transparent)",
        }}
      />

      <motion.div
        style={{ scale: contentScale, y: contentY, opacity: contentOpacity }}
        className="relative mx-auto flex min-h-[600px] w-full max-w-[1440px] flex-col items-center justify-center px-6 pb-20 pt-16 text-center md:px-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex max-w-3xl flex-col items-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-xs font-semibold tracking-[0.12em] text-white/85 backdrop-blur-sm">
            <span className="text-sm leading-none text-secondary">✦</span> AI AGENT PLATFORM
          </span>

          <h1 className="mt-7 text-[2.8rem] font-semibold leading-[1.08] tracking-[-0.055em] text-white sm:text-6xl lg:text-[4rem]">
            An<span className="text-gradient-animated"> AI Agent</span>
            <br />
            For Every Business Conversation.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
            Hiloox AI agents handle calls, messages, appointments, customer questions, and
            follow-ups 24/7.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#demo"
              className="group inline-flex w-full items-center justify-center gap-4 rounded-xl bg-primary px-7 py-4 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(90,49,244,0.25)] transition-colors hover:bg-primary-dark sm:w-auto"
            >
              Get Started
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="#agents"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-7 py-4 text-sm font-semibold text-white/90 backdrop-blur-sm transition-colors hover:border-white/30 hover:bg-white/[0.12] sm:w-auto"
            >
              <span className="grid h-5 w-5 place-items-center rounded-full bg-white/15 text-secondary">
                <CalendarCheck size={13} />
              </span>
              Book a Demo
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mt-14 grid w-full max-w-2xl grid-cols-1 gap-6 border-t border-white/10 pt-8 sm:grid-cols-3 sm:gap-0"
        >
          {benefits.map(({ icon: Icon, title, detail }) => (
            <div
              key={title}
              className="flex flex-col items-center px-4 sm:border-r sm:border-white/10 sm:last:border-0"
            >
              <span className="mb-3 grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.07] text-secondary">
                <Icon size={18} />
              </span>
              <p className="text-sm font-semibold text-white">{title}</p>
              <p className="mt-1 text-xs text-white/50">{detail}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
