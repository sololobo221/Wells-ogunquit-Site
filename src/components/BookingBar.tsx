"use client";

import { useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { site } from "@/lib/site";

const iso = (d: Date) => d.toISOString().slice(0, 10);
const addDays = (s: string, n: number) => iso(new Date(new Date(s).getTime() + n * 86400000));

/**
 * Adults and children are sent to Cloudbeds separately. A single "Guests"
 * count posted as `adults` inflates the rate under occupancy pricing, because
 * a family of 2 + 2 was being priced as four adults.
 *
 * Cloudbeds reads checkin, checkout, adults and kids as YYYY-MM-DD / integers
 * from window.location on first load.
 *
 * Desktop reads as one segmented search bar; below lg the segments become
 * separate fields with real borders.
 */
export default function BookingBar() {
  const today = iso(new Date());
  const [checkin, setCheckin] = useState(today);
  const [checkout, setCheckout] = useState(addDays(today, 2));
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);

  const nights = Math.max(
    0,
    Math.round((new Date(checkout).getTime() - new Date(checkin).getTime()) / 86400000),
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = new URL(site.bookingUrl);
    url.searchParams.set("checkin", checkin);
    url.searchParams.set("checkout", checkout);
    url.searchParams.set("adults", String(adults));
    url.searchParams.set("kids", String(kids));
    window.open(url.toString(), "_blank", "noopener,noreferrer");
  };

  const segment =
    "relative block cursor-pointer rounded-[var(--radius-control)] border border-line bg-canvas px-4 pb-2.5 pt-3 transition-[background-color,border-color,box-shadow] duration-300 hover:border-ink/25 focus-within:ring-2 focus-within:ring-accent/70 " +
    "lg:rounded-full lg:border-transparent lg:bg-transparent lg:px-6 lg:hover:border-transparent lg:hover:bg-ink/[0.04] lg:focus-within:bg-ink/[0.04]";
  const label = "block text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-faint";
  const input =
    "mt-1 block w-full bg-transparent text-body tabular-nums text-ink outline-none [color-scheme:light] focus-visible:outline-none";
  const divider = "hidden lg:block lg:h-10 lg:w-px lg:bg-line";

  return (
    <form onSubmit={submit} aria-label="Check availability" className="bezel bezel-solid lg:rounded-full">
      <div className="bezel-core grid grid-cols-2 gap-3 p-3 lg:flex lg:items-center lg:gap-0 lg:rounded-full lg:p-2">
        <label className={`${segment} col-span-2 sm:col-span-1 lg:flex-[1.3]`}>
          <span className={label}>Arrive</span>
          <input
            type="date"
            value={checkin}
            min={today}
            onChange={(e) => {
              setCheckin(e.target.value);
              if (e.target.value >= checkout) setCheckout(addDays(e.target.value, 2));
            }}
            className={input}
          />
        </label>

        <span aria-hidden className={divider} />

        <label className={`${segment} col-span-2 sm:col-span-1 lg:flex-[1.3]`}>
          <span className={label}>Depart</span>
          <input
            type="date"
            value={checkout}
            min={addDays(checkin, 1)}
            onChange={(e) => setCheckout(e.target.value)}
            className={input}
          />
        </label>

        <span aria-hidden className={divider} />

        <label className={`${segment} lg:flex-1`}>
          <span className={label}>Adults</span>
          <select
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value))}
            className={`${input} cursor-pointer appearance-none`}
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "adult" : "adults"}
              </option>
            ))}
          </select>
        </label>

        <span aria-hidden className={divider} />

        <label className={`${segment} lg:flex-1`}>
          <span className={label}>Children</span>
          <select
            value={kids}
            onChange={(e) => setKids(Number(e.target.value))}
            className={`${input} cursor-pointer appearance-none`}
          >
            {[0, 1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n === 0 ? "None" : `${n} ${n === 1 ? "child" : "children"}`}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          className="group col-span-2 inline-flex h-14 items-center justify-between gap-3 whitespace-nowrap rounded-full bg-accent pl-6 pr-2 text-body font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_10px_24px_-12px_rgba(177,56,40,0.7)] transition-[background-color,transform] duration-500 ease-[var(--ease-glide)] hover:bg-accent-deep active:scale-[0.98] lg:ml-2 lg:h-[3.75rem] lg:pl-7"
        >
          {nights > 0 ? `See ${nights} night${nights > 1 ? "s" : ""}` : "See dates"}
          <span
            aria-hidden
            className="grid h-10 w-10 place-items-center rounded-full bg-white/15 transition-transform duration-500 ease-[var(--ease-glide)] group-hover:-translate-y-px group-hover:translate-x-0.5 group-hover:scale-105 lg:h-11 lg:w-11"
          >
            <ArrowUpRight size={15} weight="bold" />
          </span>
        </button>
      </div>
    </form>
  );
}
