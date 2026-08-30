import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";
import { groundsGallery } from "@/lib/gallery";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Gallery from "@/components/Gallery";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Amenities and grounds",
  description:
    "A heated saltwater pool, gas grills and an outdoor kitchen, gazebos, picnic tables, a playground and a fenced sand play area, plus free Wi-Fi and breakfast.",
};

// Grouped into clusters rather than one long hairline list
const groups = [
  {
    heading: "Water and sun",
    items: [
      ["Heated saltwater pool", "Gentle on skin, no harsh chemicals, warm into the autumn."],
      ["Pool deck and loungers", "Open for sunbathing right up to the day we close for the year."],
    ],
  },
  {
    heading: "The garden kitchen",
    items: [
      ["Gas grills and outside stove", "A full outdoor kitchen area beside the picnic tables."],
      ["Dining supplies lent", "Lobster pots, plates, utensils, even the tablecloth."],
      ["Gazebos and picnic tables", "Shaded seats scattered through the garden."],
    ],
  },
  {
    heading: "For children",
    items: [
      ["Fenced sand play area", "For under fours. We supply the toys."],
      ["Playground", "Swings and climbing on a soft wood chip surface."],
      ["Lawn games", "Out on the grass whenever you want them."],
    ],
  },
  {
    heading: "In the room",
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
        title="The pool, the grills, the lawn"
        intro="All of it is there to be used, and nearly all of it comes with the room."
      />

      {/* Clustered amenity groups */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10 lg:py-32">
        <SectionHeading
          label="On the property"
          title="Everything on this page is included"
          intro="The pool, the grills, the supplies and breakfast all come with the room. None of it costs extra."
        />

        <div className="mt-16 grid gap-x-16 gap-y-14 md:grid-cols-2">
          {groups.map((g, gi) => (
            <Reveal key={g.heading} delay={gi * 0.06}>
              <h3 className="font-display text-[1.4rem] leading-tight text-navy">{g.heading}</h3>
              <dl className="mt-5 space-y-4">
                {g.items.map(([t, d]) => (
                  <div key={t}>
                    <dt className="text-[0.95rem] text-ink">{t}</dt>
                    <dd className="mt-1 text-[0.86rem] leading-[1.6] text-muted">{d}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-14 text-[0.85rem] leading-[1.7] text-faint">
          <p>
            {site.policies.join(". ")}. The pool is solar heated from the middle of September until
            we close.
          </p>
        </Reveal>
      </section>

      {/* Barbecue feature */}
      <section className="border-y border-line bg-surface py-24 lg:py-32">
        <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-5 lg:grid-cols-12 lg:gap-20 lg:px-10">
          <div className="lg:col-span-7">
            <Reveal className="relative aspect-[16/11] overflow-hidden rounded-[var(--radius-card)] bg-canvas">
              <Image
                src="/images/garden-view.jpg"
                alt="The garden and lawn where the grills and picnic tables sit"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <SectionHeading
              title="Cook out, and leave the dishes to us"
              intro="Bring whatever you want to cook. We've got the grills, the lobster pots, the plates and the utensils, and we'll clean up after."
            />
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10 lg:py-32">
        <SectionHeading
          label="Photographs"
          title="Around the grounds"
          intro="Photographs of the property. Click any one of them to see it larger."
        />
        <div className="mt-12">
          <Gallery images={groundsGallery} />
        </div>
      </section>

      <CTASection />
    </>
  );
}
