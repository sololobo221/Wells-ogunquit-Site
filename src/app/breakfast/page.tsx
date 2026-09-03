import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Breakfast",
  description:
    "A fresh continental breakfast served in our sunny breakfast room every morning from 7 to 9:30, free to every guest. Muffins baked that morning, bagels, fresh fruit, yogurt, and plenty of coffee, tea and hot chocolate.",
};

const spread = [
  {
    src: "/images/breakfast-buffet.jpg",
    alt: "The breakfast buffet counter with bagels, rolls and the toaster",
  },
  {
    src: "/images/breakfast-fruit-table.jpg",
    alt: "A basket of fresh fruit and pastries on the breakfast table",
  },
  {
    src: "/images/breakfast-room.jpg",
    alt: "The sunny breakfast room with the garden through the windows",
  },
];

export default function BreakfastPage() {
  return (
    <>
      <PageHero
        image="/images/breakfast-mugs.jpg"
        imageAlt="Coffee and something fresh from the oven, set out for the morning"
        title="Breakfast is on us"
        intro="Fresh coffee, something warm from the oven, and a sunny room to sit and enjoy it, every morning you're here."
      />

      <section className="mx-auto max-w-[1400px] px-6 section lg:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-5">
            <SectionHeading
              label="Served 7:00 to 9:30"
              title="Fresh coffee and something baked that morning"
              intro="Muffins from the oven, bagels and toast, fresh fruit and yogurt, with plenty of coffee, tea and hot chocolate. Free to every guest, every morning you're here."
            />
            <Reveal delay={0.1} className="mt-7 space-y-5 text-muted">
              <p>
                A proper sit-down spread, not a grab-and-go bag. Settle in at a table in the
                breakfast room, with the garden and the pool just outside the windows.
              </p>
              <p>{site.breakfastHours} Available to all motel studio and suite guests.</p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-3 sm:grid-cols-2">
              <Reveal className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-canvas sm:mt-12">
                <Image
                  src="/images/breakfast-muffins-pan.jpg"
                  alt="A pan of muffins fresh from the oven"
                  fill
                  sizes="(max-width: 640px) 100vw, 29vw"
                  className="object-cover"
                />
              </Reveal>
              <Reveal
                delay={0.1}
                className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-canvas"
              >
                <Image
                  src="/images/breakfast-toast.jpg"
                  alt="Bagels, toast and juice on the breakfast counter"
                  fill
                  sizes="(max-width: 640px) 100vw, 29vw"
                  className="object-cover"
                />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* The spread */}
      <section className="bg-sand section">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionHeading
            label="Every morning"
            title="Help yourself, and find a table"
            intro="It's all set out and ready in the bright breakfast room by seven."
          />
          <div className="mt-14 grid gap-3 sm:grid-cols-3">
            {spread.map((img, i) => (
              <Reveal
                key={img.src}
                delay={i * 0.08}
                className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-canvas"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 30vw"
                  className="object-cover"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Full width band */}
      <section className="relative overflow-hidden border-y border-line">
        <Image
          src="/images/band-picnic.jpg"
          alt="Picnic tables and grills in the garden"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/80" />
        <div className="relative mx-auto max-w-[1400px] px-6 section lg:px-10">
          <Reveal className="max-w-2xl">
            <h2 className="text-h2">And the rest of the day, the garden kitchen is yours</h2>
            <p className="mt-5 text-white/80">
              The barbecue area is set up for proper cooking, not just burgers. Gas grills, smokers,
              a big outdoor stove, lobster pots, plates and utensils. You bring the food, we have
              everything else.
            </p>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
