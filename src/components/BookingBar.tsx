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

  const label = "mb-2 block text-eyebrow uppercase tracking-[0.16em] text-faint";
  const field =
    "h-12 w-full rounded-[var(--radius-control)] border border-line bg-canvas px-3.5 text-small text-ink outline-none transition-colors duration-200 tabular-nums hover:border-ink/25 focus:border-accent";

  return (
    <form
      onSubmit={submit}
      className="rounded-[var(--radius-card)] bg-surface p-5 shadow-lift lg:p-6"
    >
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-[1fr_1fr_auto_auto_auto] lg:items-end lg:gap-3">
        <div>
          <label htmlFor="arrive" className={label}>
            Arrive
          </label>
          <input
            id="arrive"
            type="date"
            value={checkin}
            min={today}
            onChange={(e) => {
              setCheckin(e.target.value);
              if (e.target.value >= checkout) setCheckout(addDays(e.target.value, 2));
            }}
            className={field}
          />
        </div>

        <div>
          <label htmlFor="depart" className={label}>
            Depart
          </label>
          <input
            id="depart"
            type="date"
            value={checkout}
            min={addDays(checkin, 1)}
            onChange={(e) => setCheckout(e.target.value)}
            className={field}
          />
        </div>

        <div>
          <label htmlFor="adults" className={label}>
            Adults
          </label>
          <select
            id="adults"
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value))}
            className={`${field} lg:w-24`}
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="kids" className={label}>
            Children
          </label>
          <select
            id="kids"
            value={kids}
            onChange={(e) => setKids(Number(e.target.value))}
            className={`${field} lg:w-24`}
          >
            {[0, 1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="group col-span-2 inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-control)] bg-accent px-6 text-small font-medium text-white transition-[background-color,transform] duration-200 ease-[var(--ease-out)] hover:bg-accent-deep active:translate-y-px lg:col-span-1"
        >
          {nights > 0 ? `See ${nights} night${nights > 1 ? "s" : ""}` : "See dates"}
          <ArrowUpRight
            size={15}
            weight="bold"
            className="transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </button>
      </div>
    </form>
  );
}
