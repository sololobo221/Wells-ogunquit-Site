import type { Metadata } from "next";
import {
  CalendarCheck,
  Coffee,
  Phone,
  SwimmingPool,
  Tag,
  UsersThree,
  WifiHigh,
} from "@phosphor-icons/react/dist/ssr";
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
  {
    icon: Coffee,
    title: "Breakfast for everyone",
    text: "Fresh coffee and something made that morning, 7 to 9:30 daily.",
  },
  {
    icon: SwimmingPool,
    title: "The pool and the grills",
    text: "Heated saltwater pool, gas grills and all the dining supplies.",
  },
  { icon: WifiHigh, title: "Wi-Fi throughout", text: "On the whole property, at no charge." },
  { icon: Phone, title: "We answer the phone", text: "Call and speak to the family who run the place." },
];

export default function SpecialsPage() {
  return (
    <>
      <PageHero
        image="/images/hero-pool.jpg"
        imageAlt="The heated saltwater pool on a clear afternoon"
        title={
          <>
            Specials and <em>booking direct</em>
          </>
        }
        intro="When there's a discount running, it shows up here first. When there isn't, we say so."
      />

      {/* Current status, docked over the hero edge. No invented offers. */}
      <section className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal y={24} className="bezel bezel-solid -mt-10 lg:-mt-14">
          <div className="bezel-core p-8 sm:p-12 lg:p-14">
            <h2 className="max-w-[22ch] text-h2">
              No discounts are running <em>at the moment</em>
            </h2>
            <p className="mt-6 max-w-[58ch] text-lead text-muted">
              Worth a look before you book. In the meantime, live availability and current rates
              for every room type are on our booking page.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <BookNow size="lg" label="See live availability" href={site.bookingUrl} external />
              <a
                href={site.phones.tollFreeHref}
                className="text-small tabular-nums text-muted underline decoration-line underline-offset-[6px] transition-colors duration-200 hover:text-ink hover:decoration-navy"
              >
                or call {site.phones.tollFree}
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Always included */}
      <section className="section">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-6 lg:grid-cols-12 lg:gap-x-12 lg:px-10">
          <div className="lg:col-span-4">
            <SectionHeading
              title={
                <>
                  What you get <em>without a promo code</em>
                </>
              }
              intro="The things other places charge extra for are simply part of the room here."
            />
          </div>
          <div className="lg:col-span-8">
            <FeatureTiles items={included} />
          </div>
        </div>
      </section>

      {/* Groups */}
      <section className="bg-mist section">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal y={24} className="bezel">
            <div className="bezel-core flex flex-col justify-between gap-8 p-8 sm:flex-row sm:items-center lg:p-12">
              <div className="flex gap-6">
                <span className="hidden h-14 w-14 shrink-0 place-items-center rounded-full bg-mist text-navy sm:grid">
                  <UsersThree size={26} weight="light" aria-hidden />
                </span>
                <div>
                  <h2 className="text-h3">Groups, buses and families</h2>
                  <p className="mt-3 max-w-[58ch] text-body text-muted">
                    Travelling as a group, or booking several rooms at once? Give us a call and
                    we&apos;ll work it out with you. It&apos;s easier than doing it online.
                  </p>
                </div>
              </div>
              <TextLink href="/contact" className="shrink-0">
                Get in touch
              </TextLink>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
