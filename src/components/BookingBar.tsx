"use client";

import { useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { site } from "@/lib/site";

const iso = (d: Date) => d.toISOString().slice(0, 10);
const addDays = (s: string, n: number) => iso(new Date(new Date(s).getTime() + n * 86400000));

export default function BookingBar() {
  const today = iso(new Date());
  const [checkin, setCheckin] = useState(today);
  const [checkout, setCheckout] = useState(addDays(today, 2));
  const [guests, setGuests] = useState(2);

  const nights = Math.max(
    0,
    Math.round((new Date(checkout).getTime() - new Date(checkin).getTime()) / 86400000),
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = new URL(site.bookingUrl);
    url.searchParams.set("checkin", checkin);
    url.searchParams.set("checkout", checkout);
    url.searchParams.set("adults", String(guests));
    window.open(url.toString(), "_blank", "noopener,noreferrer");
  };

  const lbl = "mb-2 block text-[10px] uppercase tracking-[0.14em] text-faint";
  const inp =
    "w-full rounded-[var(--radius-control)] border border-line bg-surface px-3.5 py-2.5 text-[0.88rem] text-ink outline-none transition-colors duration-200 tabular-nums focus:border-navy";

  return (
    <form
      onSubmit={submit}
      className="grid grid-cols-2 gap-4 rounded-[var(--radius-card)] border border-line bg-surface p-5 sm:grid-cols-4 sm:items-end lg:p-6"
    >
      <div>
        <label htmlFor="arrive" className={lbl}>
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
          className={inp}
        />
      </div>

      <div>
        <label htmlFor="depart" className={lbl}>
          Depart
        </label>
        <input
          id="depart"
          type="date"
          value={checkout}
          min={addDays(checkin, 1)}
          onChange={(e) => setCheckout(e.target.value)}
          className={inp}
        />
      </div>

      <div>
        <label htmlFor="guests" className={lbl}>
          Guests
        </label>
        <select
          id="guests"
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className={inp}
        >
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "guest" : "guests"}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="group col-span-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-control)] bg-ink px-5 py-3 text-[0.88rem] font-medium text-white transition-all duration-200 hover:bg-ink-2 active:scale-[0.98] sm:col-span-1"
      >
        {nights > 0 ? `See ${nights} night${nights > 1 ? "s" : ""}` : "See dates"}
        <ArrowUpRight
          size={14}
          weight="bold"
          className="transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
        />
      </button>
    </form>
  );
}
