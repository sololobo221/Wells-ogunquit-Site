import type { Metadata } from "next";
import { EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import { site, distances } from "@/lib/site";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import DistanceScale from "@/components/DistanceScale";
import MapEmbed from "@/components/MapEmbed";

export const metadata: Metadata = {
  title: "Contact and directions",
  description:
    "Call 1-800-556-4402 or 207-646-8115, or write to info@wells-ogunquit.com. We're at 203 Post Road, US Route 1, Wells, Maine 04090.",
};

const label = "text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-faint";
const big =
  "font-display text-h3 font-[360] tabular-nums text-ink transition-colors duration-300 hover:text-navy";

export default function ContactPage() {
  return (
    <>
      <PageHero
        image="/images/hero-room-porch.jpg"
        imageAlt="A private porch outside a guest room"
        title={
          <>
            We&apos;d love <em>to have you</em>
          </>
        }
        intro="Call, write, or send a note below. We answer the phone ourselves."
      />

      <section className="mx-auto max-w-[1400px] px-6 section lg:px-10">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-5">
            <SectionHeading
              title={
                <>
                  However you&apos;d rather <em>reach us</em>
                </>
              }
            />

            <Reveal delay={0.08} className="mt-12">
              <dl className="space-y-9">
                <div className="flex gap-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-mist text-navy">
                    <Phone size={20} weight="light" aria-hidden />
                  </span>
                  <div>
                    <dt className={label}>Phone</dt>
                    <dd className="mt-2 flex flex-col gap-1">
                      <a href={site.phones.tollFreeHref} className={big}>
                        {site.phones.tollFree}
                      </a>
                      <a href={site.phones.localHref} className={big}>
                        {site.phones.local}
                      </a>
                    </dd>
                  </div>
                </div>
                <div className="flex gap-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-mist text-navy">
                    <EnvelopeSimple size={20} weight="light" aria-hidden />
                  </span>
                  <div>
                    <dt className={label}>Email</dt>
                    <dd className="mt-2">
                      <a
                        href={`mailto:${site.email}`}
                        className="text-lead text-ink underline decoration-ink/20 underline-offset-[6px] transition-colors duration-300 hover:text-navy hover:decoration-navy"
                      >
                        {site.email}
                      </a>
                    </dd>
                  </div>
                </div>
                <div className="flex gap-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-mist text-navy">
                    <MapPin size={20} weight="light" aria-hidden />
                  </span>
                  <div>
                    <dt className={label}>Address</dt>
                    <dd className="mt-2">
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(site.address.full)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lead text-ink transition-colors duration-300 hover:text-navy"
                      >
                        {site.address.street}
                        <br />
                        {site.address.city}, {site.address.state} {site.address.zip}
                      </a>
                    </dd>
                  </div>
                </div>
              </dl>

              <div className="mt-10 flex gap-6 pl-16 text-small">
                <a
                  href={site.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink underline decoration-ink/20 underline-offset-[6px] transition-colors duration-300 hover:text-navy hover:decoration-navy"
                >
                  Facebook
                </a>
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink underline decoration-ink/20 underline-offset-[6px] transition-colors duration-300 hover:text-navy hover:decoration-navy"
                >
                  Instagram
                </a>
              </div>

              <p className="measure mt-10 text-small text-faint">
                {site.season} {site.breakfastHours}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal y={36}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Map and distances */}
      <section className="bg-mist section">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionHeading
            title={
              <>
                On Route 1 <em>in Wells</em>
              </>
            }
            intro="Handy for the beaches, the coast road, and the drive north to Portland."
          />

          <Reveal y={36} className="bezel mt-14">
            <div className="bezel-core">
              <MapEmbed />
            </div>
          </Reveal>

          <div className="mt-16 lg:mt-20">
            <DistanceScale items={distances} columns={5} on="mist" />
          </div>
        </div>
      </section>
    </>
  );
}
