import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import TextLink from "@/components/TextLink";
import BreakfastMenu from "@/components/BreakfastMenu";
import ParallaxImage from "@/components/ParallaxImage";
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
        imageAlt="Coffee and something fresh from the oven, set out for the morning"
        title={
          <>
            Breakfast is <em>on us</em>
          </>
        }
        intro="Fresh coffee, something warm from the oven, and a sunny room to sit and enjoy it, every morning you're here."
      />

      {/* What's on. Text to the left, two tall photographs staggered right. */}
      <section className="mx-auto max-w-[1400px] px-6 section lg:px-10">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-5 lg:pt-10">
            <SectionHeading
              label="Served 7:00 to 9:30"
              title={
                <>
                  Fresh coffee and something <em>baked that morning</em>
                </>
              }
              intro="Muffins from the oven, bagels and toast, fresh fruit and yogurt, with plenty of coffee, tea and hot chocolate. Free to every guest, every morning you're here."
            />
            <Reveal delay={0.1} className="measure mt-7 space-y-5 text-muted">
              <p>
                A proper sit-down spread, not a grab-and-go bag. Settle in at a table in the
                breakfast room, with the garden and the pool just outside the windows.
              </p>
              <p>{site.breakfastHours} Available to all motel studio and suite guests.</p>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="grid grid-cols-2 items-start gap-3 sm:gap-4">
              <Reveal y={40} className="bezel mt-12 sm:mt-20">
                <div className="bezel-core aspect-[3/4]">
                  <Image
                    src="/images/breakfast-muffins-pan.jpg"
                    alt="A pan of muffins fresh from the oven"
                    fill
                    sizes="(max-width: 1024px) 46vw, 24vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
              <Reveal y={40} delay={0.1} className="bezel">
                <div className="bezel-core aspect-[3/4]">
                  <Image
                    src="/images/breakfast-toast.jpg"
                    alt="Bagels, toast and juice on the breakfast counter"
                    fill
                    sizes="(max-width: 1024px) 46vw, 24vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* The spread. The menu card beside an asymmetric photo bento. */}
      <section className="bg-mist section">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-6 lg:grid-cols-12 lg:gap-x-12 lg:px-10">
          <div className="lg:col-span-4">
            <SectionHeading
              title={
                <>
                  Help yourself, <em>and find a table</em>
                </>
              }
              intro="It's all set out and ready in the bright breakfast room by seven."
            />
            <BreakfastMenu className="mt-12 max-w-sm" />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-8">
            <Reveal y={40} className="bezel col-span-2">
              <div className="bezel-core aspect-[16/10]">
                <ParallaxImage
                  src="/images/breakfast-room.jpg"
                  alt="The sunny breakfast room with the garden through the windows"
                  sizes="(max-width: 1024px) 94vw, 62vw"
                  travel={5}
                />
              </div>
            </Reveal>
            <Reveal y={40} delay={0.08} className="bezel">
              <div className="bezel-core aspect-[4/3]">
                <Image
                  src="/images/breakfast-buffet.jpg"
                  alt="The breakfast buffet counter with bagels, rolls and the toaster"
                  fill
                  sizes="(max-width: 1024px) 46vw, 30vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal y={40} delay={0.14} className="bezel">
              <div className="bezel-core aspect-[4/3]">
                <Image
                  src="/images/breakfast-fruit-table.jpg"
                  alt="A basket of fresh fruit and pastries on the breakfast table"
                  fill
                  sizes="(max-width: 1024px) 46vw, 30vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The garden kitchen. Photograph first this time, so the page does not
          zigzag the same way twice. */}
      <section className="mx-auto max-w-[1400px] px-6 section lg:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-x-12">
          <div className="order-2 lg:order-1 lg:col-span-6">
            <Reveal y={40} className="bezel">
              <div className="bezel-core aspect-[4/5]">
                <ParallaxImage
                  src="/images/grill-smokers.jpg"
                  alt="The grills and smokers by the picnic tables in the garden"
                  sizes="(max-width: 1024px) 94vw, 46vw"
                  travel={6}
                />
              </div>
            </Reveal>
          </div>
          <div className="order-1 lg:order-2 lg:col-span-5 lg:col-start-8">
            <SectionHeading
              title={
                <>
                  And the rest of the day, <em>the garden kitchen is yours</em>
                </>
              }
              intro="The barbecue area is set up for proper cooking, not just burgers. Gas grills, smokers, a big outdoor stove, lobster pots, plates and utensils. You bring the food, we have everything else."
            />
            <Reveal delay={0.1} className="mt-6 text-muted">
              <p>{site.grillHours}</p>
            </Reveal>
            <Reveal delay={0.12} className="mt-10">
              <TextLink href="/amenities">More about the grounds</TextLink>
            </Reveal>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
