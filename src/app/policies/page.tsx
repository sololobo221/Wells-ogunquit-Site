import type { Metadata } from "next";
import { site } from "@/lib/site";
import Reveal from "@/components/Reveal";
import BookNow from "@/components/BookNow";

export const metadata: Metadata = {
  title: "Policies",
  description:
    "Cancellation, occupancy, accessibility and property policies for the Wells-Ogunquit Resort Motel & Cottages.",
};

const policies = [
  {
    t: "Cancellation & changes",
    d: "Free cancellation and date changes up to 48 hours before arrival. No fee for cancelling or moving your dates with at least two days' notice.",
  },
  {
    t: "Rates & occupancy",
    d: "Base rates cover the stated occupancy for each room type; additional guests and extra beds may change the rate. Live rates for your dates are always shown on our booking page.",
  },
  {
    t: "Smoking",
    d: "All rooms are non-smoking. There's a gazebo outside set aside for smoking.",
  },
  { t: "Pets", d: "Sorry, we can't take pets." },
  {
    t: "Accessibility",
    d: "We're all on one floor, but a few buildings have three to six steps up to the porch. We don't have ADA-designated rooms. Tell us about any accessibility needs when you book and we'll put you in a step-free room if one is free.",
  },
  {
    t: "Breakfast",
    d: "A fresh continental breakfast is served daily from 7:00 to 9:30 AM in the breakfast room, free to all motel studio and suite guests.",
  },
  {
    t: "Pool",
    d: "The heated saltwater pool is solar-heated late in the season, and the pool area stays open for sunbathing until the motel closes for the year.",
  },
  {
    t: "Season",
    d: "We're open spring through late October, including the Maine fall foliage season. The exact opening and closing dates move a little each year, so call to check if you're coming early or late in the season.",
  },
];

export default function PoliciesPage() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-6 pb-20 pt-28 lg:px-10 lg:pt-40">
        <Reveal>
          <span className="eyebrow">Good to know</span>
          <h1 className="mt-5 text-h1">Policies</h1>
          <p className="mt-5 text-body text-muted">
            The practical details, in plain terms. If anything here affects your plans, call us on{" "}
            <a
              href={site.phones.tollFreeHref}
              className="tabular-nums text-navy underline decoration-navy/40 underline-offset-4 transition-colors hover:decoration-navy"
            >
              {site.phones.tollFree}
            </a>{" "}
            before you book.
          </p>
        </Reveal>

        <dl className="mt-14">
          {policies.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.05}>
              <div className="border-b border-line py-6">
                <dt className="font-display text-h4 leading-tight">{p.t}</dt>
                <dd className="mt-2.5 text-small text-muted">{p.d}</dd>
              </div>
            </Reveal>
          ))}
        </dl>

        <Reveal delay={0.1} className="mt-12">
          <BookNow size="lg" />
        </Reveal>
      </section>
    </>
  );
}
