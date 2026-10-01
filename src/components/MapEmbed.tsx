"use client";

import { useState } from "react";
import { MapPin, MapTrifold, NavigationArrow } from "@phosphor-icons/react";
import { site } from "@/lib/site";

const embed = `https://www.google.com/maps?q=${site.geo.lat},${site.geo.lng}&hl=en&z=15&output=embed`;
const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.address.full)}`;

/**
 * The Google map, behind a one-tap facade. The embed pulls in close to a
 * megabyte of Google's scripts and sets their cookies, so it only loads when
 * someone asks for it. Directions open straight in Google Maps, which on a
 * phone is what people want anyway.
 */
export default function MapEmbed() {
  const [show, setShow] = useState(false);

  if (show) {
    return (
      <iframe
        src={embed}
        title={`Map showing ${site.name}`}
        referrerPolicy="no-referrer-when-downgrade"
        className="block aspect-[4/3] w-full border-0 sm:aspect-[21/9]"
      />
    );
  }

  return (
    <div className="relative flex aspect-[4/3] w-full flex-col items-center justify-center gap-7 bg-[radial-gradient(circle_at_50%_45%,var(--color-surface),var(--color-mist)_70%)] px-6 text-center sm:aspect-[21/9]">
      <span className="grid h-16 w-16 place-items-center rounded-full bg-accent text-white shadow-[0_14px_30px_-12px_rgba(177,56,40,0.7)]">
        <MapPin size={28} weight="fill" aria-hidden />
      </span>
      <div>
        <p className="font-display text-h3">{site.address.street}</p>
        <p className="mt-1 text-small text-muted">
          {site.address.city}, {site.address.state} {site.address.zip}
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <a
          href={directions}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center gap-2.5 rounded-full bg-ink px-6 text-small font-medium text-canvas transition-[background-color,transform] duration-300 hover:bg-navy active:scale-[0.98]"
        >
          <NavigationArrow size={16} weight="fill" aria-hidden />
          Get directions
        </a>
        <button
          type="button"
          onClick={() => setShow(true)}
          className="inline-flex h-12 items-center gap-2.5 rounded-full px-6 text-small font-medium text-ink ring-1 ring-inset ring-ink/20 transition-[box-shadow,background-color,transform] duration-300 hover:bg-ink/[0.04] hover:ring-ink/45 active:scale-[0.98]"
        >
          <MapTrifold size={16} aria-hidden />
          Show the map here
        </button>
      </div>
    </div>
  );
}
