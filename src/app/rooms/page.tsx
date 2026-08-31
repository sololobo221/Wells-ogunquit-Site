import type { Metadata } from "next";
import { rooms, inRoomAmenities } from "@/lib/rooms";
import { site } from "@/lib/site";
import PageHero from "@/components/PageHero";
import RoomCard from "@/components/RoomCard";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Rooms and rates",
  description:
    "Six freshly updated room and suite layouts sleeping two to six. Studios, a two bedroom family suite and poolside rooms. Check live availability and rates.",
};

const notes = [
  {
    t: "Best rate here",
    d: "Booking direct on our own page is always the best deal.",
  },
  { t: "Free changes", d: site.cancellation },
  {
    t: "Stairs and access",
    d: "We're all on one floor, but a few buildings have three to six steps up to the door. Ask for a step-free room when you book and we'll sort it.",
  },
];

export default function RoomsPage() {
  return (
    <>
      <PageHero
        image="/images/hero-room.jpg"
        imageAlt="A freshly updated guest room with new furniture"
        title="Freshly updated rooms by the water"
        intro="Every room got new furniture and lighting. Open any of them for the details, then check live rates on our booking page."
      />

      {/* Practical notes. No invented prices anywhere on this site. */}
      <section className="border-b border-line bg-surface">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-6 section sm:grid-cols-3 lg:px-10">
          {notes.map((c, i) => (
            <Reveal key={c.t} delay={i * 0.07}>
              <h2 className="font-display text-lead leading-tight text-navy">{c.t}</h2>
              <p className="mt-3 text-small text-muted">{c.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Room grid, staggered so it does not read as three equal columns */}
      <section className="mx-auto max-w-[1400px] px-6 section lg:px-10">
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room, i) => (
            <Reveal key={room.slug} delay={(i % 3) * 0.08} className={i % 3 === 1 ? "lg:pt-16" : ""}>
              <RoomCard room={room} priority={i < 3} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* In every room, grouped into two columns rather than one long list */}
      <section className="bg-sand section">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-6 lg:grid-cols-12 lg:gap-x-12 lg:px-10">
          <div className="lg:col-span-5">
            <SectionHeading
              label="In every room"
              title="What comes with every room"
              intro="Whichever layout you pick, this is all included."
            />
            <Reveal delay={0.12} className="mt-8 text-small text-faint">
              <p>
                {site.policies.join(". ")}. Every stay also includes the barbecue grills and dining
                supplies, breakfast, the heated saltwater pool and Wi-Fi.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <ul className="grid grid-cols-1 gap-x-12 sm:grid-cols-2">
              {inRoomAmenities.map((a, i) => (
                <Reveal as="li" key={a} delay={i * 0.03}>
                  <span className="block border-b border-line py-4 text-small text-muted">
                    {a}
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
