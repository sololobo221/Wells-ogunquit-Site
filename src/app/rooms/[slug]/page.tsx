import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { rooms, getRoom } from "@/lib/rooms";
import { site } from "@/lib/site";
import BookNow from "@/components/BookNow";
import Reveal from "@/components/Reveal";
import RoomCard from "@/components/RoomCard";
import AmenityGrid from "@/components/AmenityGrid";
import RoomPhotos from "@/components/RoomPhotos";
import TextLink from "@/components/TextLink";
import CTASection from "@/components/CTASection";

export function generateStaticParams() {
  return rooms.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps<"/rooms/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const room = getRoom(slug);
  if (!room) return { title: "Room not found" };
  return {
    title: room.name,
    description: room.blurb,
    openGraph: { title: room.name, description: room.blurb, images: [room.images[0].src] },
  };
}

export default async function RoomPage({ params }: PageProps<"/rooms/[slug]">) {
  const { slug } = await params;
  const room = getRoom(slug);
  if (!room) notFound();

  const others = rooms.filter((r) => r.slug !== room.slug).slice(0, 3);
  const facts = [
    ["Beds", room.beds],
    ["Sleeps", room.sleeps],
    ["Location", room.side],
    ["Access", room.stairs],
  ];
  const photos = room.images.slice(0, 3);

  return (
    <>
      <article className="container-site pt-28 lg:pt-36">
        <nav aria-label="Breadcrumb" className="text-small text-muted">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/rooms" className="transition-colors duration-200 hover:text-ink">
                Rooms
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-ink">
              {room.name}
            </li>
          </ol>
        </nav>

        <header className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-x-16">
          <Reveal className="lg:col-span-7">
            <h1 className="max-w-[16ch] text-h1">{room.name}</h1>
          </Reveal>
          <Reveal delay={0.06} className="lg:col-span-5 lg:pb-2">
            <p className="text-lead text-muted">{room.blurb}</p>
          </Reveal>
        </header>

        <div className="mt-12 lg:mt-16">
          <RoomPhotos images={photos} />
        </div>

        {/* Facts and booking, side by side. */}
        <section className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-x-16 lg:py-24">
          <Reveal className="lg:col-span-7">
            <h2 className="text-h3">At a glance</h2>
            <dl className="mt-8 grid border-t border-ink/15 sm:grid-cols-2 sm:gap-x-10">
              {facts.map(([k, v]) => (
                <div key={k} className="border-b border-ink/15 py-5">
                  <dt className="caps text-[0.6875rem] text-faint">{k}</dt>
                  <dd className="mt-1.5 text-body text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.06} className="lg:col-span-5">
            <div className="border border-line bg-surface p-8 lg:p-10">
              <p className="font-display text-h3">Check rates and dates</p>
              <p className="mt-3 text-small text-muted">
                Live availability for this room is on our booking page. {site.cancellation}
              </p>
              <BookNow
                size="lg"
                label="See availability"
                href={site.bookingUrl}
                external
                className="mt-8 w-full"
              />
              <a
                href={site.phones.tollFreeHref}
                className="mt-4 block text-center text-small tabular-nums text-muted transition-colors duration-200 hover:text-ink"
              >
                or call {site.phones.tollFree}
              </a>
            </div>
          </Reveal>
        </section>

        <section className="border-t border-ink/15 pb-[var(--section-y)] pt-16 lg:pt-24">
          <Reveal>
            <span className="kicker">In this room</span>
            <h2 className="text-h2">Everything you&apos;ll find inside</h2>
          </Reveal>
          <AmenityGrid className="mt-12" />
          <Reveal className="measure mt-8 space-y-3 text-small text-muted">
            <p>
              Plus the shared grounds: the heated saltwater pool, gas grills with all the dining
              supplies, gazebos, picnic tables, the playground and the sand play area.
            </p>
            <p>{site.policies.join(". ")}.</p>
          </Reveal>
        </section>
      </article>

      {/* Other rooms */}
      <section className="bg-sand section">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <Reveal>
              <span className="kicker">Other rooms</span>
              <h2 className="text-h2">You might also like</h2>
            </Reveal>
            <Reveal className="sm:pb-2">
              <TextLink href="/rooms">All six rooms</TextLink>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((r, i) => (
              <Reveal key={r.slug} delay={i * 0.06}>
                <RoomCard room={r} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
