import Reveal from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import HoverCard from "@/components/HoverCard";
import { DecorLayer, DecorCluster } from "@/components/Decor";
import { platformFeatures } from "@/lib/content";
import {
  MessageSquare,
  Zap,
  Brain,
  BarChart3,
  Webhook,
  BookOpen,
  History,
  ShieldCheck,
  Users,
} from "lucide-react";

const icons = [MessageSquare, Zap, Brain, BarChart3, Webhook, BookOpen, History, ShieldCheck, Users];

function FeatureCard({ title, desc, index }) {
  const Icon = icons[index % icons.length];
  return (
    <HoverCard
      tone={index % 2 === 0 ? "primary" : "secondary"}
      className="particle-card w-[300px] shrink-0 rounded-2xl border border-border bg-surface p-6 transition-[transform,border-color,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[0_18px_40px_-26px_rgba(90,49,244,0.35)] sm:w-[320px]"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-light text-primary transition-colors duration-300 group-hover/card:bg-white group-hover/card:text-primary-dark">
        <Icon size={20} strokeWidth={1.75} />
      </div>
      <h3 className="mt-5 text-base font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted transition-colors duration-300 group-hover/card:text-ink/70">
        {desc}
      </p>
    </HoverCard>
  );
}

export default function PlatformFeatures() {
  const mid = Math.ceil(platformFeatures.length / 2);
  const rowOne = platformFeatures.slice(0, mid);
  const rowTwo = platformFeatures.slice(mid);

  return (
    <section className="relative overflow-hidden border-t border-border bg-background py-24 md:py-32">
      <DecorLayer>
        <DecorCluster variant="a" size={300} speed={28} className="-left-24 top-10 text-primary/[0.14]" />
        <DecorCluster variant="c" size={240} speed={-20} className="-right-20 bottom-8 text-secondary/[0.20]" />
      </DecorLayer>

      <div className="container-page relative">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Platform</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Enterprise-Grade, Out of the Box
          </h2>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="mt-14 space-y-5">
        <div
          className="relative"
          style={{
            maskImage: "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
          }}
        >
          <Marquee duration="42s">
            {rowOne.map((f, i) => (
              <FeatureCard key={f.title} title={f.title} desc={f.desc} index={i} />
            ))}
          </Marquee>
        </div>

        <div
          className="relative"
          style={{
            maskImage: "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
          }}
        >
          <Marquee duration="38s" reverse>
            {rowTwo.map((f, i) => (
              <FeatureCard key={f.title} title={f.title} desc={f.desc} index={i + mid} />
            ))}
          </Marquee>
        </div>
      </Reveal>
    </section>
  );
}
