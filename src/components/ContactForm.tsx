"use client";

import { useState } from "react";
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
    "w-full rounded-[2px] border border-line bg-canvas px-4 py-3.5 text-base text-ink outline-none transition-[border-color,background-color] duration-300 placeholder:text-faint hover:border-ink/30 focus:border-ink focus:bg-surface aria-[invalid=true]:border-accent sm:text-small";
  const lbl = "caps mb-2 block text-[0.6875rem] text-faint";
  const err = "mt-2 text-micro text-accent";

  if (sent) {
    return (
      <div className="border border-line bg-surface">
        <div className="p-8 sm:p-10">
          <h3 className="font-display text-h3">Your email is ready to send</h3>
          <p className="mt-3 text-small text-muted">
            We&apos;ve opened a pre-filled message in your email app. If nothing happened, write to
            us directly at{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-ink underline decoration-ink/40 underline-offset-4"
            >
              {site.email}
            </a>{" "}
            or call {site.phones.tollFree}.
          </p>
          <button
            type="button"
            onClick={() => setSent(false)}
            className="caps mt-6 border-b border-ink/30 pb-1.5 text-ink transition-colors duration-200 hover:border-ink"
          >
            Write another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="border border-line bg-surface">
      <div className="p-6 sm:p-10">
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
          className="caps mt-8 inline-flex h-12 items-center rounded-[2px] bg-ink px-8 text-canvas transition-colors duration-300 hover:bg-accent active:translate-y-px"
        >
          Send message
        </button>

        <p className="mt-5 text-micro text-faint">
          This opens a message in your own email app. If you need an answer today, calling is
          quicker.
        </p>
      </div>
    </form>
  );
}
