import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Bed, Footprints, MapPin, UsersThree } from "@phosphor-icons/react/dist/ssr";
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
    { icon: Bed, k: "Beds", v: room.beds },
    { icon: UsersThree, k: "Occupancy", v: room.sleeps },
    { icon: MapPin, k: "Location", v: room.side },
    { icon: Footprints, k: "Access", v: room.stairs },
  ];
  const photos = room.images.slice(0, 3);

  return (
    <>
      <article className="mx-auto max-w-[1400px] px-6 pt-32 lg:px-10 lg:pt-40">
        <Reveal y={12}>
          <Link
            href="/rooms"
            className="group inline-flex h-10 items-center gap-2 rounded-full pl-1.5 pr-4 text-small text-muted ring-1 ring-inset ring-ink/15 transition-[color,box-shadow] duration-300 hover:text-ink hover:ring-ink/35"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-ink/[0.05] transition-transform duration-500 ease-[var(--ease-glide)] group-hover:-translate-x-0.5">
              <ArrowLeft size={14} aria-hidden />
            </span>
            All rooms
          </Link>
        </Reveal>

        <header className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <h1 className="max-w-[14ch] text-h1">{room.name}</h1>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-5 lg:pb-3">
            <p className="max-w-[46ch] text-lead text-muted">{room.blurb}</p>
            <div className="mt-8">
              <BookNow size="md" label="Check rates and dates" href={site.bookingUrl} external />
            </div>
          </Reveal>
        </header>

        {/*
          The photographs, plus one tile with the room at a glance. The room
          photography from the old site tops out around 700px wide, so frames
          stay small enough that nothing is upscaled into softness, and the
          glance tile means a two-photo room still fills its row.
        */}
        <div className="mt-16">
          <RoomPhotos images={photos}>
            <Reveal
              delay={photos.length * 0.08}
              y={36}
              className={`bezel bezel-dark ${photos.length % 2 === 0 ? "sm:col-span-2 lg:col-span-1" : ""}`}
            >
              <div className="bezel-core h-full !bg-atlantic p-7 lg:p-8">
                <h2 className="text-h4 !text-foam">At a glance</h2>
                <dl className="mt-7 space-y-5">
                  {facts.map(({ icon: Glyph, k, v }) => (
                    <div key={k} className="flex gap-3.5">
                      <Glyph
                        size={20}
                        weight="light"
                        className="mt-0.5 shrink-0 text-foam-muted"
                        aria-hidden
                      />
                      <div>
                        <dt className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-foam-muted">
                          {k}
                        </dt>
                        <dd className="mt-1 text-small text-foam">{v}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </RoomPhotos>
        </div>

        {/* In this room */}
        <section className="pb-[var(--section-y)] pt-24 lg:pt-32">
          <Reveal>
            <h2 className="text-h2">
              In this <em>room</em>
            </h2>
          </Reveal>
          <AmenityGrid className="mt-12" />
          <Reveal delay={0.1} className="measure mt-10 space-y-3 text-small text-faint">
            <p>
              Plus the shared grounds: the heated saltwater pool, gas grills with all the dining
              supplies, gazebos, picnic tables, the playground and the sand play area.
            </p>
            <p>
              {site.cancellation} {site.policies.join(". ")}.
            </p>
          </Reveal>
        </section>
      </article>

      {/* Other rooms */}
      <section className="bg-mist section">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <Reveal>
              <h2 className="text-h2">
                Other <em>rooms</em>
              </h2>
            </Reveal>
            <Reveal delay={0.05} className="sm:pb-2">
              <TextLink href="/rooms">See all six</TextLink>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((r, i) => (
              <Reveal key={r.slug} delay={i * 0.08} y={36}>
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
