import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import HoverCard from "@/components/HoverCard";
import Parallax from "@/components/Parallax";
import { DecorLayer, DecorCluster } from "@/components/Decor";
import { testimonials } from "@/lib/content";
import { Quote } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="section-curve section-curve--wave relative overflow-hidden bg-[#0b0b14] pb-24 pt-28 md:pb-32 md:pt-40 text-white">

      {/* Slow-drifting glow gives the flat dark panel a sense of depth */}
      {/* Vertical bleed exceeds the 90px travel so the layer's own edges
          never become a visible hard line inside the section. */}
      <Parallax speed={-90} className="pointer-events-none absolute -inset-y-32 inset-x-0" smooth={false}>
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(45% 40% at 80% 10%, rgba(0,198,174,0.14), transparent 70%)," +
              "radial-gradient(40% 40% at 12% 85%, rgba(90,49,244,0.16), transparent 70%)",
          }}
        />
      </Parallax>
      {/* Two composed clusters rather than scattered single shapes */}
      <DecorLayer>
        <DecorCluster variant="b" size={320} speed={30} className="-left-20 top-10 text-white/[0.12]" />
        <DecorCluster variant="c" size={250} speed={-22} className="-right-16 bottom-16 text-secondary/30" />
      </DecorLayer>

      <div className="container-page relative">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-secondary">Customer Stories</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Trusted by Modern Leaders</h2>
          <p className="mt-4 text-base text-white/50">
            How fast-growing companies scale customer communications with Hiloox.
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <RevealItem key={t.name} className="h-full">
              <HoverCard
                tone="dark"
                className="particle-card particle-card--dark h-full rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-[transform,border-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-white/20"
              >
                <Quote size={20} className="text-secondary transition-colors duration-300 group-hover/card:text-white" />
                <p className="mt-4 text-sm leading-relaxed text-white/80 transition-colors duration-300 group-hover/card:text-white">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 transition-colors duration-300 group-hover/card:border-white/25">
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <span className="text-[11px] font-medium text-secondary transition-colors duration-300 group-hover/card:text-white/85">
                    {t.tag}
                  </span>
                </div>
              </HoverCard>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.15} className="mt-10 text-center text-sm text-white/40">
          More Coming Soon
        </Reveal>
      </div>
    </section>
  );
}
