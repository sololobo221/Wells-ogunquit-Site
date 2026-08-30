import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { rooms, getRoom, inRoomAmenities } from "@/lib/rooms";
import { site } from "@/lib/site";
import BookNow from "@/components/BookNow";
import Reveal from "@/components/Reveal";
import RoomCard from "@/components/RoomCard";
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
  const facts: [string, string][] = [
    ["Beds", room.beds],
    ["Occupancy", room.sleeps],
    ["Location", room.side],
    ["Access", room.stairs],
  ];

  return (
    <>
      <article className="mx-auto max-w-[1400px] px-5 pt-32 lg:px-10 lg:pt-40">
        <Reveal>
          <Link
            href="/rooms"
            className="group inline-flex items-center gap-2 text-[0.85rem] text-muted transition-colors duration-300 hover:text-ink"
          >
            <ArrowLeft
              size={15}
              className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-1"
            />
            All rooms
          </Link>
        </Reveal>

        <header className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <h1 className="text-[2.4rem] leading-[1.03] sm:text-[3.2rem]">{room.name}</h1>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-5 lg:pb-2">
            <p className="max-w-[46ch] leading-[1.7] text-muted">{room.blurb}</p>
            <div className="mt-7">
              <BookNow size="md" label="Check rates and dates" />
            </div>
          </Reveal>
        </header>

        {/*
          Equal columns rather than one large lead image. The room photography
          from the old site tops out around 700px wide, so a full-width lead
          image was being upscaled and looked soft. Three smaller frames stay
          within what the source can actually deliver.
        */}
        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {room.images.slice(0, 3).map((img, i) => (
            <Reveal
              key={img.src}
              delay={i * 0.08}
              className={`relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-canvas ${
                room.images.length === 2 && i === 0 ? "sm:col-span-1" : ""
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                priority={i === 0}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </Reveal>
          ))}
        </div>

        {/* Facts and amenities */}
        <div className="mt-20 grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <h2 className="font-display text-[1.6rem] leading-tight">The details</h2>
            <dl className="mt-6">
              {facts.map(([k, v], i) => (
                <Reveal key={k} delay={i * 0.05}>
                  <div className="grid grid-cols-[6.5rem_1fr] gap-5 border-b border-line py-4">
                    <dt className="text-[0.76rem] uppercase tracking-[0.14em] text-faint">{k}</dt>
                    <dd className="text-[0.92rem] leading-[1.6] text-muted">{v}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
            <p className="mt-6 text-[0.85rem] leading-[1.7] text-faint">
              {site.cancellation} {site.policies.join(". ")}.
            </p>
          </div>

          <div className="lg:col-span-7">
            <h2 className="font-display text-[1.6rem] leading-tight">In this room</h2>
            <ul className="mt-6 grid grid-cols-1 gap-x-12 sm:grid-cols-2">
              {inRoomAmenities.map((a, i) => (
                <Reveal as="li" key={a} delay={i * 0.03}>
                  <span className="block border-b border-line py-4 text-[0.92rem] text-muted">
                    {a}
                  </span>
                </Reveal>
              ))}
            </ul>
            <p className="mt-6 text-[0.85rem] leading-[1.7] text-faint">
              Plus the shared grounds: the heated saltwater pool, gas grills with all the dining
              supplies, gazebos, picnic tables, the playground and the sand play area.
            </p>
          </div>
        </div>
      </article>

      {/* Other rooms */}
      <section className="mx-auto max-w-[1400px] px-5 py-24 lg:px-10 lg:py-32">
        <div className="flex items-end justify-between gap-6">
          <h2 className="font-display text-[1.8rem] leading-tight sm:text-[2.3rem]">Other rooms</h2>
          <Link
            href="/rooms"
            className="group inline-flex shrink-0 items-center gap-1.5 text-[0.9rem] text-navy transition-colors duration-300 hover:text-ink"
          >
            See all six
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
            />
          </Link>
        </div>
        <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((r, i) => (
            <Reveal key={r.slug} delay={i * 0.08}>
              <RoomCard room={r} />
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
