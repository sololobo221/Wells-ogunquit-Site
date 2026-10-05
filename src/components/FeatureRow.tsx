import Image from "next/image";
import type { ReactNode } from "react";
import Reveal from "./Reveal";

/**
 * One feature of the place: a large photograph on one side, the words on the
 * other, and optionally a smaller second photograph tucked under the words.
 * Alternate `flip` down a page for the zig-zag every hotel site uses.
 */
export default function FeatureRow({
  image,
  alt,
  second,
  label,
  title,
  children,
  actions,
  flip = false,
  aspect = "aspect-[4/3]",
  sizes = "(max-width: 1024px) 100vw, 58vw",
}: {
  image: string;
  alt: string;
  second?: { src: string; alt: string };
  label?: string;
  title: ReactNode;
  children: ReactNode;
  actions?: ReactNode;
  flip?: boolean;
  aspect?: string;
  sizes?: string;
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-x-16">
      <Reveal className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        <div className={`relative overflow-hidden bg-sand ${aspect}`}>
          <Image src={image} alt={alt} fill sizes={sizes} className="object-cover" />
        </div>
      </Reveal>

      <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <Reveal delay={0.06}>
          {label && <span className="kicker">{label}</span>}
          <h2 className="max-w-[16ch] text-h2">{title}</h2>
          <div className="mt-6 max-w-[46ch] space-y-4 text-body text-muted">{children}</div>
          {actions && <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">{actions}</div>}
        </Reveal>
        {second && (
          <Reveal delay={0.12} className="mt-12 hidden w-[62%] lg:block">
            <div className="relative aspect-[4/3] overflow-hidden bg-sand">
              <Image src={second.src} alt={second.alt} fill sizes="22vw" className="object-cover" />
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );
}
