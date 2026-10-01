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

  const set =
    (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [k]: e.target.value }));
      setErrors((prev) => ({ ...prev, [k]: undefined }));
    };

  const validate = () => {
    const next: Errors = {};
    if (!values.name.trim()) next.name = "Please tell us your name.";
    if (!values.email.trim()) next.email = "We need an email address to reply.";
    else if (!EMAIL_RE.test(values.email.trim()))
      next.email = "That email address doesn't look right.";
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
    "w-full rounded-[var(--radius-control)] border border-line bg-canvas px-4 py-3.5 text-base text-ink outline-none transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-faint hover:border-ink/25 focus:border-ink/40 focus:bg-surface focus:shadow-[0_0_0_4px_rgba(177,56,40,0.12)] aria-[invalid=true]:border-accent sm:text-small";
  const lbl = "mb-2 block text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-faint";
  const err = "mt-2 text-micro text-accent";

  if (sent) {
    return (
      <div className="bezel">
        <div className="bezel-core p-8 sm:p-10">
          <h3 className="font-display text-h3">Your email is ready to send</h3>
          <p className="mt-3 text-small text-muted">
            We&apos;ve opened a pre-filled message in your email app. If nothing happened, write to
            us directly at{" "}
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
            className="mt-6 text-small font-medium text-navy underline decoration-navy/30 underline-offset-[6px] transition-colors duration-200 hover:text-ink hover:decoration-ink"
          >
            Write another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="bezel">
      <div className="bezel-core p-6 sm:p-10">
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
          className="group mt-8 inline-flex h-12 items-center gap-3 rounded-full bg-accent pl-6 pr-1.5 text-small font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_10px_24px_-12px_rgba(177,56,40,0.7)] transition-[background-color,transform] duration-500 ease-[var(--ease-glide)] hover:bg-accent-deep active:scale-[0.98]"
        >
          Send message
          <span
            aria-hidden
            className="grid h-9 w-9 place-items-center rounded-full bg-white/15 transition-transform duration-500 ease-[var(--ease-glide)] group-hover:-translate-y-px group-hover:translate-x-0.5 group-hover:scale-105"
          >
            <ArrowUpRight size={14} weight="bold" />
          </span>
        </button>

        <p className="mt-5 text-micro text-faint">
          This opens a message in your own email app. If you need an answer today, calling is
          quicker.
        </p>
      </div>
    </form>
  );
}
