import type { Metadata } from "next";
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

const label = "caps block text-[0.6875rem] text-faint";
const big = "font-display text-h3 tabular-nums text-ink transition-colors duration-300 hover:text-accent";
const underline =
  "text-ink underline decoration-ink/25 underline-offset-[6px] transition-colors duration-300 hover:decoration-ink";

export default function ContactPage() {
  return (
    <>
      <PageHero
        image="/images/hero-room-porch.jpg"
        imageAlt="The porch running along the guest rooms, with autumn trees beyond"
        label="Contact"
        title="We'd love to have you"
        intro="Call, write, or send a note below. We answer the phone ourselves."
      />

      <section className="container-site section">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-5">
            <SectionHeading label="Get in touch" title="However you'd rather reach us" />

            <Reveal className="mt-12">
              <dl className="border-t border-ink/15">
                <div className="border-b border-ink/15 py-7">
                  <dt className={label}>Phone</dt>
                  <dd className="mt-3 flex flex-col gap-1">
                    <a href={site.phones.tollFreeHref} className={big}>
                      {site.phones.tollFree}
                    </a>
                    <a href={site.phones.localHref} className={big}>
                      {site.phones.local}
                    </a>
                  </dd>
                </div>
                <div className="border-b border-ink/15 py-7">
                  <dt className={label}>Email</dt>
                  <dd className="mt-3 text-lead">
                    <a href={`mailto:${site.email}`} className={underline}>
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div className="border-b border-ink/15 py-7">
                  <dt className={label}>Address</dt>
                  <dd className="mt-3 text-lead">
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(site.address.full)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink transition-colors duration-300 hover:text-accent"
                    >
                      {site.address.street}
                      <br />
                      {site.address.city}, {site.address.state} {site.address.zip}
                    </a>
                  </dd>
                </div>
                <div className="border-b border-ink/15 py-7">
                  <dt className={label}>Follow along</dt>
                  <dd className="mt-3 flex gap-6 text-body">
                    <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className={underline}>
                      Instagram
                    </a>
                    <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className={underline}>
                      Facebook
                    </a>
                  </dd>
                </div>
              </dl>

              <p className="measure mt-8 text-small text-muted">
                {site.season} {site.breakfastHours}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.06}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Map and distances */}
      <section className="bg-sand section">
        <div className="container-site">
          <SectionHeading
            label="Directions"
            title="On Route 1 in Wells"
            intro="Handy for the beaches, the coast road, and the drive north to Portland."
          />

          <Reveal className="mt-14 border border-line">
            <MapEmbed />
          </Reveal>

          <DistanceScale items={distances} className="mt-14" />
        </div>
      </section>
    </>
  );
}
