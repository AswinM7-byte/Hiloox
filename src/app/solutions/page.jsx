import "./solutions.css";
import SolutionStack from "@/components/SolutionStack";
import ScrollStory from "@/components/ScrollStory";
import Image from "next/image";
import SolutionsHero from "@/components/SolutionsHero";
import { pageMetadata } from "@/lib/seo";
import { ActionLink, ClosingCta } from "@/components/BrandUi";
import {
  Headphones,
  CalendarDays,
  UserRoundCheck,
  Workflow,
} from "lucide-react";

export const metadata = pageMetadata(
  "/solutions",
  "AI Solutions — Hiloox",
  "Explore AI-assisted customer support, appointment scheduling, lead qualification, and business workflows with Hiloox."
);

const solutions = [
  {
    icon: Headphones,
    title: "AI Customer Support",
    problem: "The same questions. A growing queue.",
    help: "Assist with common enquiries through conversations grounded in your business information, giving customers a clearer starting point.",
    cases: [
      "Common product questions",
      "Service information",
      "Initial enquiry handling",
    ],
    href: "/products",
    cta: "Explore YONA",
  },
  {
    icon: CalendarDays,
    title: "Appointment Scheduling",
    problem: "Too much back-and-forth before a booking.",
    help: "Explore how AI can support appointment enquiries, confirmations, and reminders around your scheduling process. Connected calendar behavior depends on the agreed integration.",
    cases: [
      "Availability enquiries",
      "Booking requirements",
      "Confirmation workflows",
    ],
    href: "/contact",
    cta: "Discuss scheduling",
  },
  {
    icon: UserRoundCheck,
    title: "Lead Qualification",
    problem: "Interest arrives before context does.",
    help: "Support initial conversations and gather relevant requirements so your team can understand what a prospect is looking for.",
    cases: [
      "Initial discovery",
      "Requirements capture",
      "Follow-up preparation",
    ],
    href: "/products#demo",
    cta: "Try the conversation example",
  },
  {
    icon: Workflow,
    title: "Business Workflow Automation",
    problem: "Repetitive communication slows the next step.",
    help: "Identify routine communication and hand-off steps that could benefit from automation, then define the connections your business needs.",
    cases: [
      "Routine enquiries",
      "Information collection",
      "Webhook-based workflows",
    ],
    href: "/contact",
    cta: "Plan your workflow",
  },
];

const solutionImages = [
  {
    src: "/images/solutions/support.png",
    alt: "AI customer support",
    width: 1080,
    height: 725,
  },
  {
    src: "/images/solutions/scheduling.png",
    alt: "Appointment scheduling",
    width: 800,
    height: 600,
  },
  {
    src: "/images/solutions/leads.png",
    alt: "Lead qualification",
    width: 800,
    height: 600,
  },
  {
    src: "/images/solutions/workflow.png",
    alt: "Business workflow automation",
    width: 800,
    height: 600,
  },
];

export default function Solutions() {
  return (
    <div className="brand-page refined-page">
      <SolutionsHero>
        <p className="company-eyebrow">Hiloox / Solution areas</p>

        <h1>
          Intelligent AI Solutions for{" "}
          <ScrollStory
            as="span"
            className="hero-scroll-highlight"
            from="#ffffff"
            to="#cdbbf8"
            offset={["start 35%", "end 12%"]}
          >
            Real Business Needs.
          </ScrollStory>
        </h1>

        <p className="brand-lead">
          Better communication starts with understanding the work. Explore
          how AI-assisted conversations can help your business respond,
          qualify, schedule, and connect.
        </p>
      </SolutionsHero>

      <SolutionStack>
        {solutions.map(
          ({ icon: Icon, title, problem, help, cases, href, cta }, i) => {
            const image = solutionImages[i];

            return (
              <section className="solution-story" key={title}>
                <div className="solution-copy">
                  <p className="company-eyebrow">
                    Solution / 0{i + 1}
                  </p>

                  <h2>{title}</h2>
                  <h3 className="solution-subheading">{problem}</h3>

                  <ScrollStory>{help}</ScrollStory>

                  <ActionLink href={href} secondary>
                    {cta}
                  </ActionLink>
                </div>

                <div className="solution-diagram">
                  <Icon size={36} aria-hidden="true" />

                  <p className="diagram-label">{title}</p>

                  <div className="solution-image-depth">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      sizes="(max-width: 760px) 90vw, 42vw"
                      style={{
                        display: "block",
                        width: "100%",
                        height: "auto",
                        objectFit: "contain",
                      }}
                    />
                  </div>

                  <ul>
                    {cases.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </section>
            );
          }
        )}
      </SolutionStack>

      <section className="brand-section brand-section-tinted">
        <div className="container-page">
          <Image
            className="workflow-art"
            src="/images/yona-workflow.webp"
            width={1600}
            height={607}
            sizes="95vw"
            alt="YONA connects three steps: understand the problem, agree on the scope, evaluate the experience."
          />

          <div className="workflow-copy">
            <p className="company-eyebrow">From challenge to workflow</p>
            <h2>Define. Connect. Refine.</h2>

            <div className="brand-three-grid">
              {[
                [
                  "Understand the problem",
                  "Map the conversation and the repetitive steps around it.",
                ],
                [
                  "Agree on the scope",
                  "Confirm supported capabilities, integrations, and responsibilities.",
                ],
                [
                  "Evaluate the experience",
                  "Review behavior against your needs before moving into live use.",
                ],
              ].map(([title, text]) => (
                <article className="brand-card" key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>

          <p className="company-caption">
            These are solution areas, not separate products. Capabilities and
            delivery scope are confirmed for each project.
          </p>
        </div>
      </section>

      <ClosingCta title="Start with your business challenge." />
    </div>
  );
}