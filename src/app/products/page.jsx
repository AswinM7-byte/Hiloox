import ProductParallax from "@/components/ProductParallax";
import ScrollStory from "@/components/ScrollStory";
import { pageMetadata } from "@/lib/seo";
import BrandArtwork from "@/components/BrandArtwork";
import { PageHero, ActionLink, ClosingCta } from "@/components/BrandUi";
import YonaDemo from "@/components/YonaDemo";
import AgentShowcase from "@/components/AgentShowcase";
import PlatformFeatures from "@/components/PlatformFeatures";
import Integrations from "@/components/Integrations";
import LiveDashboard from "@/components/LiveDashboard";
import SavingsCalculator from "@/components/SavingsCalculator";
import ComparisonTable from "@/components/ComparisonTable";
import Testimonials from "@/components/Testimonials";
import CtaDemo from "@/components/CtaDemo";

export const metadata = pageMetadata("/products", "YONA — Hiloox Products", "Explore YONA, an AI-powered voice agent for business conversations. Try an interactive scripted demonstration.");

export default function Products() {
  return <div className="brand-page refined-page">
    <PageHero eyebrow="Hiloox / Introducing YONA" title={<>Conversations That Move <span>Business Forward.</span></>} description="YONA is an AI-powered voice agent designed to support business conversations and automate communication workflows. Discover the voice experience at the heart of Hiloox." visual={<ProductParallax><BrandArtwork kind="product" priority /></ProductParallax>}><ActionLink href="#demo">Experience YONA</ActionLink><ActionLink href="/contact" secondary>Discuss your use case</ActionLink></PageHero>
    <section className="brand-section container-page"><div className="brand-editorial"><div><p className="company-eyebrow">What is YONA?</p><h2>Voice intelligence.<br /><span>With a business purpose.</span></h2></div><ScrollStory>From common customer questions to appointment enquiries and initial lead conversations, YONA brings a conversational approach to business communication. The capabilities below reflect the existing Hiloox showcase; availability and integration scope are confirmed with your team.</ScrollStory></div></section>
    <AgentShowcase />
    <section className="brand-section container-page"><p className="company-eyebrow">How it works</p><h2>From your knowledge.<br /><span>To a useful conversation.</span></h2><div className="brand-three-grid">{[["01", "Define the conversation", "Choose the customer questions, lead information, or appointment needs you want to support."], ["02", "Shape the workflow", "Agree on business information, conversation boundaries, and required integrations."], ["03", "Review and refine", "Evaluate example conversations and confirm the behavior before a live deployment."]].map(([n, title, text]) => <article className="brand-card" key={n}><span className="company-eyebrow">{n}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <YonaDemo />
    <section className="brand-section container-page"><p className="company-eyebrow">Business use cases & benefits</p><div className="brand-editorial"><h2>Make space for<br /><span>more meaningful work.</span></h2><div className="brand-principles"><article><div><h3>Support common enquiries</h3><p>Give recurring customer questions a consistent starting point.</p></div></article><article><div><h3>Structure initial conversations</h3><p>Explore collecting the context your team needs for a useful follow-up.</p></div></article><article><div><h3>Connect the next step</h3><p>Discuss scheduling and workflow integrations around your existing processes.</p></div></article></div></div></section>
    <details className="product-details"><summary className="container-page">Explore the existing Hiloox platform showcase, integrations & savings calculator</summary><PlatformFeatures /><Integrations /><div className="showcase-notice">Illustrative dashboard — figures below are demonstration data, not live account activity.</div><LiveDashboard /><ComparisonTable /><Testimonials /><div className="showcase-notice">Savings calculator uses illustrative assumptions, not a pricing quote or guaranteed result.</div><SavingsCalculator /></details>
    <section className="brand-section container-page faq"><p className="company-eyebrow">A few useful answers</p><h2>Before we start.</h2>{[["Is the demo a real voice call?", "No. The on-page examples are scripted simulations. They do not access your microphone or connect to a voice service."], ["Can YONA connect to our business tools?", "The existing showcase includes webhook integration capabilities. Contact Hiloox to confirm the systems, access requirements, and scope for your use case."], ["How do we explore a live implementation?", "Use the contact page or email hello@hiloox.com to discuss requirements and arrange a demonstration with the team."]].map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</section>
    <CtaDemo /><ClosingCta title="Let’s shape your next conversation." />
  </div>;
}

