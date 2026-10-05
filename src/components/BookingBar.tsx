"use client";

import { useState } from "react";
import { site } from "@/lib/site";

const iso = (d: Date) => d.toISOString().slice(0, 10);
const addDays = (s: string, n: number) => iso(new Date(new Date(s).getTime() + n * 86400000));

/**
 * The availability strip that sits under the hero on every good hotel site:
 * arrive, depart, adults, children, one button.
 *
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

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = new URL(site.bookingUrl);
    url.searchParams.set("checkin", checkin);
    url.searchParams.set("checkout", checkout);
    url.searchParams.set("adults", String(adults));
    url.searchParams.set("kids", String(kids));
    window.open(url.toString(), "_blank", "noopener,noreferrer");
  };

  const cell =
    "group relative block cursor-pointer border-line px-5 py-3.5 transition-colors duration-200 hover:bg-canvas focus-within:bg-canvas lg:px-7 lg:py-5";
  const label = "caps block text-[0.6875rem] text-faint";
  const input =
    "mt-1.5 block w-full cursor-pointer bg-transparent text-body tabular-nums text-ink outline-none [color-scheme:light]";

  return (
    <form
      onSubmit={submit}
      aria-label="Check availability"
      className="border-b border-line bg-surface"
    >
      <div className="container-site !px-0 lg:!px-12">
        <div className="grid grid-cols-2 lg:grid-cols-[1.25fr_1.25fr_1fr_1fr_auto] lg:border-x lg:border-line">
          <label className={`${cell} border-b border-r lg:border-b-0`}>
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

          <label className={`${cell} border-b lg:border-b-0 lg:border-r`}>
            <span className={label}>Depart</span>
            <input
              type="date"
              value={checkout}
              min={addDays(checkin, 1)}
              onChange={(e) => setCheckout(e.target.value)}
              className={input}
            />
          </label>

          <label className={`${cell} border-r`}>
            <span className={label}>Adults</span>
            <select
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              className={`${input} appearance-none`}
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "adult" : "adults"}
                </option>
              ))}
            </select>
          </label>

          <label className={`${cell} lg:border-r`}>
            <span className={label}>Children</span>
            <select
              value={kids}
              onChange={(e) => setKids(Number(e.target.value))}
              className={`${input} appearance-none`}
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
            className="caps col-span-2 flex h-14 items-center justify-center bg-accent px-10 text-white transition-colors duration-300 hover:bg-accent-deep active:translate-y-px lg:col-span-1 lg:h-auto"
          >
            Check availability
          </button>
        </div>
      </div>
    </form>
  );
}
