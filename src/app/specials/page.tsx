import type { Metadata } from "next";
import { CalendarCheck, Coffee, Phone, SwimmingPool, Tag, WifiHigh } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/site";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import BookNow from "@/components/BookNow";
import TextLink from "@/components/TextLink";
import FeatureTiles from "@/components/FeatureTiles";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Specials",
  description:
    "Current offers at the Wells-Ogunquit Resort Motel, and what you always get by booking direct: the best available rate and free changes up to 48 hours out.",
};

const included = [
  { icon: Tag, title: "Best available rate", text: "No third party in the middle, and no markup on top." },
  { icon: CalendarCheck, title: "Free changes", text: site.cancellation },
  { icon: Coffee, title: "Breakfast for everyone", text: "Fresh coffee and something made that morning, 7 to 9:30 daily." },
  { icon: SwimmingPool, title: "The pool and the grills", text: "Heated saltwater pool, gas grills and all the dining supplies." },
  { icon: WifiHigh, title: "Wi-Fi throughout", text: "On the whole property, at no charge." },
  { icon: Phone, title: "We answer the phone", text: "Call and speak to the family who run the place." },
];

export default function SpecialsPage() {
  return (
    <>
      <PageHero
        image="/images/hero-room-deck.jpg"
        imageAlt="The deck along the guest rooms on a clear autumn day"
        label="Specials"
        title="Offers and booking direct"
        intro="When there's a discount running, it shows up here first. When there isn't, we say so."
      />

      {/* Current status. No invented offers. */}
      <section className="container-site section">
        <Reveal className="mx-auto max-w-3xl border border-line bg-surface px-8 py-12 text-center sm:px-14 sm:py-16">
          <span className="kicker">Right now</span>
          <h2 className="mx-auto max-w-[20ch] text-h2">No discounts are running at the moment</h2>
          <p className="mx-auto mt-6 max-w-[52ch] text-lead text-muted">
            Worth a look before you book. Live availability and current rates for every room type
            are on our booking page.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <BookNow size="lg" label="See live availability" href={site.bookingUrl} external />
            <a
              href={site.phones.tollFreeHref}
              className="caps flex h-14 items-center border border-ink/70 px-9 tabular-nums text-ink transition-colors duration-300 hover:bg-ink hover:text-canvas"
            >
              Call {site.phones.tollFree}
            </a>
          </div>
        </Reveal>
      </section>

      {/* Always included */}
      <section className="bg-sand section">
        <div className="container-site">
          <SectionHeading
            label="Always included"
            title="What you get without a promo code"
            intro="The things other places charge extra for are simply part of the room here."
          />
          <FeatureTiles items={included} columns={3} className="mt-14" />
        </div>
      </section>

      {/* Groups */}
      <section className="container-site section">
        <Reveal className="grid items-end gap-8 border-y border-ink/15 py-12 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-8">
            <span className="kicker">Groups</span>
            <h2 className="text-h2">Groups, buses and families</h2>
            <p className="mt-5 max-w-[58ch] text-body text-muted">
              Travelling as a group, or booking several rooms at once? Give us a call and we&apos;ll
              work it out with you. It&apos;s easier than doing it online.
            </p>
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <TextLink href="/contact">Get in touch</TextLink>
          </div>
        </Reveal>
      </section>

      <CTASection />
    </>
  );
}
