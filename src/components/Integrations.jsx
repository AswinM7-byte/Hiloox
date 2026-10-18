import Reveal from "@/components/Reveal";
import { integrations } from "@/lib/content";

export default function Integrations() {
  return (
    <section className="border-t border-border bg-background py-16 md:py-20">
      <div className="container-page">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">Connects With Your Stack</p>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="mt-8">
        <div
          className="relative overflow-hidden"
          style={{
            maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <div className="flex w-max animate-marquee items-center gap-x-14">
            {[...integrations, ...integrations].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="shrink-0 text-sm font-semibold tracking-tight text-ink/35 transition-colors hover:text-ink/70"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
