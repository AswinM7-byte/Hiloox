import { pageMetadata } from "@/lib/seo";
import Link from "next/link";

import { LegalSection, LegalList } from "@/components/LegalSection";

export const metadata = pageMetadata("/terms", "Terms of Service | Hiloox Private Limited", "Read the terms governing use of Hiloox’s business communication platform.");

export default function Terms() {
  return (
    <div className="container-page pt-32 pb-24 md:pt-40 md:pb-32">
      <Link href="/" className="text-xs font-semibold text-primary hover:underline">
        ← Return to Hiloox Home
      </Link>
      <p className="mt-8 text-xs font-semibold uppercase tracking-widest text-primary">Legal Documentation</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Terms of Service</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
        These Terms govern access to and use of Hiloox&apos;s AI Conversation Automation platform. Hiloox is a
        technology platform and does not provide legal, financial, or professional advice.
      </p>

      <div className="mt-4 max-w-2xl">
        <LegalSection title="Customer Obligations">
          <LegalList
            items={[
              "Provide accurate information.",
              "Maintain account security.",
              "Obtain all legally required customer consents.",
              "Use the services lawfully.",
              "Protect login credentials.",
              "Comply with all applicable laws.",
            ]}
          />
        </LegalSection>

        <LegalSection title="Prohibited Conduct">
          <LegalList items={["Robocalls prohibited by law", "Caller ID spoofing", "Illegal marketing"]} />
          <p>Hiloox reserves the right to suspend services immediately upon detection of regulatory violations.</p>
        </LegalSection>

        <LegalSection title="Telecom & Messaging Compliance">
          <LegalList
            items={[
              "Obtaining all required registrations",
              "Respecting DND preferences",
              "Maintaining consent records",
              "Using approved sender identities where applicable",
              "Following applicable telecom and messaging regulations",
            ]}
          />
          <p>Customers must comply with Meta&apos;s WhatsApp Business Platform policies.</p>
        </LegalSection>

        <LegalSection title="AI-Generated Content">
          <p>
            AI-generated responses are automatically generated and may contain inaccuracies. Hiloox does not
            guarantee the accuracy of AI-generated outputs. Human review is recommended for:
          </p>
          <LegalList
            items={["AI configuration", "Business decisions", "Human review where appropriate", "Regulatory compliance", "Customer interactions"]}
          />
        </LegalSection>

        <LegalSection title="Payments">
          <p>
            Customers agree to pay applicable subscription fees, usage charges, taxes, telecom charges, and other
            applicable fees. Failure to pay may result in suspension or termination.
          </p>
        </LegalSection>

        <LegalSection title="Data Ownership & Confidentiality">
          <p>
            Customers retain ownership of their own data. Both parties agree to protect confidential information
            received during the course of the business relationship.
          </p>
        </LegalSection>

        <LegalSection title="Suspension & Termination">
          <p>Hiloox may suspend or terminate access for regulatory violation or abuse of the platform.</p>
        </LegalSection>

        <LegalSection title="Contact">
          <p>
            Questions about these Terms can be sent to{" "}
            <a href="mailto:hello@hiloox.com" className="font-semibold text-primary hover:underline">
              hello@hiloox.com
            </a>
            .
          </p>
        </LegalSection>
      </div>
    </div>
  );
}
