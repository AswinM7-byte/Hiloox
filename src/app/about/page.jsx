import { pageMetadata } from "@/lib/seo";
import CompanySections from "@/components/CompanySections";
import { ActionLink, ClosingCta } from "@/components/BrandUi";
import BrandArtwork from "@/components/BrandArtwork";

export const metadata = pageMetadata("/about", "About Hiloox — Practical AI, Human Purpose", "Meet Hiloox: our mission, vision, values, and approach to useful, accessible AI-powered business experiences.");
export default function About() {
  return <div className="brand-page about-page">
    <CompanySections />
    <section className="brand-section container-page">
      <div className="brand-editorial">
        <div>
          <p className="company-eyebrow">Our approach</p>
          <h2>Thoughtful by design.<br /><span>Useful in practice.</span></h2>
          </div>
          <div className="brand-principles">{[["Listen", "Understand the people, needs, and constraints behind the problem."], ["Simplify", "Shape a focused experience around the work that matters."], ["Build thoughtfully", "Connect technology and user-focused design with clear boundaries."], ["Learn", "Review the experience and refine it around real business needs."]].map(([title, text]) => <article key={title}>
            <div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
            </div>
      </section>
      
      <section className="brand-section brand-section-tinted">
        <div className="container-page brand-editorial about-product-layout">
          <div><p className="company-eyebrow">Meet our product</p><h2>YONA.<br /><span>Intelligence with a voice.</span></h2>
          <p className="brand-copy">Discover the AI-powered voice agent at the heart of Hiloox’s business communication experience.</p>
          <ActionLink href="/products">Explore YONA</ActionLink></div><BrandArtwork kind="welcome" className="about-product-character" /></div>
      </section><ClosingCta /></div>;
}

