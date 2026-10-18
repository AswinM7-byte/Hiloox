import { pageMetadata } from "@/lib/seo";
import Link from "next/link";

import { LegalSection, LegalList } from "@/components/LegalSection";

export const metadata = pageMetadata("/privacy-policy", "Privacy Policy | Hiloox Private Limited", "Learn how Hiloox handles information, privacy, retention, and your data rights.");

export default function PrivacyPolicy() {
  return (
    <div className="container-page pt-32 pb-24 md:pt-40 md:pb-32">
      <Link href="/" className="text-xs font-semibold text-primary hover:underline">
        ← Return to Hiloox Home
      </Link>
      <p className="mt-8 text-xs font-semibold uppercase tracking-widest text-primary">Legal Documentation</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Privacy Policy</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
        By accessing or using Hiloox&apos;s services, you agree to the practices described in this Privacy Policy.
        This policy does not apply to third-party websites or services integrated with Hiloox.
      </p>

      <div className="mt-4 max-w-2xl">
        <LegalSection title="Services Covered">
          <LegalList
            items={[
              "AI Voice Calling Services",
              "WhatsApp Business Automation",
              "Virtual Number Services",
              "APIs and Integrations",
              "Mobile and Desktop Applications",
              "Customer Support Services",
            ]}
          />
        </LegalSection>

        <LegalSection title="Information We Collect">
          <p>Account Information: business address, authorized representative details, billing information, login credentials, authentication data, user roles and permissions.</p>
          <p>Communications Data: AI-generated transcripts, contact information uploaded by customers, WhatsApp message content, message delivery status, virtual number usage logs.</p>
          <p>Technical Data: device information, operating system.</p>
        </LegalSection>

        <LegalSection title="How We Use Information">
          <LegalList
            items={[
              "Provide communication services",
              "Route and connect voice calls",
              "Process WhatsApp Business messages",
              "Generate AI responses",
              "Produce call summaries",
              "Detect fraud and abuse",
              "Comply with legal obligations",
              "Provide customer support",
              "Process billing and payments",
              "Monitor platform performance",
            ]}
          />
        </LegalSection>

        <LegalSection title="AI Processing">
          <p>
            Our AI systems answer customer calls, generate responses, convert speech to text, summarize
            conversations, extract structured information, and automate workflows. Call recording and
            transcription are optional features that may be enabled by customers.
          </p>
        </LegalSection>

        <LegalSection title="Customer Responsibilities">
          <p>Customers using Hiloox are responsible for:</p>
          <LegalList
            items={[
              "Providing legally required notices",
              "Obtaining consent where required",
              "Complying with applicable recording laws",
            ]}
          />
          <p>
            Hiloox acts as a technology service provider and does not determine the purpose or legality of
            customer communications.
          </p>
        </LegalSection>

        <LegalSection title="Telecom & Messaging Compliance">
          <LegalList
            items={[
              "Telecom regulations applicable to their business",
              "Customer consent requirements",
              "Anti-spam requirements",
              "Applicable licensing requirements",
              "Caller identification requirements",
              "WhatsApp Business Platform policies",
              "Meta Business policies",
              "Customer opt-in requirements",
              "Message template approval requirements",
            ]}
          />
          <p>
            Hiloox reserves the right to suspend or terminate services used in violation of applicable telecom
            regulations. Hiloox is not responsible for account restrictions imposed by Meta due to customer
            violations.
          </p>
        </LegalSection>

        <LegalSection title="Who We Share Information With">
          <LegalList
            items={[
              "Telecom providers",
              "Cloud infrastructure providers",
              "AI service providers",
              "Payment processors",
              "Government authorities where legally required",
              "Law enforcement agencies upon valid legal request",
            ]}
          />
          <p>We do not sell personal information.</p>
        </LegalSection>

        <LegalSection title="Security">
          <LegalList
            items={[
              "Encryption in transit",
              "Encryption at rest where applicable",
              "Authentication mechanisms",
              "Activity logging",
              "Infrastructure monitoring",
              "Backup procedures",
            ]}
          />
          <p>No method of electronic storage or transmission is completely secure.</p>
        </LegalSection>

        <LegalSection title="Data Retention & Your Rights">
          <p>We retain data as needed to provide services, meet contractual obligations, resolve disputes, maintain security, and comply with legal and regulatory requirements. Customers may request deletion where legally permissible.</p>
          <LegalList
            items={[
              "Access to information",
              "Correction of inaccurate data",
              "Deletion of eligible data",
              "Export of available data",
              "Restriction of processing where applicable",
            ]}
          />
        </LegalSection>

        <LegalSection title="Cookies">
          <p>Hiloox may use cookies and similar technologies for authentication, security, analytics, and platform functionality.</p>
        </LegalSection>

        <LegalSection title="Children">
          <p>Hiloox services are intended exclusively for businesses and are not directed toward individuals under the age of 18.</p>
        </LegalSection>

        <LegalSection title="Contact">
          <p>
            Questions about this policy can be sent to{" "}
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
