import Image from "next/image";
import { CheckCircle, Star, SunHorizon } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/site";
import { rooms } from "@/lib/rooms";
import { faq } from "@/lib/faq";
import HeroSlider from "@/components/HeroSlider";
import BookingBar from "@/components/BookingBar";
import TrustBar from "@/components/TrustBar";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import BookNow from "@/components/BookNow";
import CTASection from "@/components/CTASection";
import Reviews from "@/components/Reviews";
import TextLink from "@/components/TextLink";
import RoomRail from "@/components/RoomRail";
import ParallaxImage from "@/components/ParallaxImage";
import BreakfastMenu from "@/components/BreakfastMenu";
import DistanceScale from "@/components/DistanceScale";

const container = "mx-auto max-w-[1400px] px-6 lg:px-10";

/** Nearest first, so the scale reads left to right as "further away". */
const distances = [
  { value: "3/4 mile", place: "Moody and North Beach" },
  { value: "2 miles", place: "Wells Beach" },
  { value: "2.8 miles", place: "Perkins Cove" },
  { value: "8 miles", place: "Kennebunkport" },
  { value: "40 min", place: "Portland" },
  { value: "1.5 hours", place: "Boston" },
];

/** A small photograph set into a line of type. Decorative; the words carry it. */
function InlinePhoto({ src }: { src: string }) {
  return (
    <span
      aria-hidden
      className="relative mx-[0.08em] inline-block h-[0.78em] w-[1.75em] translate-y-[0.06em] overflow-hidden rounded-full align-baseline shadow-[inset_0_0_0_1px_rgba(15,30,36,0.08)]"
    >
      <Image src={src} alt="" fill sizes="120px" className="object-cover" />
    </span>
  );
}

/** What booking direct gets you, said right under the booking bar. */
const perks = [
  "Best rate when you book direct",
  "Free changes up to 48 hours before arrival",
  "Breakfast included every morning",
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

const tile = "bezel group relative";
const tileImage =
  "object-cover transition-transform duration-[1400ms] ease-[var(--ease-out)] group-hover:scale-[1.04]";

export default function Home() {
  return (
    <>
      {/* 1. Hero. Framed full bleed; the booking bar docks over its lower edge. */}
      <section className="px-2 pt-2 sm:px-3 sm:pt-3">
        <div className="relative flex min-h-[calc(100dvh-1rem)] items-end overflow-hidden rounded-[var(--radius-frame)] bg-atlantic sm:min-h-[calc(100dvh-1.5rem)] lg:min-h-[calc(100dvh-5.5rem)]">
          <HeroSlider indicatorClassName="bottom-24 right-8 lg:right-10" />
          <div className={`relative z-10 w-full ${container} pb-20 pt-36 lg:pb-32`}>
            <p className="animate-rise inline-flex items-center gap-2.5 rounded-full bg-[rgba(10,26,32,0.34)] py-1.5 pl-1.5 pr-4 text-micro text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.16)]">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-white/15">
                <Star size={12} weight="fill" aria-hidden />
              </span>
              No. 1 in Wells on TripAdvisor since 2017
            </p>
            <h1
              className="animate-rise mt-7 max-w-[10.5em] text-display !text-white"
              style={{ animationDelay: "90ms" }}
            >
              A quiet corner of the <em>Maine coast</em>
            </h1>
            <p
              className="animate-rise mt-7 max-w-[40ch] text-lead text-white/85"
              style={{ animationDelay: "180ms" }}
            >
              Heated saltwater pool, free breakfast every morning, and a short walk to Moody and
              North Beach.
            </p>
            <div
              className="animate-rise mt-10 flex flex-wrap items-center gap-3"
              style={{ animationDelay: "270ms" }}
            >
              {/* The floating mobile bar already offers Book a room below lg. */}
              <div className="hidden lg:block">
                <BookNow size="lg" />
              </div>
              <BookNow size="lg" variant="ghostOnDark" href="/rooms" label="See the rooms" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-20">
        <div className={`${container} -mt-10 lg:-mt-12`}>
          <BookingBar />
          <ul className="mt-6 flex flex-col gap-2.5 px-2 text-small text-muted sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8">
            {perks.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <CheckCircle size={18} weight="fill" className="shrink-0 text-navy" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 2. The place, as one editorial sentence, then the numbers. */}
      <section className={`${container} section`}>
        <Reveal as="p" className="statement max-w-[23em] text-ink">
          {/* Each photo is bound to its word and punctuation so neither wraps alone. */}
          A family-run motel on Route 1 in{" "}
          <span className="whitespace-nowrap">
            Wells
            <InlinePhoto src="/images/sign-fall.jpg" />,
          </span>{" "}
          three quarters of a mile from Moody{" "}
          <span className="whitespace-nowrap">
            Beach
            <InlinePhoto src="/images/beach.jpg" />.
          </span>{" "}
          <span className="text-muted">
            Ogunquit is just south of us, Kennebunkport a few miles north, and Portland is forty
            minutes up the road.
          </span>
        </Reveal>
        <TrustBar className="mt-20 lg:mt-28" />
      </section>

      {/* 3. The grounds. An asymmetric bento, one cell per thing. */}
      <section className="pb-[calc(var(--section-y)*1.08)]">
        <div className={container}>
          <SectionHeading
            title={
              <>
                Most of the day <em>happens outside</em>
              </>
            }
            intro="The pool, the grills and the lawn are the reasons guests book again before they leave."
          />

          <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-12">
            <Reveal
              as="article"
              y={40}
              className={`${tile} min-h-[420px] md:col-span-6 lg:col-span-8 lg:row-span-2 lg:min-h-[660px]`}
            >
              <div className="bezel-core h-full">
                <Image
                  src="/images/hero-pool.jpg"
                  alt="The heated saltwater pool on a clear afternoon"
                  fill
                  sizes="(max-width: 1024px) 94vw, 62vw"
                  className={tileImage}
                />
                <div className="media-wash absolute inset-0" />
                <div className="absolute inset-x-0 bottom-0 p-7 lg:p-10">
                  <h3 className="text-h3 !text-white">A heated saltwater pool</h3>
                  <p className="mt-3 max-w-[44ch] text-small text-white/80">
                    Saltwater, so it&apos;s gentle on your skin. The ocean here stays cold all
                    summer. The pool doesn&apos;t.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal
              as="article"
              y={40}
              delay={0.08}
              className={`${tile} min-h-[460px] md:col-span-3 lg:col-span-4 lg:row-span-2`}
            >
              <div className="bezel-core h-full">
                <Image
                  src="/images/grill-smokers.jpg"
                  alt="The grills and smokers by the picnic tables in the garden"
                  fill
                  sizes="(max-width: 768px) 94vw, (max-width: 1024px) 46vw, 30vw"
                  className={tileImage}
                />
                <div className="media-wash absolute inset-0" />
                <div className="absolute inset-x-0 bottom-0 p-7 lg:p-8">
                  <h3 className="text-h4 !text-white">Cook your own dinner</h3>
                  <p className="mt-2 max-w-[34ch] text-small text-white/80">
                    Gas grills, smokers and an outdoor kitchen. We lend the lobster pots, plates
                    and utensils. {site.grillHours}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal
              as="article"
              y={40}
              delay={0.04}
              className={`${tile} bezel-dark min-h-[300px] md:col-span-3 lg:col-span-4`}
            >
              <div className="bezel-core flex h-full flex-col justify-between gap-10 p-7 lg:p-8">
                <SunHorizon size={30} weight="light" className="text-foam-muted" aria-hidden />
                <div>
                  <h3 className="text-h3 !text-foam">
                    Heated from <em>mid-May</em>
                  </h3>
                  <p className="mt-3 max-w-[38ch] text-small text-foam-muted">
                    The heat stays on until the third week of September, and the deck stays open
                    for sunbathing until we close for the year.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal
              as="article"
              y={40}
              delay={0.1}
              className={`${tile} min-h-[300px] md:col-span-3 lg:col-span-3`}
            >
              <div className="bezel-core h-full">
                <Image
                  src="/images/playground.jpg"
                  alt="Swings on the playground behind the buildings"
                  fill
                  sizes="(max-width: 768px) 94vw, (max-width: 1024px) 46vw, 24vw"
                  className={tileImage}
                />
                <div className="media-wash absolute inset-0" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <h3 className="text-h4 !text-white">Room to run</h3>
                  <p className="mt-2 max-w-[30ch] text-micro text-white/80">
                    Playground, lawn games and a fenced sand area for the under fours.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal
              as="article"
              y={40}
              delay={0.16}
              className={`${tile} min-h-[300px] md:col-span-3 lg:col-span-5`}
            >
              <div className="bezel-core h-full">
                <Image
                  src="/images/garden-view.jpg"
                  alt="The garden and lawn between the buildings"
                  fill
                  sizes="(max-width: 768px) 94vw, (max-width: 1024px) 46vw, 40vw"
                  className={tileImage}
                />
                <div className="media-wash absolute inset-0" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <h3 className="text-h4 !text-white">Shade and a seat</h3>
                  <p className="mt-2 max-w-[34ch] text-micro text-white/80">
                    Gazebos and picnic tables through the garden.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-12">
            <TextLink href="/amenities">Everything on the property</TextLink>
          </Reveal>
        </div>
      </section>

      {/* 4. Rooms. One shelf with all six, bleeding off the right edge. */}
      <section className="section overflow-hidden bg-mist">
        <RoomRail
          rooms={rooms}
          header={
            <SectionHeading
              title={
                <>
                  Six layouts, <em>two to six guests</em>
                </>
              }
              intro="Every room has a Serta Presidential Suite bed, a fridge, microwave and coffee maker, and its own door to the outside."
            />
          }
        />
        <div className={`${container} mt-12`}>
          <Reveal>
            <TextLink href="/rooms">Compare all six rooms</TextLink>
          </Reveal>
        </div>
      </section>

      {/* 5. Breakfast. The photograph with a menu card propped against it. */}
      <section className={`${container} section`}>
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-4">
            <SectionHeading
              title={
                <>
                  Coffee is on <em>by seven</em>
                </>
              }
              titleClassName="max-w-[9ch]"
              intro="Come down to the sunny breakfast room, say good morning, and help yourself. It's free, every morning of your stay."
            />
            <Reveal delay={0.1} className="mt-10">
              <TextLink href="/breakfast">More about breakfast</TextLink>
            </Reveal>
          </div>

          <div className="relative lg:col-span-7 lg:col-start-6">
            <Reveal y={40} className="bezel">
              <div className="bezel-core aspect-[4/3] lg:aspect-[5/4]">
                <ParallaxImage
                  src="/images/breakfast-room.jpg"
                  alt="The sunny breakfast room set out for the morning, with garden views"
                  sizes="(max-width: 1024px) 94vw, 56vw"
                  travel={6}
                />
              </div>
            </Reveal>
            {/* Propped against the photo at an angle only where the text
                column is wide enough to leave it room. */}
            <BreakfastMenu className="relative z-10 mx-4 -mt-24 sm:mx-auto sm:max-w-sm xl:absolute xl:-left-24 xl:bottom-14 xl:m-0 xl:w-[320px] xl:-rotate-[2.5deg]" />
          </div>
        </div>
      </section>

      {/* 6. The area. A wide aerial, then distances as stops along one line. */}
      <section className="section bg-mist">
        <div className={container}>
          <SectionHeading
            title={
              <>
                Walk, bike, or <em>take the trolley</em>
              </>
            }
            intro="Moody and North Beach are a three-quarter-mile walk. The trolley runs to the Ogunquit Playhouse, Perkins Cove, the shops and the galleries."
          />

          <Reveal y={40} className="bezel mt-16">
            <div className="bezel-core aspect-[16/10] sm:aspect-[21/9] lg:aspect-[32/10]">
              <ParallaxImage
                src="/images/band-aerial-beach.png"
                alt="Aerial view of the beach and tidal river near Wells and Ogunquit"
                sizes="(max-width: 1400px) 96vw, 1340px"
                travel={5}
              />
            </div>
          </Reveal>

          <div className="mt-16 lg:mt-20">
            <DistanceScale items={distances} on="mist" />
          </div>

          <Reveal className="mt-14">
            <TextLink href="/attractions">Plan the trip</TextLink>
          </Reveal>
        </div>
      </section>

      {/* 7. Good to know. The questions people phone about, answered in the
          open rather than folded away in an accordion. */}
      <section className={`${container} section`}>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-4">
            <SectionHeading
              title={
                <>
                  Good <em>to know</em>
                </>
              }
              titleClassName="max-w-[8ch]"
              intro="The questions people usually call about, answered before you book."
            />
            <Reveal delay={0.1} className="mt-10 flex flex-col items-start gap-4">
              <TextLink href="/policies">All our policies</TextLink>
              <a
                href={site.phones.tollFreeHref}
                className="text-small tabular-nums text-muted underline decoration-line underline-offset-[6px] transition-colors duration-200 hover:text-ink hover:decoration-navy"
              >
                Something else? Call {site.phones.tollFree}
              </a>
            </Reveal>
          </div>
          <dl className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:col-span-8">
            {faq.map((f, i) => (
              <Reveal key={f.q} delay={(i % 2) * 0.06} y={20} className="border-t border-ink/15 pt-6">
                <dt className="font-display text-h4 font-[380]">{f.q}</dt>
                <dd className="mt-3 text-small text-muted">{f.a}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </section>

      {/* 8 + 9. The Atlantic passage: reviews, then the closing call to action,
          running into the footer. */}
      <Reviews />
      <CTASection />
    </>
  );
}
