import Image from "next/image";
import { site } from "@/lib/site";
import { rooms } from "@/lib/rooms";
import HeroSlider from "@/components/HeroSlider";
import BookingBar from "@/components/BookingBar";
import TrustBar from "@/components/TrustBar";
import SectionHeading from "@/components/SectionHeading";
import RoomCard from "@/components/RoomCard";
import Reveal from "@/components/Reveal";
import BookNow from "@/components/BookNow";
import CTASection from "@/components/CTASection";
import Reviews from "@/components/Reviews";
import TextLink from "@/components/TextLink";

const container = "mx-auto max-w-[1400px] px-6 lg:px-10";

/** Distances, rendered as a two column table rather than a stack of pairs. */
const distances: [string, string][] = [
  ["3/4 mile", "Moody and North Beach"],
  ["2 miles", "Wells Beach"],
  ["2.8 miles", "Perkins Cove"],
  ["8 miles", "Kennebunkport"],
  ["40 minutes", "Portland"],
  ["1.5 hours", "Boston"],
];

export default function Home() {
  const featured = rooms.filter((r) => r.featured);

  return (
    <>
      {/* 1. Hero, full bleed */}
      <section className="relative flex min-h-[100dvh] items-end overflow-hidden bg-ink pt-20">
        <HeroSlider />
        <div className={`relative z-10 w-full ${container} pb-24 lg:pb-28`}>
          <h1 className="max-w-[13ch] text-h1 !text-white">A quiet corner of the Maine coast</h1>
          <p className="mt-8 max-w-[46ch] text-lead text-white/85">
            Heated saltwater pool, free breakfast every morning, and a short walk to Moody and
            North Beach.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <BookNow size="lg" />
            <BookNow
              size="lg"
              variant="ghostOnDark"
              href="/rooms"
              external={false}
              label="See the rooms"
            />
          </div>
        </div>
      </section>

      {/* 2. Booking band, lifted over the seam between hero and page */}
      <section className="relative z-20 bg-canvas">
        <div className={`${container} -mt-10 pb-16 lg:-mt-12 lg:pb-20`}>
          <BookingBar />
        </div>
      </section>

      {/* 3. Stats */}
      <TrustBar />

      {/* 4. The place, asymmetric split */}
      <section className={`${container} section`}>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-5">
            <Reveal className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-sand">
              <Image
                src="/images/hero-room-alt.jpg"
                alt="A guest room with two beds, updated furniture and lighting"
                fill
                sizes="(max-width: 1024px) 92vw, 40vw"
                className="object-cover"
              />
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 lg:pt-16">
            <SectionHeading
              label="The place"
              title="Updated rooms, same easy feel"
              intro="We're on Route 1 in Wells, with Ogunquit just south of us and Kennebunkport a few miles north. Portland is 40 minutes away. Boston is an hour and a half."
            />
            <Reveal delay={0.05} className="measure mt-8 space-y-5 text-muted">
              <p>
                Every room has a Serta Presidential Suite bed, a fridge, microwave, toaster and a
                coffee maker with the coffee already in it, a flat screen TV, and its own door to
                the outside. All of them got new furniture and lighting.
              </p>
              <p>
                Outside there are gas grills and a full outdoor kitchen. Borrow the lobster pots,
                the plates and the utensils, and cook whatever you like.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="mt-10">
              <TextLink href="/amenities">Everything on the property</TextLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 5. Amenities bento */}
      <section className="bg-sand section">
        <div className={container}>
          <SectionHeading
            title="Most of the day happens outside"
            intro="The pool, the grills and the lawn are the reasons guests book again before they leave."
          />

          <div className="mt-16 grid gap-4 md:grid-cols-6">
            <Reveal
              as="article"
              className="group relative col-span-1 min-h-[340px] overflow-hidden rounded-[var(--radius-card)] md:col-span-4 md:row-span-2 md:min-h-[480px]"
            >
              <Image
                src="/images/hero-pool.jpg"
                alt="The heated saltwater pool on a clear afternoon"
                fill
                sizes="(max-width: 768px) 92vw, 62vw"
                className="object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.03]"
              />
              <div className="media-wash absolute inset-0" />
              <div className="absolute inset-x-0 bottom-0 p-8 lg:p-10">
                <h3 className="text-h3 !text-white">A heated saltwater pool</h3>
                <p className="mt-3 max-w-[44ch] text-small text-white/80">
                  Saltwater, so it&apos;s gentle on your skin. The ocean here stays cold all summer.
                  The pool doesn&apos;t.
                </p>
              </div>
            </Reveal>

            <Reveal
              as="article"
              delay={0.05}
              className="col-span-1 flex flex-col justify-between rounded-[var(--radius-card)] bg-surface p-7 shadow-card md:col-span-2"
            >
              <div className="relative mb-7 aspect-[16/10] overflow-hidden rounded-[var(--radius-media)]">
                <Image
                  src="/images/breakfast-muffins-pan.jpg"
                  alt="Muffins fresh from the oven in the pan"
                  fill
                  sizes="(max-width: 768px) 92vw, 30vw"
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-h4">Breakfast, on us</h3>
                <p className="mt-3 text-small text-muted">
                  Coffee and something baked that morning, served 7 to 9:30 in the breakfast room.
                </p>
              </div>
            </Reveal>

            <Reveal
              as="article"
              delay={0.1}
              className="group relative col-span-1 min-h-[210px] overflow-hidden rounded-[var(--radius-card)] md:col-span-2"
            >
              <Image
                src="/images/grills.jpg"
                alt="Gas grills and the outdoor kitchen patio"
                fill
                sizes="(max-width: 768px) 92vw, 30vw"
                className="object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.03]"
              />
              <div className="media-wash absolute inset-0" />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <h3 className="text-h4 !text-white">Cook your own dinner</h3>
                <p className="mt-2 text-micro text-white/80">
                  We lend the pots, plates and utensils.
                </p>
              </div>
            </Reveal>

            <Reveal
              as="article"
              delay={0.15}
              className="group relative col-span-1 min-h-[210px] overflow-hidden rounded-[var(--radius-card)] md:col-span-3"
            >
              <Image
                src="/images/playground.jpg"
                alt="Swings on the playground behind the buildings"
                fill
                sizes="(max-width: 768px) 92vw, 46vw"
                className="object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.03]"
              />
              <div className="media-wash absolute inset-0" />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <h3 className="text-h4 !text-white">Room to run</h3>
                <p className="mt-2 max-w-[34ch] text-micro text-white/80">
                  Playground, lawn games and a fenced sand area for the under fours.
                </p>
              </div>
            </Reveal>

            <Reveal
              as="article"
              delay={0.2}
              className="group relative col-span-1 min-h-[210px] overflow-hidden rounded-[var(--radius-card)] md:col-span-3"
            >
              <Image
                src="/images/gazebo.jpg"
                alt="A gazebo beside the picnic tables in the garden"
                fill
                sizes="(max-width: 768px) 92vw, 46vw"
                className="object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.03]"
              />
              <div className="media-wash absolute inset-0" />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <h3 className="text-h4 !text-white">Shade and a seat</h3>
                <p className="mt-2 max-w-[34ch] text-micro text-white/80">
                  Gazebos and picnic tables through the garden.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 6. Rooms */}
      <section className={`${container} section`}>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            label="Rooms and suites"
            title="Six layouts, two to six guests"
            intro="Studios for couples, two bedroom suites for families, and a few rooms right beside the pool."
          />
          <Reveal delay={0.05} className="shrink-0 lg:pb-2">
            <TextLink href="/rooms">All six rooms</TextLink>
          </Reveal>
        </div>

        <div className="mt-16 grid items-start gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((room, i) => (
            <Reveal
              key={room.slug}
              delay={i * 0.05}
              className={i === 1 ? "lg:pt-16" : i === 2 ? "lg:pt-8" : ""}
            >
              <RoomCard room={room} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* 7. Breakfast */}
      <section className="bg-sand section">
        <div className={`grid items-center gap-12 lg:grid-cols-12 lg:gap-x-12 ${container}`}>
          <div className="lg:col-span-5">
            <SectionHeading
              title="Coffee is on by seven"
              intro="Come down to the breakfast room, say good morning, and help yourself to coffee, tea or hot chocolate and something fresh out of the oven. It's free, every morning of your stay."
            />
            <Reveal delay={0.05} className="measure mt-8 text-muted">
              <p>
                Muffins baked that morning, bagels, fresh fruit and yogurt, set out in the sunny
                breakfast room overlooking the garden. {site.breakfastHours}
              </p>
            </Reveal>
            <Reveal delay={0.1} className="mt-10">
              <TextLink href="/breakfast">More about breakfast</TextLink>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal className="relative aspect-[16/11] overflow-hidden rounded-[var(--radius-card)] bg-canvas">
              <Image
                src="/images/breakfast-room.jpg"
                alt="The sunny breakfast room set out for the morning, with garden views"
                fill
                sizes="(max-width: 1024px) 92vw, 54vw"
                className="object-cover"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* 8. The area. Heading in the container, image breaks full bleed. */}
      <section className="section">
        <div className={container}>
          <SectionHeading
            label="The area"
            title="Walk, bike, or take the trolley"
            intro="Moody and North Beach are a three-quarter-mile walk. The trolley runs to the Ogunquit Playhouse, Perkins Cove, the shops and the galleries."
          />
        </div>

        <Reveal className="relative mt-16 aspect-[32/9] w-full overflow-hidden bg-sand">
          <Image
            src="/images/band-aerial-beach.png"
            alt="Aerial view of the beach and tidal river near Wells and Ogunquit"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </Reveal>

        <div className={`${container} mt-16`}>
          <dl className="grid gap-x-16 sm:grid-cols-2">
            {distances.map(([value, place], i) => (
              <Reveal key={place} delay={i * 0.04}>
                <div className="flex items-baseline justify-between gap-6 border-b border-line py-4">
                  <dt className="text-body text-muted">{place}</dt>
                  <dd className="shrink-0 font-display text-h4 tabular-nums text-ink">{value}</dd>
                </div>
              </Reveal>
            ))}
          </dl>

          <Reveal delay={0.1} className="mt-12">
            <TextLink href="/attractions">Plan the trip</TextLink>
          </Reveal>
        </div>
      </section>

      {/* 9. Reviews */}
      <Reviews />

      {/* 10. Closing line */}
      <section className="section">
        <div className={container}>
          <Reveal>
            <p className="mx-auto max-w-[26ch] text-center font-display text-h3 text-ink">
              Family run, and a lot of our guests have been coming back for years.
            </p>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
