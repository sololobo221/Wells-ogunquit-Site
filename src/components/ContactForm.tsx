"use client";

import { useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { site } from "@/lib/site";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", dates: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const validate = () => {
    const next: Errors = {};
    if (!values.name.trim()) next.name = "Please tell us your name.";
    if (!values.email.trim()) next.email = "We need an email address to reply.";
    else if (!EMAIL_RE.test(values.email.trim())) next.email = "That email address doesn't look right.";
    if (!values.message.trim()) next.message = "Let us know what you'd like to ask.";
    return next;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const subject = `Enquiry from ${values.name.trim()}`;
    const body = [
      `Name: ${values.name.trim()}`,
      `Email: ${values.email.trim()}`,
      values.dates.trim() ? `Dates: ${values.dates.trim()}` : null,
      "",
      values.message.trim(),
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const field =
    "w-full w-full rounded-[var(--radius-control)] border border-line bg-canvas px-4 py-3 text-small text-ink outline-none transition-colors duration-200 placeholder:text-faint hover:border-ink/25 focus:border-accent";
  const lbl = "mb-2 block text-eyebrow uppercase tracking-[0.16em] text-faint";
  const err = "mt-2 text-micro text-accent";

  if (sent) {
    return (
      <div className="rounded-[var(--radius-card)] bg-surface p-8 shadow-card">
        <h3 className="font-display text-h3">Your email is ready to send</h3>
        <p className="mt-3 text-small text-muted">
          We've opened a pre-filled message in your email app. If nothing happened, write to us
          directly at{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-navy underline decoration-navy/40 underline-offset-4"
          >
            {site.email}
          </a>{" "}
          or call {site.phones.tollFree}.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 text-small text-navy transition-colors duration-200 hover:text-ink"
        >
          Write another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="rounded-[var(--radius-card)] bg-surface p-6 shadow-card sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={lbl}>
            Name
          </label>
          <input
            id="name"
            value={values.name}
            onChange={set("name")}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={field}
            placeholder="Your name"
          />
          {errors.name && (
            <p id="name-error" className={err}>
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className={lbl}>
            Email
          </label>
          <input
            id="email"
            type="email"
            value={values.email}
            onChange={set("email")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={field}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p id="email-error" className={err}>
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="dates" className={lbl}>
          Dates <span className="normal-case tracking-normal text-faint">(optional)</span>
        </label>
        <input
          id="dates"
          value={values.dates}
          onChange={set("dates")}
          className={field}
          placeholder="e.g. 14 to 18 July, 2 adults"
        />
      </div>

      <div className="mt-5">
        <label htmlFor="message" className={lbl}>
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          value={values.message}
          onChange={set("message")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${field} resize-y`}
          placeholder="How can we help?"
        />
        {errors.message && (
          <p id="message-error" className={err}>
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="group mt-8 inline-flex items-center gap-2 rounded-[var(--radius-control)] bg-accent px-6 py-3 text-small font-medium text-white transition-[background-color,transform] duration-200 hover:bg-accent-deep active:translate-y-px"
      >
        Send message
        <ArrowUpRight
          size={14}
          weight="bold"
          className="transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
        />
      </button>

      <p className="mt-4 text-micro text-faint">
        This opens a message in your own email app. If you need an answer today, calling is quicker.
      </p>
    </form>
  );
}
