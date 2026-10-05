import Image from "next/image";
import { site } from "@/lib/site";
import { rooms } from "@/lib/rooms";
import { faq } from "@/lib/faq";
import HeroSlider from "@/components/HeroSlider";
import BookingBar from "@/components/BookingBar";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import BookNow from "@/components/BookNow";
import CTASection from "@/components/CTASection";
import Reviews from "@/components/Reviews";
import TextLink from "@/components/TextLink";
import RoomCard from "@/components/RoomCard";
import FeatureRow from "@/components/FeatureRow";
import DistanceScale from "@/components/DistanceScale";

/** Nearest first. */
const distances = [
  { value: "3/4 mile", place: "Moody and North Beach" },
  { value: "2 miles", place: "Wells Beach" },
  { value: "2.8 miles", place: "Perkins Cove, Ogunquit" },
  { value: "8 miles", place: "Kennebunkport" },
  { value: "40 minutes", place: "Portland" },
  { value: "1.5 hours", place: "Boston" },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const featured = rooms.filter((r) => r.featured);

export default function Home() {
  return (
    <>
      {/* 1. Hero: photography edge to edge, the name of the place low on it. */}
      <section className="relative flex min-h-[88svh] items-end overflow-hidden bg-harbor lg:min-h-[100svh]">
        <HeroSlider indicatorClassName="bottom-14 right-12" />
        <div className="container-site relative z-10 pb-16 pt-40 lg:pb-24">
          <span className="kicker animate-rise !text-white/90">Wells &middot; Ogunquit &middot; Maine</span>
          <h1
            className="animate-rise max-w-[13ch] text-display !text-white"
            style={{ animationDelay: "80ms" }}
          >
            A quiet corner of the Maine coast
          </h1>
          <p
            className="animate-rise mt-6 max-w-[44ch] text-lead text-white/90"
            style={{ animationDelay: "160ms" }}
          >
            A family-run motel with a heated saltwater pool, free breakfast every morning, and a
            short walk to Moody Beach.
          </p>
          <div
            className="animate-rise mt-9 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "240ms" }}
          >
            {/* The pinned bar at the bottom already offers booking on phones. */}
            <span className="hidden sm:block">
              <BookNow size="lg" label="Book your stay" />
            </span>
            <BookNow size="lg" variant="outlineLight" href="/rooms" label="See the rooms" />
          </div>
        </div>
      </section>

      {/* 2. Availability, straight under the photograph. */}
      <section className="relative z-10">
        <BookingBar />
      </section>

      {/* 3. Welcome. Words on the left, the place on the right. */}
      <section className="container-site section">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="kicker">Welcome</span>
              <h2 className="max-w-[16ch] text-h2">
                A family-run motel, three quarters of a mile from the beach
              </h2>
              <div className="mt-7 space-y-4 text-body text-muted">
                <p>
                  We&apos;re on Route 1 in Wells, an easy walk from Moody and North Beach. Ogunquit
                  and Perkins Cove are just south, Kennebunkport a few miles north, and Portland is
                  forty minutes up the road.
                </p>
                <p>
                  Rated No. 1 in Wells on TripAdvisor every year since 2017. The rooms have been
                  freshly updated, breakfast is on us, and the pool is heated from mid-May.
                </p>
              </div>
              <div className="mt-9">
                <TextLink href="/attractions">Explore the area</TextLink>
              </div>
            </Reveal>
          </div>

          <div className="relative lg:col-span-7">
            <Reveal className="relative aspect-[4/3] overflow-hidden bg-sand sm:ml-[12%]">
              <Image
                src="/images/garden-view.jpg"
                alt="The garden and lawn between the guest buildings, with red umbrellas over the picnic tables"
                fill
                sizes="(max-width: 1024px) 88vw, 50vw"
                className="object-cover"
              />
            </Reveal>
            <Reveal
              delay={0.1}
              className="relative -mt-20 ml-auto mr-6 w-[52%] border-[10px] border-canvas sm:absolute sm:bottom-[-12%] sm:left-0 sm:ml-0 sm:mr-0 sm:mt-0 sm:w-[40%]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                <Image
                  src="/images/sign-fall.jpg"
                  alt="The motel sign on Route 1 with autumn trees behind it"
                  fill
                  sizes="(max-width: 640px) 50vw, 28vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4. Rooms. */}
      <section className="bg-sand section">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              label="Rooms and suites"
              title="Six layouts, sleeping two to six"
              intro="Every room has a Serta Presidential Suite bed, a fridge, microwave and coffee maker, and its own door to the outside."
            />
            <Reveal className="shrink-0 lg:pb-2">
              <TextLink href="/rooms">View all six rooms</TextLink>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {featured.map((room, i) => (
              <Reveal key={room.slug} delay={i * 0.06}>
                <RoomCard room={room} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. The property, in alternating rows. */}
      <section className="container-site section space-y-24 lg:space-y-36">
        <FeatureRow
          image="/images/hero-pool-umbrella.jpg"
          alt="Loungers and umbrellas around the heated saltwater pool"
          second={{ src: "/images/pool-fall.jpg", alt: "The pool framed by autumn foliage" }}
          label="The pool"
          title="A heated saltwater pool"
          actions={<TextLink href="/amenities">Amenities</TextLink>}
        >
          <p>
            Saltwater, so it&apos;s gentle on your skin. The ocean here stays cold all summer. The
            pool doesn&apos;t.
          </p>
          <p>{site.poolSeason}</p>
        </FeatureRow>

        <FeatureRow
          flip
          image="/images/breakfast-room.jpg"
          alt="The sunny breakfast room set out for the morning, with garden views"
          second={{ src: "/images/breakfast-muffins.jpg", alt: "Muffins baked that morning" }}
          label="Breakfast"
          title="Coffee is on by seven"
          actions={<TextLink href="/breakfast">About breakfast</TextLink>}
        >
          <p>
            Muffins baked that morning, bagels and toast, fresh fruit and yogurt, with plenty of
            coffee, tea and hot chocolate. Free to every guest, every morning of your stay.
          </p>
          <p>{site.breakfastHours}</p>
        </FeatureRow>

        <FeatureRow
          image="/images/grill-smokers.jpg"
          alt="The grills and smokers by the picnic tables in the garden"
          aspect="aspect-[4/5] sm:aspect-[4/3] lg:aspect-[5/6]"
          second={{ src: "/images/gazebo.jpg", alt: "A gazebo beside the garden picnic tables" }}
          label="The garden"
          title="Cook your own dinner outside"
          actions={<TextLink href="/amenities">The grounds</TextLink>}
        >
          <p>
            Gas grills, smokers and an outdoor kitchen beside the picnic tables. We lend the lobster
            pots, plates and utensils. {site.grillHours}
          </p>
          <p>
            There&apos;s a playground, lawn games and a fenced sand area for the under fours, and
            gazebos for shade.
          </p>
        </FeatureRow>
      </section>

      {/* 6. The area: a wide band of coastline, then how far everything is. */}
      <section className="overflow-hidden">
        <Reveal className="relative aspect-[16/9] bg-sand sm:aspect-[3/1] lg:aspect-[384/100]">
          <Image
            src="/images/band-aerial-beach.png"
            alt="Aerial view of the beach and tidal river near Wells and Ogunquit"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </Reveal>
        <div className="container-site section !pt-16 lg:!pt-24">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-x-16">
            <div className="lg:col-span-5">
              <SectionHeading
                label="The area"
                title="Walk to the beach, take the trolley to Ogunquit"
                intro="Moody and North Beach are a three-quarter-mile walk. In summer the trolley runs to the Ogunquit Playhouse, Perkins Cove, the shops and the galleries."
              />
              <Reveal className="mt-9">
                <TextLink href="/attractions">Things to do nearby</TextLink>
              </Reveal>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 lg:pt-12">
              <DistanceScale items={distances} columns={1} />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Accolades. */}
      <Reviews />

      {/* 8. The questions people phone about, answered in the open. */}
      <section className="container-site section">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-4">
            <SectionHeading
              label="Good to know"
              title="Before you book"
              intro="The questions people usually call about."
            />
            <Reveal className="mt-9 flex flex-col items-start gap-5">
              <TextLink href="/policies">All our policies</TextLink>
              <a
                href={site.phones.tollFreeHref}
                className="text-small tabular-nums text-muted transition-colors duration-200 hover:text-ink"
              >
                Something else? Call {site.phones.tollFree}
              </a>
            </Reveal>
          </div>
          <dl className="grid gap-x-12 sm:grid-cols-2 lg:col-span-8">
            {faq.map((f, i) => (
              <Reveal key={f.q} delay={(i % 2) * 0.05} className="border-t border-ink/15 py-7">
                <dt className="font-display text-h4">{f.q}</dt>
                <dd className="mt-2.5 text-small text-muted">{f.a}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </section>

      <CTASection />
    </>
  );
}
