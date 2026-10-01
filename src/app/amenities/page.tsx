import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";
import { groundsGallery } from "@/lib/gallery";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Gallery from "@/components/Gallery";
import ParallaxImage from "@/components/ParallaxImage";
import TextLink from "@/components/TextLink";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Amenities and grounds",
  description:
    "A heated saltwater pool, gas grills and an outdoor kitchen, gazebos, picnic tables, a playground and a fenced sand play area, plus free Wi-Fi and breakfast.",
};

// Grouped into clusters, each with its own photograph, rather than one long
// hairline list. Photos here are the small originals, so the frames stay small.
const groups = [
  {
    heading: "Water and sun",
    image: "/images/pool-fall.jpg",
    alt: "The pool framed by autumn foliage",
    items: [
      ["Heated saltwater pool", "Gentle on skin, and no harsh chemicals. Open from mid-May."],
      ["Pool deck and loungers", "Open for sunbathing right up to the day we close for the year."],
    ],
  },
  {
    heading: "The garden kitchen",
    image: "/images/grills.jpg",
    alt: "Gas grills and the outdoor kitchen patio",
    items: [
      ["Gas grills, smokers and an outside stove", `A full outdoor kitchen beside the picnic tables. ${site.grillHours}`],
      ["Dining supplies lent", "Lobster pots, plates, utensils, even the tablecloth."],
      ["Gazebos and picnic tables", "Shaded seats scattered through the garden."],
    ],
  },
  {
    heading: "For children",
    image: "/images/sandbox.jpg",
    alt: "The fenced sand play area beside the picnic tables",
    items: [
      ["Fenced sand play area", "For under fours. We supply the toys."],
      ["Playground", "Swings and climbing on a soft wood chip surface."],
      ["Lawn games", "Out on the grass whenever you want them."],
    ],
  },
  {
    heading: "In the room",
    image: "/images/room-king.jpg",
    alt: "The king bed studio with new furniture",
    items: [
      ["Complimentary Wi-Fi", "Across the whole property."],
      ["Television, DVD and movie library", "Borrow something from the office."],
      ["Kitchen basics", "Refrigerator, microwave, toaster and a coffee maker with coffee."],
      ["Comfort", "Heat and air conditioning, hair dryer, iron and board, patio furniture."],
    ],
  },
];

export default function AmenitiesPage() {
  return (
    <>
      <PageHero
        image="/images/hero-pool-umbrella.jpg"
        imageAlt="Loungers and umbrellas around the heated saltwater pool"
        title={
          <>
            The pool, the grills, <em>the lawn</em>
          </>
        }
        intro="All of it is there to be used, and nearly all of it comes with the room."
      />

      {/* Clustered amenity groups */}
      <section className="mx-auto max-w-[1400px] px-6 section lg:px-10">
        <SectionHeading
          title={
            <>
              Everything on this page <em>is included</em>
            </>
          }
          intro="The pool, the grills, the supplies and breakfast all come with the room. None of it costs extra."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {groups.map((g, gi) => (
            <Reveal
              as="article"
              key={g.heading}
              delay={(gi % 2) * 0.08}
              y={36}
              className={`bezel ${gi % 2 === 1 ? "md:mt-16" : ""}`}
            >
              <div className="bezel-core grid h-full sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
                <div className="relative aspect-[16/10] sm:aspect-auto sm:min-h-full">
                  <Image
                    src={g.image}
                    alt={g.alt}
                    fill
                    sizes="(max-width: 640px) 94vw, (max-width: 768px) 40vw, 20vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-7 lg:p-8">
                  <h3 className="text-h4">{g.heading}</h3>
                  <dl className="mt-6 space-y-4">
                    {g.items.map(([t, d]) => (
                      <div key={t}>
                        <dt className="text-small font-medium text-ink">{t}</dt>
                        <dd className="mt-1 text-small text-muted">{d}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="measure mt-14 text-small text-faint">
          <p>
            {site.policies.join(". ")}. {site.poolSeason}
          </p>
        </Reveal>
      </section>

      {/* Barbecue feature */}
      <section className="bg-mist section">
        <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-6 lg:grid-cols-12 lg:gap-x-12 lg:px-10">
          <div className="lg:col-span-6">
            <Reveal y={40} className="bezel">
              <div className="bezel-core aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]">
                <ParallaxImage
                  src="/images/grill-smokers.jpg"
                  alt="The grills and smokers by the picnic tables in the garden"
                  sizes="(max-width: 1024px) 94vw, 46vw"
                  travel={6}
                />
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <SectionHeading
              title={
                <>
                  A kitchen outside, <em>and everything to cook with</em>
                </>
              }
              intro="Bring whatever you want to cook. The grills and smokers, the lobster pots, the plates and the utensils are all here to use. Washing up afterwards is down to you."
            />
            <Reveal delay={0.1} className="mt-6 text-muted">
              <p>{site.grillHours}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-[1400px] px-6 section lg:px-10">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            title={
              <>
                Around the <em>grounds</em>
              </>
            }
            intro="Photographs of the property. Select any one of them to see it larger."
          />
          <Reveal delay={0.05} className="shrink-0 sm:pb-2">
            <TextLink href="/rooms">See the rooms</TextLink>
          </Reveal>
        </div>
        <div className="mt-14">
          <Gallery images={groundsGallery} />
        </div>
      </section>

      <CTASection />
    </>
  );
}
