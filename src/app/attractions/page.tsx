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
  {
    icon: Waves,
    title: "Wells Beach",
    text: "Two miles north, with the jetty, the harbour and a long open stretch.",
  },
  {
    icon: FilmSlate,
    title: "Ogunquit Playhouse",
    text: "One of the best known summer theatres in the country.",
  },
  {
    icon: Boat,
    title: "Kennebunkport",
    text: "Eight miles up Route 1. Dock Square, the harbour and Walker's Point.",
  },
  {
    icon: MapPin,
    title: "Portland",
    text: "Forty minutes north for the Old Port and the working waterfront.",
  },
  {
    icon: Lighthouse,
    title: "Nubble Light, York",
    text: "The most photographed lighthouse in Maine, a short drive south.",
  },
  {
    icon: Bird,
    title: "Rachel Carson refuge",
    text: "Salt marsh trails and birdlife, right on our doorstep.",
  },
];

export default function AttractionsPage() {
  return (
    <>
      <PageHero
        image="/images/band-aerial-beach.png"
        imageAlt="Aerial view of the beach and tidal river near Wells and Ogunquit"
        title={
          <>
            Everything is <em>within reach</em>
          </>
        }
        intro="Walk, bike, take the trolley or drive. The beaches, restaurants, shops and galleries are all close."
      />

      {/* Where people go first, as an editorial index: name, detail, photo. */}
      <section className="mx-auto max-w-[1400px] px-6 section lg:px-10">
        <SectionHeading
          title={
            <>
              Where people <em>go first</em>
            </>
          }
          intro="These three come up more than anywhere else."
        />

        <ol className="mt-16 border-t border-ink/15">
          {nearby.map((n, i) => (
            <Reveal
              as="li"
              key={n.name}
              delay={i * 0.06}
              y={24}
              className="group grid items-center gap-6 border-b border-ink/15 py-8 sm:grid-cols-12 sm:gap-8 lg:py-10"
            >
              <h3 className="text-h2 sm:col-span-12 lg:col-span-5">{n.name}</h3>
              <p className="max-w-[40ch] text-body text-muted sm:col-span-7 lg:col-span-4">
                {n.detail}
              </p>
              <div className="bezel sm:col-span-5 lg:col-span-3">
                <div className="bezel-core aspect-[4/3] bg-mist">
                  <Image
                    src={n.image}
                    alt={n.alt}
                    fill
                    sizes="(max-width: 640px) 94vw, (max-width: 1024px) 46vw, 24vw"
                    className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out)] group-hover:scale-[1.05]"
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Further afield */}
      <section className="bg-mist section">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-6 lg:grid-cols-12 lg:gap-x-12 lg:px-10">
          <div className="lg:col-span-4">
            <SectionHeading
              title={
                <>
                  Worth <em>the drive</em>
                </>
              }
            />
          </div>
          <div className="lg:col-span-8">
            <FeatureTiles items={more} />
          </div>
        </div>
      </section>

      {/* Distances */}
      <section className="mx-auto max-w-[1400px] px-6 section lg:px-10">
        <SectionHeading
          title={
            <>
              Driving times <em>from the door</em>
            </>
          }
          intro="We're on Route 1 in Wells. Portland is 40 minutes north, Boston an hour and a half south."
        />
        <div className="mt-16 lg:mt-20">
          <DistanceScale items={distances} columns={5} />
        </div>
      </section>

      <CTASection />
    </>
  );
}
