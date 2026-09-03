import type { Metadata } from "next";
import { site } from "@/lib/site";
import { rooms } from "@/lib/rooms";
import { isCloudbedsActive } from "@/lib/cloudbeds/config";
import BookingForm from "@/components/BookingForm";

export const metadata: Metadata = {
  title: "Book your stay",
  description:
    "Reserve your room at Wells-Ogunquit Resort. Choose your dates, tell us who's coming, and pay securely to confirm your stay on the Southern Maine coast.",
};

const perks = [
  ["Best available rate", "Booked direct, with no third party in the middle."],
  ["Free changes", site.cancellation],
  ["Free breakfast", "Served in the breakfast room, 7 to 9:30 every morning."],
  ["The pool and the grills", "Heated saltwater pool and the outdoor kitchen, all included."],
];

const toCount = (value: string | undefined, min: number): number | undefined => {
  if (value === undefined) return undefined;
  const n = Number(value);
  return Number.isInteger(n) && n >= min ? n : undefined;
};

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{
    checkIn?: string;
    checkOut?: string;
    adults?: string;
    children?: string;
  }>;
}) {
  const sp = await searchParams;
  const bookable = rooms
    .filter((r) => r.cloudbedsRoomTypeID)
    .map((r) => ({ name: r.name, roomTypeID: r.cloudbedsRoomTypeID as string }));
  const canBook = isCloudbedsActive && bookable.length > 0;

  const fallbackUrl = new URL(site.bookingUrl);
  if (sp.checkIn) fallbackUrl.searchParams.set("checkin", sp.checkIn);
  if (sp.checkOut) fallbackUrl.searchParams.set("checkout", sp.checkOut);
  if (sp.adults) fallbackUrl.searchParams.set("adults", sp.adults);
  if (sp.children) fallbackUrl.searchParams.set("kids", sp.children);

  return (
    <section className="mx-auto max-w-[1400px] px-6 pb-28 pt-28 lg:px-10 lg:pb-24 lg:pt-40">
      <div className="max-w-[46ch]">
        <span className="eyebrow">Reserve your stay</span>
        <h1 className="text-h2">Book direct with us</h1>
        <p className="mt-6 text-lead text-muted">
          The best available rate, free changes up to 48 hours before you arrive, and you are
          dealing with the family who run the place.
        </p>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-x-12">
        {/* Form leads on mobile; sits to the right on desktop. */}
        <div className="order-1 lg:order-2 lg:col-span-7">
          {canBook ? (
            <BookingForm
              rooms={bookable}
              initial={{
                checkIn: sp.checkIn,
                checkOut: sp.checkOut,
                adults: toCount(sp.adults, 1),
                children: toCount(sp.children, 0),
              }}
            />
          ) : (
            <div className="rounded-[var(--radius-card)] bg-surface p-6 shadow-lift sm:p-8">
              <h2 className="font-display text-h3 leading-tight">Reserve your room</h2>
              <p className="mt-4 text-small text-muted">
                Check live availability and current rates for every room type on our secure booking
                page, or call and we will set it up with you over the phone.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={fallbackUrl.toString()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-[var(--radius-control)] bg-accent px-6 text-small font-medium text-white transition-[background-color,transform] duration-200 hover:bg-accent-deep active:translate-y-px"
                >
                  Reserve on our secure page
                </a>
                <a
                  href={site.phones.tollFreeHref}
                  className="inline-flex h-12 items-center justify-center rounded-[var(--radius-control)] border border-ink/20 px-6 text-small tabular-nums text-ink transition-colors duration-200 hover:border-ink/40"
                >
                  Call {site.phones.tollFree}
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Reassurance: below the form on mobile, left column on desktop. */}
        <div className="order-2 lg:order-1 lg:col-span-5">
          <dl className="border-t border-line">
            {perks.map(([term, detail]) => (
              <div key={term} className="border-b border-line py-4">
                <dt className="font-display text-lead leading-tight text-navy">{term}</dt>
                <dd className="mt-1 text-small text-muted">{detail}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-7 text-small text-faint">
            Prefer to talk it through? Call{" "}
            <a
              href={site.phones.tollFreeHref}
              className="tabular-nums text-navy underline decoration-navy/30 underline-offset-4 transition-colors duration-200 hover:text-ink"
            >
              {site.phones.tollFree}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
