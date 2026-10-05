import type { Metadata } from "next";
import { CalendarCheck, Coffee, SwimmingPool, Tag } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/site";
import { rooms } from "@/lib/rooms";
import { isCloudbedsActive } from "@/lib/cloudbeds/config";
import BookingForm from "@/components/BookingForm";
import BookNow from "@/components/BookNow";

export const metadata: Metadata = {
  title: "Book your stay",
  description:
    "Reserve your room at Wells-Ogunquit Resort. Choose your dates, tell us who's coming, and pay securely to confirm your stay on the Southern Maine coast.",
};

const perks = [
  {
    icon: Tag,
    term: "Best available rate",
    detail: "Booked direct, with no third party in the middle.",
  },
  { icon: CalendarCheck, term: "Free changes", detail: site.cancellation },
  {
    icon: Coffee,
    term: "Free breakfast",
    detail: "Served in the breakfast room, 7 to 9:30 every morning.",
  },
  {
    icon: SwimmingPool,
    term: "The pool and the grills",
    detail: "Heated saltwater pool and the outdoor kitchen, all included.",
  },
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
    <section className="container-site pb-28 pt-32 lg:pb-[var(--section-y)] lg:pt-44">
      <div className="max-w-[52ch]">
        <span className="kicker animate-rise">Reserve your stay</span>
        <h1 className="animate-rise text-h1" style={{ animationDelay: "80ms" }}>
          Book direct with us
        </h1>
        <p className="animate-rise mt-7 text-lead text-muted" style={{ animationDelay: "160ms" }}>
          The best available rate, free changes up to 48 hours before you arrive, and you are
          dealing with the family who run the place.
        </p>
      </div>

      <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-x-12">
        {/* Form leads on mobile; sits to the right on desktop. */}
        <div
          className="animate-rise order-1 lg:order-2 lg:col-span-7"
          style={{ animationDelay: "220ms" }}
        >
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
            <div className="border border-line bg-surface">
              <div className="p-7 sm:p-10">
                <h2 className="text-h3">Reserve your room</h2>
                <p className="mt-4 max-w-[52ch] text-body text-muted">
                  Check live availability and current rates for every room type on our secure
                  booking page, or call and we will set it up with you over the phone.
                </p>
                <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-6">
                  <BookNow
                    size="lg"
                    label="Check availability"
                    href={fallbackUrl.toString()}
                    external
                  />
                  <a
                    href={site.phones.tollFreeHref}
                    className="text-small tabular-nums text-muted underline decoration-ink/25 underline-offset-[6px] transition-colors duration-200 hover:text-ink hover:decoration-ink"
                  >
                    or call {site.phones.tollFree}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Reassurance: below the form on mobile, left column on desktop. */}
        <div className="order-2 lg:order-1 lg:col-span-5">
          <dl className="border-t border-ink/15">
            {perks.map(({ icon: Glyph, term, detail }) => (
              <div key={term} className="flex gap-5 border-b border-ink/15 py-6">
                <Glyph size={26} weight="light" className="mt-0.5 shrink-0 text-accent" aria-hidden />
                <div>
                  <dt className="font-display text-h4">{term}</dt>
                  <dd className="mt-1.5 max-w-[40ch] text-small text-muted">{detail}</dd>
                </div>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-small text-muted">
            Prefer to talk it through? Call{" "}
            <a
              href={site.phones.tollFreeHref}
              className="tabular-nums text-ink underline decoration-ink/30 underline-offset-4 transition-colors duration-200 hover:decoration-ink"
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
