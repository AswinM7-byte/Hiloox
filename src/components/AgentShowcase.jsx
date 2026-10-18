"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  PhoneCall,
  MessageCircle,
  PhoneOutgoing,
  CalendarCheck,
  UserCheck,
  Headphones,
  Webhook,
  Gauge,
  Megaphone,
  ImageIcon,
  BookOpen,
  Workflow,
  ArrowRight,

} from "lucide-react";
import Reveal from "@/components/Reveal";
import TiltReveal from "@/components/TiltReveal";
import Parallax from "@/components/Parallax";
import { DecorLayer, DecorCluster } from "@/components/Decor";
import VoiceWaveform from "@/components/VoiceWaveform";
import ChatThread from "@/components/ChatThread";
import {
  phoneCapabilities,
  whatsappCapabilities,
  callTranscript,
  chatScript,
} from "@/lib/content";

const capabilityIcons = {
  "Outbound Calling": PhoneOutgoing,
  "Appointment Booking": CalendarCheck,
  "Lead Qualification": UserCheck,
  "Customer Support": Headphones,
  "Webhook Integrations": Webhook,
  "Real-time Responses": Gauge,
  "Broadcast Messages": Megaphone,
  "Rich Media Support": ImageIcon,
  "Knowledge Base Answers": BookOpen,
  "Workflow Automation": Workflow,
};

function CapabilityChips({ items, tone }) {
  return (
    <motion.ul
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ staggerChildren: 0.05 }}
      className="mt-7 flex flex-wrap gap-2.5"
    >
      {items.map((c) => {
        const Icon = capabilityIcons[c] ?? Gauge;
        return (
          <motion.li
            key={c}
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={`group inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm transition-colors duration-200 ${
              tone === "primary"
                ? "border-primary/20 bg-primary-light/40 text-ink/80 hover:border-primary/45 hover:bg-primary-light"
                : "border-secondary/25 bg-secondary-light/50 text-ink/80 hover:border-secondary/50 hover:bg-secondary-light"
            }`}
          >
            <Icon
              size={14}
              strokeWidth={1.9}
              className={`shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                tone === "primary" ? "text-primary" : "text-secondary-dark"
              }`}
            />
            {c}
          </motion.li>
        );
      })}
    </motion.ul>
  );
}

function MetricBadge({ value, label }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-white/15 bg-white/90 px-4 py-3 shadow-[0_18px_40px_-20px_rgba(11,11,20,0.5)] backdrop-blur-md"
    >
      <p className="text-lg font-semibold leading-none text-ink">{value}</p>
      <p className="mt-1 text-[11px] font-medium text-muted">{label}</p>
    </motion.div>
  );
}

export default function AgentShowcase() {
  return (
    <section id="agents" className="relative overflow-hidden bg-background pt-10 pb-24 md:pt-14 md:pb-32">
      {/* Two composed clusters rather than scattered single shapes */}
      <DecorLayer>
        {/* Flanks the centred heading, then two lower clusters for the
            image rows further down the section */}
        <DecorCluster variant="b" size={260} speed={26} className="-right-16 -top-10 text-secondary/[0.20]" />
        <DecorCluster variant="a" size={300} speed={30} className="-left-24 top-[26%] text-primary/[0.14]" />
        <DecorCluster variant="c" size={240} speed={-22} className="-right-20 bottom-[18%] text-secondary/[0.20]" />
      </DecorLayer>

      <div className="container-page relative">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary-light/60 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            Meet Your AI Agent
          </span>

          <h2 className="mt-6 text-4xl font-semibold leading-[1.06] tracking-[-0.035em] text-ink sm:text-5xl lg:text-[3.4rem]">
            One Agent. Two Channels.
            <br />
            <span className="text-gradient-animated">Every Conversation.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            AI agent for voice and WhatsApp — handling conversations, capturing every
            interaction, and making sure nothing gets missed.
          </p>

          {/* Proof strip: turns the claim above into something concrete */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {[
              { value: "0.4s", label: "Avg. answer time" },
              { value: "100+", label: "Languages" },
              { value: "24/7", label: "Never off duty" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-semibold tracking-tight text-ink">{stat.value}</p>
                <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Phone Agent */}
        <div className="mt-20 grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-light px-3.5 py-1.5 text-xs font-semibold text-primary">
              <PhoneCall size={13} /> AI Phone Agent
            </span>
            <h3 className="mt-5 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              A voice that answers &amp; calls with natural, real-time conversation.
            </h3>

            <CapabilityChips items={phoneCapabilities} tone="primary" />

            <div className="mt-8 block w-full sm:inline-block sm:w-auto">
              <a
                href="#demo"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary sm:w-auto"
              >
                Get Started with Phone AI
                <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>

          <div className="relative order-1 lg:order-2">
            <Parallax speed={34}>
              <TiltReveal>
                <div
                  className="relative overflow-hidden rounded-3xl border border-border shadow-[0_30px_60px_-30px_rgba(90,49,244,0.35)]"
                  style={{ aspectRatio: "720 / 560" }}
                >
                  <Image
                    src="/images/phone-agent.jpg"
                    alt="AI phone agent voice interface"
                    fill
                    sizes="(min-width: 1024px) 560px, 92vw"
                    className="object-cover"
                  />
                  {/* Legibility scrim behind the live overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  <div className="absolute inset-x-4 bottom-4">
                    <VoiceWaveform transcript={callTranscript} />
                  </div>
                </div>
              </TiltReveal>
            </Parallax>

            {/* Counter-drift: badge lags the image so the two separate in depth */}
            <Parallax speed={-22} className="absolute -left-3 top-6 z-10 md:-left-6">
              <MetricBadge value="0.4s" label="Avg. answer time" />
            </Parallax>
          </div>
        </div>

        {/* WhatsApp Agent */}
        <div className="mt-28 grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <Parallax speed={34}>
              <TiltReveal>
                <div
                  className="relative overflow-hidden rounded-3xl border border-border shadow-[0_30px_60px_-30px_rgba(88,54,200,0.25)]"
                  style={{ aspectRatio: "720 / 560" }}
                >
                  <Image
                    src="/images/whatsapp-agent.jpg"
                    alt="AI WhatsApp business messaging interface"
                    fill
                    sizes="(min-width: 1024px) 560px, 92vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />

                  <div className="absolute inset-x-4 bottom-4">
                    <ChatThread script={chatScript} />
                  </div>
                </div>
              </TiltReveal>
            </Parallax>

            <Parallax speed={-22} className="absolute -right-3 top-6 z-10 md:-right-6">
              <MetricBadge value="24/7" label="Always replying" />
            </Parallax>
          </div>

          <Reveal delay={0.1}>
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary-light px-3.5 py-1.5 text-xs font-semibold text-secondary-dark">
              <MessageCircle size={13} /> AI WhatsApp Agent
            </span>
            <h3 className="mt-5 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              An always-on messaging agent that replies instantly and moves every chat forward.
            </h3>

            <CapabilityChips items={whatsappCapabilities} tone="secondary" />

            <div className="mt-8 block w-full sm:inline-block sm:w-auto">
              <a
                href="#demo"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-secondary-dark sm:w-auto"
              >
                Get Started with WhatsApp AI
                <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

