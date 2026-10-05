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
    <div className="relative flex aspect-[4/3] w-full flex-col items-center justify-center gap-7 bg-sand px-6 text-center sm:aspect-[21/9]">
      <span className="text-accent">
        <MapPin size={40} weight="light" aria-hidden />
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
          className="caps inline-flex h-12 items-center gap-2.5 bg-ink px-7 text-canvas transition-colors duration-300 hover:bg-accent"
        >
          <NavigationArrow size={16} weight="fill" aria-hidden />
          Get directions
        </a>
        <button
          type="button"
          onClick={() => setShow(true)}
          className="caps inline-flex h-12 items-center gap-2.5 border border-ink/70 px-7 text-ink transition-colors duration-300 hover:bg-ink hover:text-canvas"
        >
          <MapTrifold size={16} aria-hidden />
          Show the map here
        </button>
      </div>
    </div>
  );
}
