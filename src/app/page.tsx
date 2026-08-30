import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
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
import Logo from "@/components/Logo";

const link =
  "group inline-flex items-center gap-1.5 text-[0.9rem] text-navy transition-colors duration-300 hover:text-ink";
const arrow =
  "transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[2px] group-hover:-translate-y-[2px]";

export default function Home() {
  const featured = rooms.filter((r) => r.featured);

  return (
    <>
      {/* 1. Hero */}
      <section className="relative flex min-h-[100dvh] items-end overflow-hidden pt-24">
        <HeroSlider />
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 pb-20 lg:px-10 lg:pb-24">
          <h1 className="max-w-[13ch] text-[2.8rem] leading-[1.02] text-white sm:text-[4rem] lg:text-[4.8rem]">
            A quiet corner of the Maine coast
          </h1>
          <p className="mt-6 max-w-[46ch] text-[1.02rem] leading-[1.7] text-white/85">
            Heated saltwater pool, free breakfast every morning, and a short walk to Moody and
            North Beach.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <BookNow size="lg" variant="onDark" />
            <Link
              href="/rooms"
              className="group inline-flex items-center gap-2 rounded-[var(--radius-control)] border border-white/40 px-6 py-3.5 text-[0.93rem] text-white transition-colors duration-200 hover:bg-white/10 hover:border-white/70"
            >
              See the rooms
              <ArrowUpRight size={15} className={arrow} />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Booking band */}
      <section className="border-b border-line bg-canvas">
        <div className="mx-auto max-w-[1400px] px-5 py-10 lg:px-10 lg:py-12">
          <BookingBar />
        </div>
      </section>

      {/* 3. Stats */}
      <TrustBar />

      {/* 4. The place */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10 lg:py-36">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-6">
            <Reveal className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-canvas">
              <Image
                src="/images/hero-room-alt.jpg"
                alt="A guest room with two beds, updated furniture and lighting"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:pt-12">
            <SectionHeading
              label="The place"
              title="Updated rooms, same easy feel"
              intro="We're on Route 1 in Wells, with Ogunquit just south of us and Kennebunkport a few miles north. Portland is 40 minutes away. Boston is an hour and a half."
            />
            <Reveal delay={0.1} className="mt-7 space-y-5 leading-[1.75] text-muted">
              <p>
                Every room has a Serta Presidential Suite bed, a fridge, microwave, toaster and a
                coffee maker with the coffee already in it, a flat screen TV, and its own door to
                the outside. All of them got new furniture and lighting.
              </p>
              <p>
                Outside there are gas grills and a full outdoor kitchen. Borrow the lobster pots,
                the plates, the utensils. We'll do the washing up.
              </p>
            </Reveal>
            <Reveal delay={0.16} className="mt-8">
              <Link href="/amenities" className={link}>
                Everything on the property
                <ArrowUpRight size={15} className={arrow} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 5. Amenities bento: five items, five cells */}
      <section className="border-y border-line bg-surface py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <SectionHeading
            title="Most of the day happens outside"
            intro="The pool, the grills and the lawn are the reasons guests book again before they leave."
          />

          <div className="mt-14 grid gap-3 md:grid-cols-6">
            <Reveal
              as="article"
              className="group relative col-span-1 min-h-[320px] overflow-hidden rounded-[var(--radius-card)] md:col-span-4 md:row-span-2 md:min-h-[460px]"
            >
              <Image
                src="/images/hero-pool.jpg"
                alt="The heated saltwater pool on a clear afternoon"
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />
              <div className="wash-soft absolute inset-0" />
              <div className="absolute inset-x-0 bottom-0 p-7 lg:p-9">
                <h3 className="text-[1.7rem] leading-[1.1] lg:text-[2rem] text-white">
                  A heated saltwater pool
                </h3>
                <p className="mt-3 max-w-[44ch] text-[0.9rem] leading-[1.6] text-white/75">
                  Saltwater, so it's gentle on your skin. The ocean here stays cold all summer.
                  The pool doesn't.
                </p>
              </div>
            </Reveal>

            <Reveal
              as="article"
              delay={0.06}
              className="col-span-1 flex flex-col justify-between rounded-[var(--radius-card)] border border-line bg-surface p-6 md:col-span-2"
            >
              <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-[var(--radius-media)]">
                <Image
                  src="/images/breakfast-muffins.jpg"
                  alt="Muffins and pastries set out for the morning"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-[1.3rem] leading-tight">Breakfast, on us</h3>
                <p className="mt-2 text-[0.85rem] leading-[1.6] text-muted">
                  Coffee and something baked that morning, 7 to 10. Eat it in the garden or take it
                  down to the beach.
                </p>
              </div>
            </Reveal>

            <Reveal
              as="article"
              delay={0.12}
              className="group relative col-span-1 min-h-[190px] overflow-hidden rounded-[var(--radius-card)] md:col-span-2"
            >
              <Image
                src="/images/grills.jpg"
                alt="Gas grills and the outdoor kitchen patio"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />
              <div className="wash-soft absolute inset-0" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="text-[1.25rem] leading-tight text-white">Cook your own dinner</h3>
                <p className="mt-1.5 text-[0.82rem] leading-[1.55] text-white/75">
                  We lend the pots, plates and utensils.
                </p>
              </div>
            </Reveal>

            <Reveal
              as="article"
              delay={0.18}
              className="group relative col-span-1 min-h-[190px] overflow-hidden rounded-[var(--radius-card)] md:col-span-3"
            >
              <Image
                src="/images/playground.jpg"
                alt="Swings on the playground behind the buildings"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />
              <div className="wash-soft absolute inset-0" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="text-[1.25rem] leading-tight text-white">Room to run</h3>
                <p className="mt-1.5 max-w-[34ch] text-[0.82rem] leading-[1.55] text-white/75">
                  Playground, lawn games and a fenced sand area for the under fours.
                </p>
              </div>
            </Reveal>

            <Reveal
              as="article"
              delay={0.24}
              className="group relative col-span-1 min-h-[190px] overflow-hidden rounded-[var(--radius-card)] md:col-span-3"
            >
              <Image
                src="/images/gazebo.jpg"
                alt="A gazebo beside the picnic tables in the garden"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />
              <div className="wash-soft absolute inset-0" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="text-[1.25rem] leading-tight text-white">Shade and a seat</h3>
                <p className="mt-1.5 max-w-[34ch] text-[0.82rem] leading-[1.55] text-white/75">
                  Gazebos and picnic tables through the garden.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 6. Rooms, asymmetric split */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10 lg:py-36">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            label="Rooms and suites"
            title="Six layouts, two to six guests"
            intro="Studios for couples, two bedroom suites for families, and a few rooms right beside the pool."
          />
          <Reveal delay={0.08} className="shrink-0">
            <Link href="/rooms" className={link}>
              All six rooms
              <ArrowUpRight size={15} className={arrow} />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid items-start gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((room, i) => (
            <Reveal
              key={room.slug}
              delay={i * 0.08}
              className={i === 1 ? "lg:pt-14" : i === 2 ? "lg:pt-7" : ""}
            >
              <RoomCard room={room} priority={i === 0} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* 7. Breakfast */}
      <section className="border-y border-line bg-surface py-24 lg:py-32">
        <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-5 lg:grid-cols-12 lg:gap-20 lg:px-10">
          <div className="lg:col-span-5">
            <SectionHeading
              title="Coffee is on by seven"
              intro="Stop by the office, say good morning, and help yourself to coffee, tea or hot chocolate and something fresh out of the oven. It's free, every morning of your stay."
            />
            <Reveal delay={0.1} className="mt-7 leading-[1.75] text-muted">
              <p>
                Muffins, pastries, yogurt. Eat at the picnic tables in the garden, or wrap it up and
                take it down to the sand. {site.breakfastHours}
              </p>
            </Reveal>
            <Reveal delay={0.16} className="mt-8">
              <Link href="/breakfast" className={link}>
                More about breakfast
                <ArrowUpRight size={15} className={arrow} />
              </Link>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal className="relative aspect-[16/11] overflow-hidden rounded-[var(--radius-card)] bg-canvas">
              <Image
                src="/images/breakfast-mugs.jpg"
                alt="Mugs of coffee and pastry laid out in the morning"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* 8. The area */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10 lg:py-36">
        <SectionHeading
          label="The area"
          title="Walk, bike, or take the trolley"
          intro="Moody and North Beach are a three-quarter-mile walk. The trolley runs to the Ogunquit Playhouse, Perkins Cove, the shops and the galleries."
        />

        <Reveal className="relative mt-12 aspect-[32/9] overflow-hidden rounded-[var(--radius-card)] bg-canvas">
          <Image
            src="/images/band-aerial-beach.png"
            alt="Aerial view of the beach and tidal river near Wells and Ogunquit"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </Reveal>

        <div className="mt-12 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["3/4 mile", "Moody and North Beach"],
            ["2 miles", "Wells Beach"],
            ["2.8 miles", "Perkins Cove"],
            ["8 miles", "Kennebunkport"],
            ["40 minutes", "Portland"],
            ["1.5 hours", "Boston"],
          ].map(([v, p], i) => (
            <Reveal key={p} delay={i * 0.05}>
              <div className="border-t border-line py-5">
                <p className="font-display text-[1.6rem] leading-none text-navy">{v}</p>
                <p className="mt-2 text-[0.85rem] text-muted">{p}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-10">
          <Link href="/attractions" className={link}>
            Plan the trip
            <ArrowUpRight size={15} className={arrow} />
          </Link>
        </Reveal>
      </section>

      {/* 9. Reviews */}
      <Reviews />

      {/* 10. The sign */}
      <section className="bg-canvas">
        <div className="mx-auto max-w-3xl px-5 py-20 text-center lg:px-10 lg:py-24">
          <Reveal>
            <Logo width={240} className="mx-auto" />
            <p className="mt-8 leading-[1.7] text-muted">
              Family run, and a lot of our guests have been coming back for years.
            </p>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
