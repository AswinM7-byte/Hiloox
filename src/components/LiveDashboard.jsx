import Image from "next/image";
import Reveal from "@/components/Reveal";
import TiltReveal from "@/components/TiltReveal";
import Parallax from "@/components/Parallax";
import { DecorLayer, DecorCluster } from "@/components/Decor";
import CountUp from "@/components/CountUp";
import { Activity, Clock, MessageSquare } from "lucide-react";

const stats = [
  { icon: Activity, label: "All Systems Live", value: 100, suffix: "%" },
  { icon: Clock, label: "Avg Response Time", value: null, display: "< 1s" },
  { icon: MessageSquare, label: "Conversations This Week", value: 12480 },
];

export default function LiveDashboard() {
  return (
    <section className="relative overflow-hidden bg-background py-24 md:py-32">
      {/* Two composed clusters rather than scattered single shapes */}
      <DecorLayer>
        <DecorCluster variant="a" size={300} speed={30} className="-right-20 top-10 text-primary/[0.14]" />
        <DecorCluster variant="c" size={240} speed={-22} className="-left-16 bottom-12 text-secondary/[0.20]" />
      </DecorLayer>

      <div className="container-page relative">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Complete Visibility</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Zero Guesswork, One Command Center
          </h2>
          <p className="mt-4 text-base text-muted">Watch your AI workforce in action with a live command center.</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <Parallax speed={30}>
            <TiltReveal maxTilt={3}>
              <div
                className="relative overflow-hidden rounded-3xl border border-border bg-[#0b0b14] shadow-[0_40px_80px_-40px_rgba(90,49,244,0.35)]"
                style={{ aspectRatio: "1400 / 820" }}
              >
                {/* Inner image drifts against the frame — the screenshot
                    reads as sitting behind the card edge. Oversized and
                    offset so no gap appears at either travel extreme. */}
                <Parallax speed={-20} className="absolute -inset-y-[9%] inset-x-0">
                  <div className="relative h-full w-full">
                    <Image
                      src="/images/dashboard.png"
                      alt="Hiloox AI voice and WhatsApp automation platform dashboard"
                      fill
                      sizes="(min-width: 1240px) 1160px, 92vw"
                      className="object-cover opacity-95"
                    />
                  </div>
                </Parallax>
              </div>
            </TiltReveal>
          </Parallax>

          <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-4 bg-surface px-6 py-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary-light text-secondary-dark">
                  <s.icon size={17} strokeWidth={1.75} />
                </div>
                <div>
                  {s.value !== null ? (
                    <p className="text-lg font-semibold text-ink">
                      <CountUp value={s.value} suffix={s.suffix} />
                    </p>
                  ) : (
                    <p className="text-lg font-semibold text-ink">{s.display}</p>
                  )}
                  <p className="text-xs text-muted">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
