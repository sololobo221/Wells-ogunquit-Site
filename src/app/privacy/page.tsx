import type { Metadata } from "next";
import { site } from "@/lib/site";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How the Wells-Ogunquit Resort Motel & Cottages website handles the information you send us.",
};

const sections = [
  {
    t: "What we collect",
    d: "Only what you send us. If you use the contact form, it opens a message in your own email application containing the name, email address, dates and message you typed. Nothing is stored on this website.",
  },
  {
    t: "Reservations",
    d: "Bookings are handled by Cloudbeds, our reservation provider, on their own secure pages. Any payment or guest details you enter there are governed by Cloudbeds' own privacy terms, not this site's.",
  },
  {
    t: "Maps and the virtual tour",
    d: "Some pages embed a Google map and a third-party virtual tour. Loading those embeds may let those providers see your IP address and set their own cookies.",
  },
  {
    t: "How we use your details",
    d: "To answer your enquiry and manage your stay. We don't sell your information, and we don't send marketing email unless you've asked us to.",
  },
  {
    t: "Getting in touch",
    d: `To ask what we hold, or to have it removed, write to ${site.email} or call ${site.phones.tollFree}.`,
  },
];

export default function PrivacyPage() {
  return (
    <section className="container-site max-w-[1100px] pb-[var(--section-y)] pt-32 lg:pt-44">
      <Reveal>
        <span className="kicker">Privacy</span>
        <h1 className="text-h1">How we handle your information</h1>
        <p className="measure mt-7 text-lead text-muted">
          A short, plain summary of what this website does with what you send it.
        </p>
      </Reveal>

      <dl className="mt-16 border-t border-ink/15">
        {sections.map((s, i) => (
          <Reveal
            key={s.t}
            delay={i * 0.06}
            className="grid gap-3 border-b border-ink/15 py-8 sm:grid-cols-12 sm:gap-8"
          >
            <dt className="font-display text-h4 sm:col-span-4">{s.t}</dt>
            <dd className="max-w-[60ch] text-body text-muted sm:col-span-8">{s.d}</dd>
          </Reveal>
        ))}
      </dl>

      <Reveal delay={0.1} className="mt-10">
        <p className="text-micro text-muted">
          {site.name}, {site.address.full}.
        </p>
      </Reveal>
    </section>
  );
}
