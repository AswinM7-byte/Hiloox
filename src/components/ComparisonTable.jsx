import Reveal from "@/components/Reveal";
import { DecorLayer, DecorCluster } from "@/components/Decor";
import { comparison } from "@/lib/content";
import { X, Check, Sparkles } from "lucide-react";

export default function ComparisonTable() {
  return (
    <section className="relative border-t border-border bg-background py-24 md:py-32">
      {/* Two composed clusters rather than scattered single shapes */}
      <DecorLayer>
        <DecorCluster variant="c" size={300} speed={30} className="-left-16 top-12 text-primary/[0.14]" />
        <DecorCluster variant="b" size={240} speed={-22} className="-right-14 bottom-10 text-secondary/[0.20]" />
      </DecorLayer>

      <div className="container-page relative">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">The Smarter Way</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">How Hiloox Compares</h2>
          <p className="mt-4 text-base text-muted">See how Hiloox AI agents compare with traditional options.</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-14 overflow-hidden rounded-2xl border border-border">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="bg-[#0b0b14] text-white">
                  <th className="px-6 py-5 text-sm font-semibold">Feature / Metric</th>
                  <th className="px-6 py-5 text-sm font-medium text-white/45">Traditional Call Center</th>
                  {/* Featured column header — brand fill makes the Hiloox
                      column read as the recommended answer at a glance */}
                  <th className="relative bg-secondary px-6 py-5 text-[#04231f]">
                    <span className="flex items-center gap-2 text-sm font-bold">
                      <Sparkles size={15} strokeWidth={2.25} />
                      Hiloox AI Agents
                    </span>
                    <span className="mt-1 inline-block text-[11px] font-semibold uppercase tracking-wide text-[#04231f]/65">
                      Recommended
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={row.metric} className={i % 2 === 0 ? "bg-surface" : "bg-[#faf9ff]"}>
                    <td className="px-6 py-4 text-sm font-medium text-ink">{row.metric}</td>

                    <td className="px-6 py-4 text-sm text-muted">
                      <span className="inline-flex items-center gap-2">
                        <X size={14} className="shrink-0 text-rose-300" />
                        <span className="opacity-80">{row.traditional}</span>
                      </span>
                    </td>

                    {/* Featured column body — tinted band with its own side
                        borders so it reads as one continuous highlighted column */}
                    <td className="border-x border-secondary/25 bg-secondary-light/45 px-6 py-4 text-sm font-semibold text-ink">
                      <span className="inline-flex items-center gap-2.5">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary-dark text-white">
                          <Check size={12} strokeWidth={3} />
                        </span>
                        {row.hiloox}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
