import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import TextLink from "@/components/TextLink";
import BreakfastMenu from "@/components/BreakfastMenu";
import FeatureRow from "@/components/FeatureRow";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Breakfast",
  description:
    "A fresh continental breakfast served in our sunny breakfast room every morning from 7 to 9:30, free to every guest. Muffins baked that morning, bagels, fresh fruit, yogurt, and plenty of coffee, tea and hot chocolate.",
};

export default function BreakfastPage() {
  return (
    <>
      <PageHero
        image="/images/breakfast-mugs.jpg"
        imageAlt="Coffee mugs with the motel's logo and pastries fresh from the oven"
        label="Breakfast"
        title="Breakfast is on us"
        intro="Fresh coffee, something warm from the oven, and a sunny room to enjoy it in, every morning you're here."
      />

      {/* What's on: the menu card beside two photographs. */}
      <section className="container-site section">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-5">
            <SectionHeading
              label="7:00 to 9:30 every morning"
              title="Fresh coffee and something baked that morning"
              intro="Muffins from the oven, bagels and toast, fresh fruit and yogurt, with plenty of coffee, tea and hot chocolate."
            />
            <Reveal className="measure mt-6 space-y-4 text-body text-muted">
              <p>
                A proper sit-down spread, not a grab-and-go bag. Settle in at a table in the
                breakfast room, with the garden and the pool just outside the windows.
              </p>
              <p>{site.breakfastHours} Free to all motel studio and suite guests.</p>
            </Reveal>
            <BreakfastMenu className="mt-12 max-w-sm" />
          </div>

          <div className="grid grid-cols-2 items-start gap-3 lg:col-span-6 lg:col-start-7">
            <Reveal className="relative col-span-2 aspect-[4/3] overflow-hidden bg-sand">
              <Image
                src="/images/breakfast-room.jpg"
                alt="The sunny breakfast room with the garden through the windows"
                fill
                sizes="(max-width: 1024px) 92vw, 46vw"
                className="object-cover"
              />
            </Reveal>
            <Reveal delay={0.06} className="relative aspect-[3/4] overflow-hidden bg-sand">
              <Image
                src="/images/breakfast-muffins-pan.jpg"
                alt="A pan of muffins fresh from the oven"
                fill
                sizes="(max-width: 1024px) 46vw, 23vw"
                className="object-cover"
              />
            </Reveal>
            <Reveal delay={0.1} className="relative aspect-[3/4] overflow-hidden bg-sand">
              <Image
                src="/images/breakfast-toast.jpg"
                alt="Bagels, toast and juice on the breakfast counter"
                fill
                sizes="(max-width: 1024px) 46vw, 23vw"
                className="object-cover"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* The spread */}
      <section className="bg-sand section">
        <div className="container-site">
          <SectionHeading label="The breakfast room" title="Help yourself, and find a table" />
          <div className="mt-14 grid gap-3 sm:grid-cols-2">
            <Reveal className="relative aspect-[4/3] overflow-hidden bg-canvas">
              <Image
                src="/images/breakfast-buffet.jpg"
                alt="The breakfast buffet counter with bagels, rolls and the toaster"
                fill
                sizes="(max-width: 640px) 92vw, 46vw"
                className="object-cover"
              />
            </Reveal>
            <Reveal delay={0.06} className="relative aspect-[4/3] overflow-hidden bg-canvas">
              <Image
                src="/images/breakfast-fruit-table.jpg"
                alt="A basket of fresh fruit and pastries on the breakfast table"
                fill
                sizes="(max-width: 640px) 92vw, 46vw"
                className="object-cover"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* The rest of the day */}
      <section className="container-site section">
        <FeatureRow
          image="/images/grill-smokers.jpg"
          alt="The grills and smokers by the picnic tables in the garden"
          aspect="aspect-[4/5] sm:aspect-[4/3] lg:aspect-[5/6]"
          label="Later on"
          title="The garden kitchen is yours for dinner"
          actions={<TextLink href="/amenities">More about the grounds</TextLink>}
        >
          <p>
            The barbecue area is set up for proper cooking, not just burgers. Gas grills, smokers,
            a big outdoor stove, lobster pots, plates and utensils. You bring the food, we have
            everything else.
          </p>
          <p>{site.grillHours}</p>
        </FeatureRow>
      </section>

      <CTASection />
    </>
  );
}
