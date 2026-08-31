import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/site";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import BookNow from "@/components/BookNow";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Specials",
  description:
    "Current offers at the Wells-Ogunquit Resort Motel, and what you always get by booking direct: the best available rate and free changes up to 48 hours out.",
};

const included = [
  ["Best available rate", "No third party in the middle, and no markup on top."],
  ["Free changes", site.cancellation],
  ["Breakfast for everyone", "Fresh coffee and something made that morning, 7 to 10 daily."],
  ["The pool and the grills", "Heated saltwater pool, gas grills and all the dining supplies."],
  ["Wi-Fi throughout", "On the whole property, at no charge."],
  ["We answer the phone", "Call and speak to the family who run the place."],
];

export default function SpecialsPage() {
  return (
    <>
      <PageHero
        image="/images/hero-pool.jpg"
        imageAlt="The heated saltwater pool on a clear afternoon"
        title="Specials and booking direct"
        intro="When there's a discount running, it shows up here first. When there isn't, we say so."
      />

      {/* Current status. No invented offers. */}
      <section className="mx-auto max-w-[1400px] px-6 section lg:px-10">
        <Reveal className="rounded-[var(--radius-card)] bg-surface shadow-card p-8 sm:p-12">
          <h2 className="max-w-[24ch] font-display text-h2">
            No discounts are running at the moment
          </h2>
          <p className="mt-5 max-w-[58ch] text-muted">
            Worth a look before you book. In the meantime, live availability and current rates for
            every room type are on our booking page.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <BookNow size="lg" label="See live availability" />
            <a
              href={site.phones.tollFreeHref}
              className="text-small tabular-nums text-muted underline decoration-line underline-offset-[6px] transition-colors duration-200 hover:text-ink hover:decoration-navy"
            >
              or call {site.phones.tollFree}
            </a>
          </div>
        </Reveal>
      </section>

      {/* Always included */}
      <section className="bg-sand section">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-6 lg:grid-cols-12 lg:gap-x-12 lg:px-10">
          <div className="lg:col-span-5">
            <SectionHeading
              label="Every stay"
              title="What you get without a promo code"
              intro="The things other places charge extra for are simply part of the room here."
            />
          </div>
          <div className="lg:col-span-7">
            <div className="grid gap-x-12 gap-y-7 sm:grid-cols-2">
              {included.map(([t, d], i) => (
                <Reveal key={t} delay={(i % 2) * 0.06}>
                  <h3 className="font-display text-lead leading-tight text-navy">{t}</h3>
                  <p className="mt-2 text-small text-muted">{d}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Groups */}
      <section className="mx-auto max-w-[1400px] px-6 section lg:px-10">
        <Reveal className="flex flex-col justify-between gap-6 rounded-[var(--radius-card)] bg-surface shadow-card p-8 sm:flex-row sm:items-center lg:p-10">
          <div>
            <h2 className="font-display text-h3 leading-tight">Groups, buses and families</h2>
            <p className="mt-2 max-w-[58ch] text-small text-muted">
              Travelling as a group, or booking several rooms at once? Give us a call and we'll
              work it out with you. It's easier than doing it online.
            </p>
          </div>
          <Link
            href="/contact"
            className="group inline-flex shrink-0 items-center gap-1.5 text-small text-navy transition-colors duration-200 hover:text-ink"
          >
            Get in touch
            <ArrowUpRight
              size={15}
              className="transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
            />
          </Link>
        </Reveal>
      </section>

      <CTASection />
    </>
  );
}
