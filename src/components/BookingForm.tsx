"use client";

import { useState, useTransition } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { initiatePayByLink, type PayByLinkInput } from "@/app/actions/initiatePayByLink";

type BookableRoom = { name: string; roomTypeID: string };

type Initial = {
  checkIn?: string;
  checkOut?: string;
  adults?: number;
  children?: number;
  roomTypeID?: string;
};

type FieldError = "firstName" | "lastName" | "email" | "phone" | "checkOut" | "roomTypeID";
type Errors = Partial<Record<FieldError, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const iso = (d: Date) => d.toISOString().slice(0, 10);
const addDays = (s: string, n: number) => iso(new Date(new Date(s).getTime() + n * 86400000));

export default function BookingForm({
  rooms,
  initial = {},
}: {
  rooms: BookableRoom[];
  initial?: Initial;
}) {
  const today = iso(new Date());
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [checkIn, setCheckIn] = useState(initial.checkIn ?? today);
  const [checkOut, setCheckOut] = useState(
    initial.checkOut ?? addDays(initial.checkIn ?? today, 2),
  );
  const [roomTypeID, setRoomTypeID] = useState(initial.roomTypeID ?? rooms[0]?.roomTypeID ?? "");
  const [adults, setAdults] = useState(initial.adults ?? 2);
  const [children, setChildren] = useState(initial.children ?? 0);
  const [promoCode, setPromoCode] = useState("");
  const [notes, setNotes] = useState("");

  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const nights = Math.max(
    0,
    Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000),
  );
  const stay = nights > 0 ? `${nights} night${nights > 1 ? "s" : ""}` : null;

  const validate = (): Errors => {
    const next: Errors = {};
    if (!firstName.trim()) next.firstName = "Required";
    if (!lastName.trim()) next.lastName = "Required";
    if (!EMAIL_RE.test(email.trim())) next.email = "Enter a valid email address";
    if (!phone.trim()) next.phone = "Required";
    if (nights < 1) next.checkOut = "Check-out must be after check-in";
    if (!roomTypeID) next.roomTypeID = "Choose a room";
    return next;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setFormError(null);

    const input: PayByLinkInput = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      checkIn,
      checkOut,
      roomTypeID,
      adults,
      children,
      promoCode: promoCode.trim() || undefined,
      notes: notes.trim() || undefined,
    };

    startTransition(async () => {
      const result = await initiatePayByLink(input);
      // A successful reservation redirects to the payment page inside the action;
      // we only get a value back on the failure paths.
      if (result && result.success === false) {
        setFormError(result.error);
      }
    });
  };

  const label = "mb-2 block text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-faint";
  const field =
    "h-12 w-full px-4 rounded-[var(--radius-control)] border border-line bg-canvas text-base text-ink outline-none transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-faint hover:border-ink/25 focus:border-ink/40 focus:bg-surface focus:shadow-[0_0_0_4px_rgba(177,56,40,0.12)] sm:text-small";
  const err = "mt-1.5 text-micro text-accent";

  return (
    <form onSubmit={submit} noValidate className="bezel bezel-solid">
      <div className="bezel-core p-5 sm:p-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="arrive" className={label}>
              Arrive
            </label>
            <input
              id="arrive"
              type="date"
              value={checkIn}
              min={today}
              onChange={(e) => {
                setCheckIn(e.target.value);
                if (e.target.value >= checkOut) setCheckOut(addDays(e.target.value, 2));
              }}
              className={`${field} tabular-nums`}
            />
          </div>
          <div>
            <label htmlFor="depart" className={label}>
              Depart
            </label>
            <input
              id="depart"
              type="date"
              value={checkOut}
              min={addDays(checkIn, 1)}
              onChange={(e) => setCheckOut(e.target.value)}
              className={`${field} tabular-nums`}
            />
            {errors.checkOut && <p className={err}>{errors.checkOut}</p>}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="adults" className={label}>
              Adults
            </label>
            <select
              id="adults"
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              className={`${field} tabular-nums`}
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="children" className={label}>
              Children
            </label>
            <select
              id="children"
              value={children}
              onChange={(e) => setChildren(Number(e.target.value))}
              className={`${field} tabular-nums`}
            >
              {[0, 1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="room" className={label}>
            Room
          </label>
          <select
            id="room"
            value={roomTypeID}
            onChange={(e) => setRoomTypeID(e.target.value)}
            className={field}
          >
            {rooms.map((r) => (
              <option key={r.roomTypeID} value={r.roomTypeID}>
                {r.name}
              </option>
            ))}
          </select>
          {errors.roomTypeID && <p className={err}>{errors.roomTypeID}</p>}
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className={label}>
              First name
            </label>
            <input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              autoComplete="given-name"
              className={field}
              placeholder="First name"
            />
            {errors.firstName && <p className={err}>{errors.firstName}</p>}
          </div>
          <div>
            <label htmlFor="lastName" className={label}>
              Last name
            </label>
            <input
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              autoComplete="family-name"
              className={field}
              placeholder="Last name"
            />
            {errors.lastName && <p className={err}>{errors.lastName}</p>}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className={label}>
              Email
            </label>
            <input
              id="email"
              type="email"
              inputMode="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className={field}
              placeholder="you@example.com"
            />
            {errors.email && <p className={err}>{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="phone" className={label}>
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              inputMode="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
              className={field}
              placeholder="Phone number"
            />
            {errors.phone && <p className={err}>{errors.phone}</p>}
          </div>
        </div>

        <details className="mt-4 border-t border-line pt-4">
          <summary className="cursor-pointer text-small font-medium text-navy transition-colors duration-200 hover:text-ink">
            Add a promo code or a note
          </summary>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="promo" className={label}>
                Promo code
              </label>
              <input
                id="promo"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className={field}
                placeholder="Optional"
              />
            </div>
            <div>
              <label htmlFor="notes" className={label}>
                Anything we should know
              </label>
              <textarea
                id="notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full resize-y px-4 py-3 rounded-[var(--radius-control)] border border-line bg-canvas text-base text-ink outline-none transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-faint hover:border-ink/25 focus:border-ink/40 focus:bg-surface focus:shadow-[0_0_0_4px_rgba(177,56,40,0.12)] sm:text-small"
                placeholder="Arrival time, a request, a question"
              />
            </div>
          </div>
        </details>

        {formError && (
          <p
            role="alert"
            className="mt-5 rounded-[var(--radius-control)] border border-accent/30 bg-accent/5 px-4 py-3 text-small text-accent"
          >
            {formError}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="group mt-7 inline-flex h-14 w-full items-center justify-between gap-3 rounded-full bg-accent pl-6 pr-2 text-body font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_10px_24px_-12px_rgba(177,56,40,0.7)] transition-[background-color,transform,opacity] duration-500 ease-[var(--ease-glide)] hover:bg-accent-deep active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:pl-7"
        >
          {pending ? "Setting up payment…" : stay ? `Reserve ${stay} and pay` : "Reserve and pay"}
          <span
            aria-hidden
            className="grid h-10 w-10 place-items-center rounded-full bg-white/15 transition-transform duration-500 ease-[var(--ease-glide)] group-hover:-translate-y-px group-hover:translate-x-0.5 group-hover:scale-105"
          >
            {pending ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white motion-reduce:animate-none" />
            ) : (
              <ArrowUpRight size={15} weight="bold" />
            )}
          </span>
        </button>

        <p className="mt-5 text-micro text-faint">
          Next you&apos;ll pay on a secure Cloudbeds page to confirm the room. Free to change or
          cancel up to 48 hours before you arrive.
        </p>
      </div>
    </form>
  );
}
