"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, ShieldCheck, Fingerprint, HeartHandshake } from "lucide-react";

export function CompanyReveal({ children, className = "", delay = 0 }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : delay }}>{children}</motion.div>;
}

const values = [
  [Sparkles, "Innovation", "Explore better ways to make intelligent technology useful."],
  [ShieldCheck, "Reliability", "Build with care, clarity, and dependable experiences in mind."],
  [Fingerprint, "Simplicity", "Make complex technology feel intuitive and approachable."],
  [HeartHandshake, "Customer Focus", "Start with the people and problems behind every business."],
];

export default function CompanySections() {
  return <div className="company-world">
    <section id="about" className="company-section about-section" aria-labelledby="about-title">
      <div className="container-page">
        <CompanyReveal><p className="company-eyebrow">02 / About Hiloox</p><h1 id="about-title" className="about-heading">Building Intelligent Experiences for a <span>Connected World.</span></h1></CompanyReveal>
        <div className="about-editorial">
        <CompanyReveal>
          <div className="connection-art about-image-wrapper">
            <Image
              src="/images/AboutUs.png"
              alt="Hiloox intelligent technology and connected business experiences"
              width={900}
              height={700}
              priority
              className="about-us-image"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </div>
        </CompanyReveal><div className="about-copy"><CompanyReveal>
          <p className="company-eyebrow">Who we are</p><h2>Practical intelligence.<br />Purposeful experiences.</h2><p>Hiloox is focused on practical AI-powered solutions for businesses. We bring intelligent technology closer to everyday work, helping teams rethink how they connect, communicate, and serve their customers.</p></CompanyReveal><div className="purpose-grid"><CompanyReveal delay={0.08}><h3>Our Mission</h3><p>Make intelligent technology useful and accessible for businesses.</p></CompanyReveal><CompanyReveal delay={0.16}><h3>Our Vision</h3><p>Create smarter, more connected business experiences.</p></CompanyReveal></div></div></div>
        <h2 className="sr-only">Our values</h2><div className="values-grid">{values.map(([Icon, title, text], i) => <CompanyReveal key={title} delay={i * 0.06}><article><Icon size={22} aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article></CompanyReveal>)}</div>
      </div>
    </section>
  </div>;
}




