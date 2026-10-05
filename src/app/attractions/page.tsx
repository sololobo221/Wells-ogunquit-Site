import type { Metadata } from "next";
import Image from "next/image";
import { Bird, Boat, FilmSlate, Lighthouse, MapPin, Waves } from "@phosphor-icons/react/dist/ssr";
import { distances } from "@/lib/site";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import FeatureTiles from "@/components/FeatureTiles";
import DistanceScale from "@/components/DistanceScale";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Beaches and attractions",
  description:
    "Moody and North Beach are a three quarter mile walk. Perkins Cove, the Marginal Way, the Ogunquit Playhouse, Kennebunkport and Portland are all close by.",
};

const nearby = [
  {
    name: "Moody and North Beach",
    distance: "3/4 mile, on foot",
    detail: "The closest sand. Wide, flat, and good at any tide.",
    image: "/images/beach.jpg",
    alt: "The beach a short walk from the property",
  },
  {
    name: "The Marginal Way",
    distance: "In Ogunquit village",
    detail: "A mile and a quarter cliff walk from the village to Perkins Cove, with benches the whole way.",
    image: "/images/beach-rose.jpg",
    alt: "Beach roses along the coastal path",
  },
  {
    name: "Perkins Cove",
    distance: "2.8 miles",
    detail: "Lobster shacks, galleries and the drawbridge. Take the trolley in summer.",
    image: "/images/beach-aerial.jpg",
    alt: "Aerial view of the shoreline near Perkins Cove",
  },
];

const more = [
  { icon: Waves, title: "Wells Beach", text: "Two miles north, with the jetty, the harbour and a long open stretch." },
  { icon: FilmSlate, title: "Ogunquit Playhouse", text: "One of the best known summer theatres in the country." },
  { icon: Boat, title: "Kennebunkport", text: "Eight miles up Route 1. Dock Square, the harbour and Walker's Point." },
  { icon: MapPin, title: "Portland", text: "Forty minutes north for the Old Port and the working waterfront." },
  { icon: Lighthouse, title: "Nubble Light, York", text: "The most photographed lighthouse in Maine, a short drive south." },
  { icon: Bird, title: "Rachel Carson refuge", text: "Salt marsh trails and birdlife, right on our doorstep." },
];

export default function AttractionsPage() {
  return (
    <>
      <PageHero
        image="/images/hero-sunrise-wide.jpg"
        imageAlt="Sunrise over the water near Wells and Ogunquit"
        label="The area"
        title="The beaches, the cove and the coast road"
        intro="Walk, bike, take the trolley or drive. The beaches, restaurants, shops and galleries are all close."
      />

      <section className="container-site section">
        <SectionHeading
          label="Close by"
          title="Where people go first"
          intro="These three come up more than anywhere else."
        />
        <ul className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {nearby.map((n, i) => (
            <Reveal as="li" key={n.name} delay={i * 0.06}>
              <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                <Image
                  src={n.image}
                  alt={n.alt}
                  fill
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
                  className="object-cover"
                />
              </div>
              <span className="caps mt-6 block text-accent">{n.distance}</span>
              <h3 className="mt-3 text-h3">{n.name}</h3>
              <p className="mt-3 text-body text-muted">{n.detail}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="bg-sand section">
        <div className="container-site">
          <SectionHeading label="Further afield" title="Worth the drive" />
          <FeatureTiles items={more} columns={3} className="mt-14" />
        </div>
      </section>

      {/* A wide band of the coastline, then the driving times. */}
      <section>
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
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-16">
            <div className="lg:col-span-4">
              <SectionHeading
                label="Getting here"
                title="Driving times from the door"
                intro="We're on Route 1 in Wells. Portland is 40 minutes north, Boston an hour and a half south."
              />
            </div>
            <div className="lg:col-span-8">
              <DistanceScale items={distances} />
            </div>
          </div>
        </div>
      </section>

      <CTASection
        image="/images/hero-pool-umbrella.jpg"
        alt="Loungers and umbrellas around the heated saltwater pool"
      />
    </>
  );
}
