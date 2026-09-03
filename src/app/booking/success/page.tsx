import type { Metadata } from "next";
import { site } from "@/lib/site";
import TextLink from "@/components/TextLink";

export const metadata: Metadata = {
  title: "Booking confirmed",
  description:
    "Your reservation with Wells-Ogunquit Resort has been received. We look forward to welcoming you to the Southern Maine coast.",
};

export default async function BookingSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ resId?: string; status?: string }>;
}) {
  const { resId, status } = await searchParams;
  const confirmed = status === "confirmed";

  return (
    <section className="mx-auto max-w-[1400px] px-6 pb-24 pt-28 lg:px-10 lg:pt-40">
      <div className="measure">
        <span className="eyebrow">
          {confirmed ? "Reservation confirmed" : "Reservation received"}
        </span>
        <h1 className="text-h2">
          {confirmed ? "You're all set" : "We're finalizing your reservation"}
        </h1>
        <p className="mt-6 text-lead text-muted">
          {confirmed
            ? `Thank you for booking with ${site.shortName}. A confirmation is on its way to your inbox, and we look forward to welcoming you to the coast.`
            : `Thank you for booking with ${site.shortName}. We're finalizing the details now and will email your confirmation shortly.`}
        </p>

        {resId ? (
          <dl className="mt-10 border-t border-line pt-6">
            <dt className="text-micro uppercase text-faint">Reservation reference</dt>
            <dd className="mt-1.5 font-display text-h3 tabular-nums text-ink">{resId}</dd>
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
