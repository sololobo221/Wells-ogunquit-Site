import type { Metadata } from "next";
import { CalendarCheck, Stairs, Tag } from "@phosphor-icons/react/dist/ssr";
import { rooms } from "@/lib/rooms";
import { site } from "@/lib/site";
import PageHero from "@/components/PageHero";
import RoomCard from "@/components/RoomCard";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import AmenityGrid from "@/components/AmenityGrid";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Rooms and rates",
  description:
    "Six freshly updated room and suite layouts sleeping two to six. Studios, a two bedroom family suite and poolside rooms. Check live availability and rates.",
};

const notes = [
  {
    icon: Tag,
    t: "Best rate here",
    d: "Booking direct on our own page is always the best deal.",
  },
  { icon: CalendarCheck, t: "Free changes", d: site.cancellation },
  {
    icon: Stairs,
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
        title={
          <>
            Freshly updated rooms <em>by the water</em>
          </>
        }
        intro="Every room got new furniture and lighting. Open any of them for the details, then check live rates on our booking page."
      />

      {/* Practical notes, docked over the hero's lower edge. No invented prices
          anywhere on this site. */}
      <section className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal y={24} className="bezel bezel-solid -mt-10 lg:-mt-14">
          <div className="bezel-core grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {notes.map(({ icon: Glyph, t, d }) => (
              <div key={t} className="p-7 lg:p-9">
                <Glyph size={24} weight="light" className="text-navy" aria-hidden />
                <h2 className="mt-5 text-h4">{t}</h2>
                <p className="mt-2 text-small text-muted">{d}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Room grid, staggered so it does not read as three equal columns */}
      <section className="mx-auto max-w-[1400px] px-6 section lg:px-10">
        <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room, i) => (
            <Reveal
              key={room.slug}
              delay={(i % 3) * 0.08}
              y={36}
              className={i % 3 === 1 ? "lg:mt-20" : i % 3 === 2 ? "lg:mt-10" : ""}
            >
              <RoomCard room={room} eager={i < 3} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* In every room */}
      <section className="bg-mist section">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionHeading
            title={
              <>
                What comes with <em>every room</em>
              </>
            }
            intro="Whichever layout you pick, this is all included."
          />
          <AmenityGrid className="mt-14" />
          <Reveal delay={0.1} className="measure mt-10 text-small text-faint">
            <p>
              {site.policies.join(". ")}. Every stay also includes the barbecue grills and dining
              supplies, breakfast, the heated saltwater pool and Wi-Fi.
            </p>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
