import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Interior page hero. The photograph sits in a rounded frame inset from the
 * viewport edge, the same frame the home hero uses, so every page opens the
 * same way. Title and intro rise in on load.
 */
export default function PageHero({
  image,
  imageAlt,
  title,
  intro,
}: {
  image: string;
  imageAlt: string;
  title: ReactNode;
  intro?: string;
}) {
  return (
    <section className="px-2 pt-2 sm:px-3 sm:pt-3">
      <div className="relative flex min-h-[64dvh] items-end overflow-hidden rounded-[var(--radius-frame)] bg-atlantic lg:min-h-[72dvh]">
        <div className="animate-hero-settle absolute inset-0">
          <Image src={image} alt={imageAlt} fill preload sizes="100vw" className="object-cover" />
        </div>
        <div className="hero-wash absolute inset-0" />
        <div className="relative mx-auto w-full max-w-[1400px] px-6 pb-20 pt-32 sm:px-8 lg:px-10 lg:pb-28">
          <h1 className="animate-rise max-w-[15ch] text-h1 !text-white">{title}</h1>
          {intro && (
            <p
              className="animate-rise measure mt-7 text-lead text-white/85"
              style={{ animationDelay: "120ms" }}
            >
              {intro}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
