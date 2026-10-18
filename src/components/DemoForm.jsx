"use client";

import { useState, } from "react";
import { CheckCircle2 } from "lucide-react";

export default function DemoForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const company = form.get("company");
    const channel = form.get("channel");
    const notes = form.get("notes");
    const email = form.get("email");

    const subject = encodeURIComponent(`Demo Request — ${company ?? name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nCompany: ${company}\nEmail: ${email}\nInterested Channel: ${channel}\nNotes: ${notes}`
    );
    window.location.href = `mailto:hello@hiloox.com?subject=${subject}&body=${body}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-secondary/30 bg-secondary-light/50 px-8 py-16 text-center">
        <CheckCircle2 size={36} className="text-secondary-dark" />
        <p className="mt-4 text-lg font-semibold text-ink">Email draft requested</p>
        <p className="mt-1 text-sm text-muted">Nothing has been sent by this website. If your email app opened, review and send the draft there. Otherwise, email hello@hiloox.com directly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <div className="sm:col-span-1">
        <label htmlFor="name" className="text-xs font-semibold text-ink/70">Full Name</label>
        <input id="name" name="name" required className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-primary" />
      </div>
      <div className="sm:col-span-1">
        <label htmlFor="email" className="text-xs font-semibold text-ink/70">Email</label>
        <input id="email" name="email" type="email" required className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-primary" />
      </div>
      <div className="sm:col-span-1">
        <label htmlFor="company" className="text-xs font-semibold text-ink/70">Company / Organization</label>
        <input id="company" name="company" className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-primary" />
      </div>
      <div className="sm:col-span-1">
        <label htmlFor="channel" className="text-xs font-semibold text-ink/70">Interested Agent Channel</label>
        <select id="channel" name="channel" className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-primary">
          <option>Both Voice &amp; WhatsApp</option>
          <option>AI Phone Agent</option>
          <option>AI WhatsApp Agent</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="notes" className="text-xs font-semibold text-ink/70">Notes / Requirements</label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          placeholder="Describe your use case or special requirements..."
          className="mt-2 w-full resize-none rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-primary"
        />
      </div>
      <div className="sm:col-span-2">
        <div className="block w-full sm:inline-block sm:w-auto">
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary-dark sm:w-auto"
          >
            Schedule Product Demo &amp; Send Email
          </button>
        </div>
      </div>
    </form>
  );
}

