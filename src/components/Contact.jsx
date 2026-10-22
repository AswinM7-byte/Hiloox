"use client";

import { useState } from "react";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import ContactBunny from "@/components/ContactBunny";
import useViewportReveal from "@/lib/useViewportReveal";

const types = ["YONA Demo", "Business Integration", "Custom AI Development", "Partnership", "General Enquiry"];
const fields = [
  { name: "fullName", label: "Full Name", autoComplete: "name" },
  { name: "email", label: "Work Email", type: "email", autoComplete: "email" },
  { name: "company", label: "Company Name", autoComplete: "organization" },
  { name: "enquiry", label: "Enquiry Type", select: true },
  { name: "message", label: "Message", multiline: true },
];

function validate(name, value) {
  if (!value.trim()) return `${fields.find((field) => field.name === name).label} is required.`;
  if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return "Enter a valid email address, such as name@company.com.";
  return "";
}

export default function Contact() {
  const [errors, setErrors] = useState({});
  const [reviewed, setReviewed] = useState(false);
  const root = useViewportReveal("[data-contact-reveal]", { className: "contact-enter" });

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next = Object.fromEntries(fields.map(({ name }) => [name, validate(name, String(data.get(name) || ""))]));
    setErrors(next);
    const first = fields.find(({ name }) => next[name]);
    setReviewed(!first);
    if (first) event.currentTarget.elements.namedItem(first.name).focus();
  }

  return (
    <section ref={root} id="contact" className="contact-split" aria-labelledby="contact-title">
      <div className="contact-split-grid">
        <ContactBunny />
        <div className="contact-form-panel">
          <form className="enquiry-form" onSubmit={handleSubmit} noValidate aria-describedby="contact-note">
            <div className="form-heading">
              <h1 id="contact-title" data-contact-reveal>Your next step starts here.</h1>
              <p data-contact-reveal style={{ "--reveal-delay": "70ms" }}>All fields are required.</p>
            </div>
            <div className="enquiry-fields">
              {fields.map(({ name, label, type, autoComplete, select, multiline }, index) => {
                const props = {
                  id: `contact-${name}`, name, required: true,
                  "aria-invalid": Boolean(errors[name]),
                  "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
                  onChange: () => {
                    setReviewed(false);
                    if (errors[name]) setErrors(previous => ({ ...previous, [name]: "" }));
                  },
                  onBlur: event => setErrors(previous => ({ ...previous, [name]: validate(name, event.target.value) })),
                };
                return (
                  <div key={name} className={multiline ? "field-full" : undefined} data-contact-reveal style={{ "--reveal-delay": `${100 + index * 45}ms` }}>
                    <label htmlFor={props.id}>{label}</label>
                    {select ? (
                      <select {...props} defaultValue="">
                        <option value="" disabled>Select an enquiry type</option>
                        {types.map(value => <option key={value}>{value}</option>)}
                      </select>
                    ) : multiline ? (
                      <textarea {...props} rows={3} maxLength={5000} placeholder="What would you like to explore?" />
                    ) : (
                      <input {...props} type={type || "text"} autoComplete={autoComplete} maxLength={200} />
                    )}
                    {errors[name] && <p id={`contact-${name}-error`} className="field-error">{errors[name]}</p>}
                  </div>
                );
              })}
            </div>
            <p id="contact-note" className="integration-note" data-contact-reveal>
              This form does not send or save your enquiry. Review your details here, then email our team to get in touch.
            </p>
            <button type="submit" className="company-button" data-contact-reveal>Review enquiry<ArrowRight size={18} aria-hidden="true" /></button>
            <p role="status" className="form-status">{reviewed ? "Your details are valid. Nothing has been sent. Please email hello@hiloox.com to contact our team." : ""}</p>
          </form>
          <div className="contact-panel-details" data-contact-reveal>
            <a href="mailto:hello@hiloox.com"><Mail size={16} aria-hidden="true" />hello@hiloox.com</a>
            <p><MapPin size={16} aria-hidden="true" />Joseph Avenue, A20/153, M.S. Road, Krishancoil, Nagercoil, Tamil Nadu 629001, India</p>
          </div>
        </div>
      </div>
    </section>
  );
}
