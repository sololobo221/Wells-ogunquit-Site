import type { Metadata } from "next";
import { site, distances } from "@/lib/site";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact and directions",
  description:
    "Call 1-800-556-4402 or 207-646-8115, or write to info@wells-ogunquit.com. We're at 203 Post Road, US Route 1, Wells, Maine 04090.",
};

const mapSrc = `https://www.google.com/maps?q=${site.geo.lat},${site.geo.lng}&hl=en&z=15&output=embed`;

export default function ContactPage() {
  return (
    <>
      <PageHero
        image="/images/hero-room-porch.jpg"
        imageAlt="A private porch outside a guest room"
        title="We'd love to have you"
        intro="Call, write, or send a note below. We answer the phone ourselves."
      />

      <section className="mx-auto max-w-[1400px] px-6 section lg:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-5">
            <SectionHeading label="Get in touch" title="However you'd rather reach us" />

            <Reveal delay={0.08} className="mt-10">
              <dl className="space-y-6">
                <div>
                  <dt className="text-micro uppercase text-faint">
                    Toll free
                  </dt>
                  <dd className="mt-1.5">
                    <a
                      href={site.phones.tollFreeHref}
                      className="font-display text-h3 tabular-nums text-ink transition-colors duration-300 hover:text-navy"
                    >
                      {site.phones.tollFree}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-micro uppercase text-faint">Local</dt>
                  <dd className="mt-1.5">
                    <a
                      href={site.phones.localHref}
                      className="font-display text-h3 tabular-nums text-ink transition-colors duration-300 hover:text-navy"
                    >
                      {site.phones.local}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-micro uppercase text-faint">Email</dt>
                  <dd className="mt-1.5">
                    <a
                      href={`mailto:${site.email}`}
                      className="text-body text-ink transition-colors duration-300 hover:text-navy"
                    >
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-micro uppercase text-faint">Address</dt>
                  <dd className="mt-1.5">
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(site.address.full)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-body text-ink transition-colors duration-300 hover:text-navy"
                    >
                      {site.address.street}
                      <br />
                      {site.address.city}, {site.address.state} {site.address.zip}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-micro uppercase text-faint">Social</dt>
                  <dd className="mt-1.5 flex gap-6 text-small">
                    <a
                      href={site.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink transition-colors duration-300 hover:text-navy"
                    >
                      Facebook
                    </a>
                    <a
                      href={site.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink transition-colors duration-300 hover:text-navy"
                    >
                      Instagram
                    </a>
                  </dd>
                </div>
              </dl>

              <p className="mt-9 text-small text-faint">
                {site.season} {site.breakfastHours}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Map and distances */}
      <section className="bg-sand section">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionHeading
            title="On Route 1 in Wells"
            intro="Handy for the beaches, the coast road, and the drive north to Portland."
          />

          <Reveal className="mt-12 overflow-hidden rounded-[var(--radius-card)] border border-line">
            <iframe
              src={mapSrc}
              title={`Map showing ${site.name}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="aspect-[16/9] w-full border-0"
            />
          </Reveal>

          <div className="mt-12 grid gap-x-14 sm:grid-cols-2">
            {distances.map((d, i) => (
              <Reveal key={d.place} delay={(i % 2) * 0.05}>
                <div className="flex items-baseline justify-between gap-6 border-b border-line py-3.5">
                  <span className="text-small text-muted">{d.place}</span>
                  <span className="shrink-0 font-display text-lead tabular-nums text-navy">
                    {d.value}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
