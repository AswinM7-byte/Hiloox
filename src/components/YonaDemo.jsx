"use client";

import { useState } from "react";
import AnimatedAnnotator from "@/components/AnimatedAnnotator";
import { CompanyReveal } from "@/components/CompanySections";
import { RotateCcw, ArrowRight } from "lucide-react";


const scenarios = {
  support: { label: "Customer support", question: "What can you help me with?", replies: ["I can help with common questions about your business. What would you like to know?", "In a configured workflow, answers would use your approved business information. This example is a scripted simulation."] },
  booking: { label: "Appointment enquiry", question: "Can I book an appointment?", replies: ["Of course. What day would work best for you?", "Your preferred time would be checked against a connected scheduling system. No appointment has been booked in this simulation."] },
  lead: { label: "Lead qualification", question: "I’d like to discuss AI for my company.", replies: ["I can help you get started. Which business process are you hoping to improve?", "A configured workflow could collect your requirements for the team. This simulation does not collect or send information."] },
};

export default function YonaDemo() {
  const [scenario, setScenario] = useState("support");
  const [step, setStep] = useState(0);
  const current = scenarios[scenario];
  return (
    <section id="demo" className="brand-section demo-section voice-studio" aria-labelledby="voice-studio-title">
      <div className="container-page">
        <CompanyReveal className="voice-studio-heading">
          <p className="company-eyebrow">Experience YONA / Interactive simulation</p>
          <h2 id="voice-studio-title">A conversation.<br /><span>A world of possibilities.</span></h2>
          <p className="brand-copy demo-disclosure">This is a scripted, text-only demonstration. No microphone, real call, booking, or API request is used.</p>
        </CompanyReveal>
        <div className="voice-studio-layout">
          <CompanyReveal className="voice-studio-visual" delay={0.08}>
            <div className="studio-label"><span aria-hidden="true" /> Conversation preview</div>
            <AnimatedAnnotator />
            <div className="studio-introduction"><p className="company-eyebrow">Listen. Understand. Respond.</p><h3>See where a conversation can go.</h3><p>Choose an example, follow the response, and explore the next step with YONA.</p></div>
          </CompanyReveal>
          <CompanyReveal className="demo-console" delay={0.16}>
            <fieldset><legend>Choose a conversation</legend><div className="demo-options">{Object.entries(scenarios).map(([key, value]) => <button type="button" key={key} aria-pressed={scenario === key} onClick={() => { setScenario(key); setStep(0); }}>{value.label}</button>)}</div></fieldset>
            <div className="studio-transcript-heading"><span>Conversation example</span><span>0{step + 1} / 02</span></div>
            <div className="demo-transcript" aria-live="polite" aria-atomic="true"><p className="demo-bubble customer"><strong>Example customer</strong>{current.question}</p><p className="demo-bubble"><strong>YONA · simulated response</strong>{current.replies[step]}</p></div>
            <div className="demo-controls"><button type="button" className="brand-button" disabled={step === 1} onClick={() => setStep(1)}>Continue example <ArrowRight size={16} aria-hidden="true" /></button><button type="button" className="demo-reset" onClick={() => setStep(0)}><RotateCcw size={16} aria-hidden="true" />Restart</button></div>
          </CompanyReveal>
        </div>
      </div>
    </section>
  );
}
