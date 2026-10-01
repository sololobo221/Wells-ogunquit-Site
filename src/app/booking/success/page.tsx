import type { Metadata } from "next";
import { site } from "@/lib/site";
import TextLink from "@/components/TextLink";

export const metadata: Metadata = {
  title: "Booking confirmed",
  description:
    "Your reservation with Wells-Ogunquit Resort has been received. Your confirmation is on its way by email.",
};

export default async function BookingSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ resId?: string; status?: string }>;
}) {
  const { resId, status } = await searchParams;
  const confirmed = status === "confirmed";

  return (
    <section className="mx-auto max-w-[1400px] px-6 pb-[var(--section-y)] pt-32 lg:px-10 lg:pt-44">
      <div className="measure">
        <span className="eyebrow">
          {confirmed ? "Reservation confirmed" : "Reservation received"}
        </span>
        <h1 className="animate-rise text-h1">
          {confirmed ? "You're all set" : "We're finalizing your reservation"}
        </h1>
        <p className="mt-6 text-lead text-muted">
          {confirmed
            ? `Thanks for booking with ${site.shortName}. Your confirmation is on its way by email, and we'll see you on the coast.`
            : `Thanks for booking with ${site.shortName}. We're confirming the details now, and your confirmation will follow by email.`}
        </p>

        {resId ? (
          <dl className="bezel mt-12 w-fit min-w-[18rem]">
            <div className="bezel-core px-7 py-6">
              <dt className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-faint">
                Reservation reference
              </dt>
              <dd className="mt-2 font-display text-h3 tabular-nums text-ink">{resId}</dd>
            </div>
          </dl>
        ) : null}

        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3">
          <TextLink href="/">Back to the home page</TextLink>
          <TextLink href="/contact">Questions? Contact us</TextLink>
        </div>
      </div>
    </section>
  );
}
