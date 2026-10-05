import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarCheck, Stairs, Tag } from "@phosphor-icons/react/dist/ssr";
import { rooms } from "@/lib/rooms";
import { site } from "@/lib/site";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import AmenityGrid from "@/components/AmenityGrid";
import FeatureTiles from "@/components/FeatureTiles";
import BookNow from "@/components/BookNow";
import TextLink from "@/components/TextLink";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Rooms and rates",
  description:
    "Six freshly updated room and suite layouts sleeping two to six. Studios, a two bedroom family suite and poolside rooms. Check live availability and rates.",
};

const notes = [
  { icon: Tag, title: "Best rate here", text: "Booking direct on our own page is always the best deal." },
  { icon: CalendarCheck, title: "Free changes", text: site.cancellation },
  {
    icon: Stairs,
    title: "Stairs and access",
    text: "We're all on one floor, but a few buildings have three to six steps up to the door. Ask for a step-free room when you book.",
  },
];

export default function RoomsPage() {
  return (
    <>
      <PageHero
        image="/images/hero-room.jpg"
        imageAlt="A freshly updated guest room with two queen beds"
        label="Rooms and suites"
        title="Freshly updated rooms for two to six"
        intro="Every room has new furniture and lighting. Open any of them for the photos and details, then check live rates on our booking page."
      />

      <section className="container-site pt-16 lg:pt-20">
        <FeatureTiles items={notes} columns={3} />
      </section>

      {/* Each room as a listing row: photo, then the facts and the two actions. */}
      <section className="container-site section">
        <ul className="border-t border-ink/15">
          {rooms.map((room, i) => (
            <Reveal
              as="li"
              key={room.slug}
              className="grid gap-8 border-b border-ink/15 py-12 md:grid-cols-12 md:gap-x-12 lg:py-16"
            >
              <Link
                href={`/rooms/${room.slug}`}
                className="group relative block aspect-[3/2] overflow-hidden bg-sand md:col-span-6"
              >
                <Image
                  src={room.images[0].src}
                  alt={room.images[0].alt}
                  fill
                  loading={i < 2 ? "eager" : undefined}
                  sizes="(max-width: 768px) 92vw, 46vw"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.03]"
                />
              </Link>

              <div className="flex flex-col md:col-span-6 lg:col-span-5 lg:col-start-8">
                <h2 className="text-h3">
                  <Link href={`/rooms/${room.slug}`} className="transition-colors duration-300 hover:text-accent">
                    {room.name}
                  </Link>
                </h2>
                <p className="mt-4 text-body text-muted">{room.blurb}</p>
                <dl className="mt-7 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-line pt-6 text-small">
                  {[
                    ["Beds", room.beds],
                    ["Sleeps", room.sleeps],
                    ["Location", room.side],
                    ["Access", room.stairs],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="caps text-[0.6875rem] text-faint">{k}</dt>
                      <dd className="mt-1.5 text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <BookNow size="md" label="Check rates" href={site.bookingUrl} external />
                  <TextLink href={`/rooms/${room.slug}`}>Room details</TextLink>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* In every room */}
      <section className="bg-sand section">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-4">
            <SectionHeading
              label="In every room"
              title="Whichever layout you pick"
              intro="All of this is included, along with the pool, the grills and breakfast."
            />
          </div>
          <div className="lg:col-span-8">
            <AmenityGrid className="lg:!grid-cols-2" />
            <Reveal className="mt-8 text-small text-muted">
              <p>{site.policies.join(". ")}.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
