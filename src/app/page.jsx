import AnimatedAnnotator from "@/components/AnimatedAnnotator";
import { pageMetadata } from "@/lib/seo";
import BrandArtwork from "@/components/BrandArtwork";
import { DepthSurface } from "@/components/AiOrb";
import { PageHero, ActionLink, ClosingCta } from "@/components/BrandUi";
import { CompanyReveal } from "@/components/CompanySections";
import { Headphones, CalendarDays, Workflow, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export const metadata = pageMetadata("/", "Hiloox — Intelligence That Listens. AI That Acts.", "Meet Hiloox and YONA. Practical AI for business conversations and communication workflows.");

export default function Home() {
  return <div className="brand-page refined-page" id="home">
    <PageHero visual={<AnimatedAnnotator priority />} title={<>Intelligence That Listens.<br /><span>AI That Acts.</span></>} ><ActionLink href="/products">Explore YONA</ActionLink><ActionLink href="/solutions" secondary>Discover Our Solutions</ActionLink></PageHero>
    <section className="brand-section container-page"><div className="brand-editorial"><CompanyReveal><p className="company-eyebrow">Meet YONA</p><h2>A voice for your business.<br /><span>A next step for every conversation.</span></h2><BrandArtwork kind="conversation" /></CompanyReveal><CompanyReveal delay={0.1}><p className="brand-copy">YONA is Hiloox’s AI-powered voice agent, designed to support business conversations and communication workflows. Explore how customer questions, appointment enquiries, and initial lead conversations can become more connected experiences.</p><ActionLink href="/products" secondary>Get to know YONA</ActionLink></CompanyReveal></div></section>
    <section className="brand-section brand-section-tinted"><div className="container-page"><p className="company-eyebrow">Built around real business needs</p><h2>Start with the conversation.<br /><span>Discover the possibilities.</span></h2><div className="brand-three-grid">{[[Headphones, "Customer conversations", "Help people find answers to everyday questions."], [CalendarDays, "Appointment enquiries", "Explore a clearer path from interest to a booking."], [Workflow, "Connected workflows", "Identify repetitive steps that AI could help simplify."]].map(([Icon, title, text], i) => <CompanyReveal key={title} delay={i * 0.08}><DepthSurface className="brand-card home-gradient-card"><Icon aria-hidden="true" /><h3>{title}</h3><p>{text}</p><Link href="/solutions" className="company-link">Explore solutions <ArrowUpRight size={17} aria-hidden="true" /></Link></DepthSurface></CompanyReveal>)}</div></div></section>
    <section className="brand-section container-page"><div className="brand-editorial"><div><p className="company-eyebrow">Why Hiloox</p><h2>Thoughtful technology.<br /><span>Practical purpose.</span></h2><BrandArtwork kind="ideas" className="home-support-art" /></div><div className="brand-principles">{[["01", "Business needs first", "Start with the people, conversations, and challenges that matter."], ["02", "Clarity at every step", "Define the use case and integration requirements before implementation."], ["03", "Simplicity by design", "Make intelligent experiences easier to understand and use."]].map(([number, title, text]) => <CompanyReveal key={number}><article><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></article></CompanyReveal>)}</div></div></section>
    <section className="brand-section brand-section-tinted"><div className="container-page brand-editorial home-welcome"><div><p className="company-eyebrow">Meet your next team player</p><h2>A warm welcome.<br /><span>Every time.</span></h2><p className="brand-copy">Explore how YONA can support your customer conversations, with a helpful voice and a clear next step.</p><ActionLink href="/products#demo">Experience YONA</ActionLink></div><BrandArtwork kind="welcome" className="home-support-art" /></div></section>
    <ClosingCta />
  </div>;
}

