import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Interior page opening: one photograph, edge to edge, with the page title
 * set low on it. The header sits clear over the top until the page moves.
 */
export default function PageHero({
  image,
  imageAlt,
  label,
  title,
  intro,
  position = "center",
}: {
  image: string;
  imageAlt: string;
  label?: string;
  title: ReactNode;
  intro?: string;
  /** object-position for the photograph, when the subject is off centre. */
  position?: string;
}) {
  return (
    <section className="relative flex min-h-[68svh] items-end overflow-hidden bg-harbor lg:min-h-[76svh]">
      <Image
        src={image}
        alt={imageAlt}
        fill
        preload
        sizes="100vw"
        className="animate-fade object-cover"
        style={{ objectPosition: position }}
      />
      <div className="photo-shade absolute inset-0" />
      <div className="container-site relative pb-14 pt-36 lg:pb-20">
        {label && <span className="kicker animate-rise !text-white/85">{label}</span>}
        <h1 className="animate-rise max-w-[16ch] text-h1 !text-white">{title}</h1>
        {intro && (
          <p
            className="animate-rise measure mt-6 text-lead text-white/85"
            style={{ animationDelay: "100ms" }}
          >
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
