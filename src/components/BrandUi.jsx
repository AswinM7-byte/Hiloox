import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CompanyReveal } from "@/components/CompanySections";

export function ActionLink({ href, children, secondary = false }) {
  return <Link href={href} className={secondary ? "brand-button brand-button-secondary" : "brand-button"}>{children}<ArrowUpRight size={18} aria-hidden="true" /></Link>;
}

export function PageHero({ eyebrow, title, description, children, visual }) {
  return <section className={`brand-hero ${visual ? "brand-hero-split" : ""}`}><div className="container-page brand-hero-layout"><CompanyReveal><p className="company-eyebrow">{eyebrow}</p><h1>{title}</h1><p className="brand-lead">{description}</p>{children && <div className="brand-actions">{children}</div>}</CompanyReveal>{visual}</div></section>;
}

export function ClosingCta({ eyebrow = "A conversation is a good place to start", title = "Your next chapter. Powered by intelligence." }) {
  return <section className="brand-closing container-page"><CompanyReveal><p className="company-eyebrow">{eyebrow}</p><h2>{title}</h2><div className="brand-actions"><ActionLink href="/contact">Let’s talk</ActionLink><ActionLink href="/products#demo" secondary>Experience YONA</ActionLink></div></CompanyReveal></section>;
}
