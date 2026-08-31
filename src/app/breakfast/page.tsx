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
    "A friendly grab and go breakfast served daily from 7 to 10, free to every guest. Fresh coffee, tea, hot chocolate, muffins, pastries and yogurt.",
};

export default function BreakfastPage() {
  return (
    <>
      <PageHero
        image="/images/breakfast-mugs.jpg"
        imageAlt="Mugs of coffee and pastry laid out in the morning"
        title="Breakfast is on us"
        intro="Say good morning, grab a coffee and something to eat, and take it wherever you like."
      />

      <section className="mx-auto max-w-[1400px] px-6 section lg:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-5">
            <SectionHeading
              label="Served 7:00 to 10:00"
              title="Fresh coffee and something made that morning"
              intro="Muffins, pastries and yogurt, with plenty of coffee, tea and hot chocolate. Free to every guest, every morning you're here."
            />
            <Reveal delay={0.1} className="mt-7 space-y-5 text-muted">
              <p>
                Eat at the picnic tables with the family, take it back to the patio outside your
                door, or carry it down to the beach.
              </p>
              <p>{site.breakfastHours} Available to all motel studio and suite guests.</p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-3 sm:grid-cols-2">
              <Reveal className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-canvas sm:mt-12">
                <Image
                  src="/images/breakfast-muffins.jpg"
                  alt="Muffins and pastries set out for the morning"
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
                  src="/images/breakfast-pans.jpeg"
                  alt="Trays of freshly baked muffins"
                  fill
                  sizes="(max-width: 640px) 100vw, 29vw"
                  className="object-cover"
                />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Full width band */}
      <section className="relative overflow-hidden border-y border-line">
        <Image
          src="/images/band-picnic.jpg"
          alt="Picnic tables and gas grills in the garden"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/80" />
        <div className="relative mx-auto max-w-[1400px] px-6 section lg:px-10">
          <Reveal className="max-w-2xl">
            <h2 className="text-h2">
              And the rest of the day, the garden kitchen is yours
            </h2>
            <p className="mt-5 text-white/80">
              The barbecue area is set up for proper cooking, not just burgers. Gas grills, a big
              outside stove, lobster pots, plates and utensils. You bring the food, we have
              everything else.
            </p>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
