import type { Metadata } from "next";
import Image from "next/image";
import { distances } from "@/lib/site";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Beaches and attractions",
  description:
    "Moody and North Beach are a three quarter mile walk. Perkins Cove, the Marginal Way, the Ogunquit Playhouse, Kennebunkport and Portland are all close by.",
};

const nearby = [
  {
    name: "Moody and North Beach",
    detail:
      "The closest sand, three quarters of a mile from the door. Wide, flat, and good at any tide.",
    image: "/images/beach.jpg",
    alt: "The beach a short walk from the property",
  },
  {
    name: "The Marginal Way",
    detail:
      "A mile and a quarter cliff walk from Ogunquit village to Perkins Cove, with benches the whole way.",
    image: "/images/beach-rose.jpg",
    alt: "Beach roses along the coastal path",
  },
  {
    name: "Perkins Cove",
    detail:
      "Lobster shacks, galleries and the drawbridge, 2.8 miles down the road. Take the trolley in summer.",
    image: "/images/beach-aerial.jpg",
    alt: "Aerial view of the shoreline near Perkins Cove",
  },
];

const more = [
  ["Wells Beach", "Two miles north, with the jetty, the harbour and a long open stretch."],
  ["Ogunquit Playhouse", "One of the best known summer theatres in the country."],
  ["Kennebunkport", "Eight miles up Route 1. Dock Square, the harbour and Walker's Point."],
  ["Portland", "Forty minutes north for the Old Port and the working waterfront."],
  ["Nubble Light, York", "The most photographed lighthouse in Maine, a short drive south."],
  ["Rachel Carson refuge", "Salt marsh trails and birdlife, right on our doorstep."],
];

export default function AttractionsPage() {
  return (
    <>
      <PageHero
        image="/images/band-aerial-beach.png"
        imageAlt="Aerial view of the beach and tidal river near Wells and Ogunquit"
        title="Everything is within reach"
        intro="Walk, bike, take the trolley or drive. The beaches, restaurants, shops and galleries are all close."
      />

      {/* Three feature cards with real photography */}
      <section className="mx-auto max-w-[1400px] px-6 section lg:px-10">
        <SectionHeading
          label="Close by"
          title="Where people go first"
          intro="These three come up more than anywhere else."
        />

        <div className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-3">
          {nearby.map((n, i) => (
            <Reveal key={n.name} delay={i * 0.08} className={i === 1 ? "md:pt-14" : ""}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-canvas">
                <Image
                  src={n.image}
                  alt={n.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <h3 className="mt-5 font-display text-h4 leading-tight">{n.name}</h3>
              <p className="mt-2 text-small text-muted">{n.detail}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* More, in two grouped columns */}
      <section className="bg-sand section">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-6 lg:grid-cols-12 lg:gap-x-12 lg:px-10">
          <div className="lg:col-span-4">
            <SectionHeading title="Worth the drive" />
          </div>
          <div className="lg:col-span-8">
            <div className="grid gap-x-14 gap-y-8 sm:grid-cols-2">
              {more.map(([t, d], i) => (
                <Reveal key={t} delay={(i % 2) * 0.06}>
                  <h3 className="font-display text-lead leading-tight text-navy">{t}</h3>
                  <p className="mt-2 text-small text-muted">{d}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Distances */}
      <section className="mx-auto max-w-[1400px] px-6 section lg:px-10">
        <SectionHeading
          title="Driving times from the door"
          intro="We're on Route 1 in Wells. Portland is 40 minutes north, Boston an hour and a half south."
        />
        <div className="mt-12 grid gap-x-14 sm:grid-cols-2">
          {distances.map((d, i) => (
            <Reveal key={d.place} delay={(i % 2) * 0.05}>
              <div className="flex items-baseline justify-between gap-6 border-b border-line py-4">
                <span className="text-small text-muted">{d.place}</span>
                <span className="shrink-0 font-display text-lead tabular-nums text-navy">
                  {d.value}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
