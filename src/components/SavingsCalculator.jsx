"use client";

import { useMemo, useState } from "react";
import Reveal from "@/components/Reveal";
import AnimatedNumber from "@/components/AnimatedNumber";
import { DecorLayer, DecorCluster } from "@/components/Decor";

export default function SavingsCalculator() {
  const [calls, setCalls] = useState(2000);
  const [agents, setAgents] = useState(6);

  const savings = useMemo(() => {
    const agentCost = agents * 32000; // monthly cost per human agent, INR
    const hilooxCost = Math.max(9000, calls * 6 + agents * 2500);
    const saved = Math.max(agentCost - hilooxCost, 0);
    return { agentCost, hilooxCost, saved };
  }, [calls, agents]);

  return (
    <section className="relative overflow-hidden border-t border-border bg-background py-24 md:py-32">
      {/* Two composed clusters rather than scattered single shapes */}
      <DecorLayer>
        <DecorCluster variant="b" size={300} speed={30} className="-left-16 top-14 text-primary/[0.14]" />
        <DecorCluster variant="c" size={240} speed={-22} className="-right-14 bottom-10 text-secondary/[0.20]" />
      </DecorLayer>

      <div className="container-page relative">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Interactive Calculator</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Estimate Your Monthly Savings
          </h2>
          <p className="mt-4 text-base text-muted">
            Estimate how much you save monthly by switching to Hiloox AI Agents.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-14 grid grid-cols-1 gap-10 rounded-3xl border border-border bg-surface p-8 md:grid-cols-2 md:p-12">
          <div className="space-y-9">
            <div>
              <div className="flex items-center justify-between text-sm">
                <label htmlFor="calls" className="font-medium text-ink">Calls / conversations per month</label>
                <span className="font-semibold text-primary">{calls.toLocaleString()}</span>
              </div>
              <input
                id="calls"
                type="range"
                min={200}
                max={20000}
                step={100}
                value={calls}
                onChange={(e) => setCalls(Number(e.target.value))}
                className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-border accent-primary"
              />
            </div>
            <div>
              <div className="flex items-center justify-between text-sm">
                <label htmlFor="agents" className="font-medium text-ink">Equivalent human agents today</label>
                <span className="font-semibold text-primary">{agents}</span>
              </div>
              <input
                id="agents"
                type="range"
                min={1}
                max={40}
                step={1}
                value={agents}
                onChange={(e) => setAgents(Number(e.target.value))}
                className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-border accent-primary"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-[#0b0b14] p-8 text-white">
            <p className="text-xs font-medium uppercase tracking-widest text-white/50">Estimated Monthly Savings</p>
            <p className="mt-3 text-4xl font-semibold tracking-tight text-secondary sm:text-5xl">
              <AnimatedNumber value={savings.saved} prefix="₹" />
            </p>
            <div className="mt-6 space-y-2 text-sm text-white/60">
              <div className="flex justify-between">
                <span>Traditional team cost</span>
                <span className="text-white/90">
                  <AnimatedNumber value={savings.agentCost} prefix="₹" />
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Hiloox cost</span>
                <span className="text-white/90">
                  <AnimatedNumber value={savings.hilooxCost} prefix="₹" />
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
