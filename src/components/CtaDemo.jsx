import Reveal from "@/components/Reveal";
import Parallax from "@/components/Parallax";
import { DecorLayer, DecorCluster } from "@/components/Decor";
import DemoForm from "@/components/DemoForm";

export default function CtaDemo() {
  return (
    <section id="request-demo" className="section-curve section-curve--curve relative overflow-hidden bg-[#0b0b14] pb-24 pt-28 md:pb-32 md:pt-40">

      {/* Ambient light drifts slower than the form, adding depth behind it */}
      <Parallax speed={-70} className="pointer-events-none absolute -inset-y-28 inset-x-0" smooth={false}>
        <div className="aurora-beam opacity-50" aria-hidden />
      </Parallax>
      {/* Two composed clusters rather than scattered single shapes */}
      <DecorLayer>
        <DecorCluster variant="a" size={320} speed={30} className="-left-24 top-8 text-white/[0.12]" />
        <DecorCluster variant="c" size={250} speed={-22} className="-right-20 bottom-10 text-secondary/30" />
      </DecorLayer>

      <div className="container-page relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-secondary">Deploy Your AI Agents Today</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Ready to Build Your AI Workforce?
          </h2>
          <p className="mt-4 text-base text-white/50">
            Experience a live, tailored call or WhatsApp demo for your business.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-12 max-w-2xl rounded-3xl border border-white/10 bg-white p-8 shadow-2xl md:p-10">
          <DemoForm />
        </Reveal>
      </div>
    </section>
  );
}

