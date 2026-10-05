import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";
import { groundsGallery } from "@/lib/gallery";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Gallery from "@/components/Gallery";
import FeatureRow from "@/components/FeatureRow";
import AmenityGrid from "@/components/AmenityGrid";
import TextLink from "@/components/TextLink";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Amenities and grounds",
  description:
    "A heated saltwater pool, gas grills and an outdoor kitchen, gazebos, picnic tables, a playground and a fenced sand play area, plus free Wi-Fi and breakfast.",
};

// The originals for these are small, so they stay at card size.
const forFamilies = [
  {
    title: "Fenced sand play area",
    text: "For the under fours, beside the picnic tables. We supply the toys.",
    image: "/images/sandbox.jpg",
    alt: "The fenced sand play area beside the picnic tables",
  },
  {
    title: "Playground",
    text: "Swings and climbing on a soft wood chip surface, behind the buildings.",
    image: "/images/playground.jpg",
    alt: "Swings on the playground behind the buildings",
  },
  {
    title: "Gazebos and the lawn",
    text: "Shaded seats through the garden, and lawn games whenever you want them.",
    image: "/images/tables-fall.jpg",
    alt: "Picnic tables under autumn colour",
  },
];

export default function AmenitiesPage() {
  return (
    <>
      <PageHero
        image="/images/hero-pool-umbrella.jpg"
        imageAlt="Loungers and umbrellas around the heated saltwater pool"
        label="Amenities"
        title="The pool, the grills and the lawn"
        intro="All of it is there to be used, and all of it comes with the room."
      />

      <section className="container-site section">
        <SectionHeading
          center
          label="Included with every stay"
          title="Nothing on this page costs extra"
          titleClassName="max-w-[18ch]"
          intro="The pool, the grills and the dining supplies, breakfast and the Wi-Fi are all part of the room."
        />
      </section>

      <section className="container-site space-y-24 pb-[var(--section-y)] lg:space-y-36">
        <FeatureRow
          image="/images/hero-pool.jpg"
          alt="The heated saltwater pool on a clear afternoon"
          second={{ src: "/images/pool-fall.jpg", alt: "The pool framed by autumn foliage" }}
          label="Water and sun"
          title="A heated saltwater pool"
        >
          <p>Gentle on skin, and no harsh chemicals. Loungers all the way round the deck.</p>
          <p>{site.poolSeason}</p>
        </FeatureRow>

        <FeatureRow
          flip
          image="/images/grill-smokers.jpg"
          alt="The grills and smokers by the picnic tables in the garden"
          aspect="aspect-[4/5] sm:aspect-[4/3] lg:aspect-[5/6]"
          second={{ src: "/images/grills.jpg", alt: "Gas grills and the outdoor kitchen patio" }}
          label="The garden kitchen"
          title="A kitchen outside, and everything to cook with"
        >
          <p>
            Gas grills, smokers and an outside stove beside the picnic tables. Bring whatever you
            want to cook: the lobster pots, plates, utensils and even the tablecloths are here to
            use. Washing up afterwards is down to you.
          </p>
          <p>{site.grillHours}</p>
        </FeatureRow>
      </section>

      {/* For families: three smaller photographs, since the originals are small. */}
      <section className="bg-sand section">
        <div className="container-site">
          <SectionHeading label="For families" title="Room for the children to run" />
          <ul className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {forFamilies.map((f, i) => (
              <Reveal as="li" key={f.title} delay={i * 0.06}>
                <div className="relative aspect-[4/3] overflow-hidden bg-canvas">
                  <Image
                    src={f.image}
                    alt={f.alt}
                    fill
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-6 text-h4">{f.title}</h3>
                <p className="mt-2 text-small text-muted">{f.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* In the room */}
      <section className="container-site section">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-4">
            <SectionHeading
              label="In the room"
              title="The basics, done properly"
              intro="Borrow a film from the office for the DVD player. Iron, board and hair dryer in every room."
            />
            <Reveal className="mt-9">
              <TextLink href="/rooms">See the rooms</TextLink>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <AmenityGrid className="lg:!grid-cols-2" />
            <Reveal className="mt-8 text-small text-muted">
              <p>{site.policies.join(". ")}.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="border-t border-line section">
        <div className="container-site">
          <SectionHeading
            label="Gallery"
            title="Around the grounds"
            intro="Select any photograph to see it larger."
          />
          <div className="mt-14">
            <Gallery images={groundsGallery} />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
