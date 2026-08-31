import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { Room } from "@/lib/rooms";

/**
 * Reads as a listing: image, then name, then sleeping configuration as its own
 * distinct tier, then description. The step-free tag is a real pill badge.
 */
export default function RoomCard({ room, priority = false }: { room: Room; priority?: boolean }) {
  const stepFree = room.stairs.toLowerCase().startsWith("no stairs");

  return (
    <article className="group flex h-full flex-col">
      <Link
        href={`/rooms/${room.slug}`}
        className="relative block aspect-[3/2] overflow-hidden rounded-[var(--radius-card)] bg-sand"
      >
        <Image
          src={room.images[0].src}
          alt={room.images[0].alt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw"
          className="object-cover transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-[1.03]"
        />
        {stepFree && (
          <span className="absolute left-4 top-4 inline-flex items-center rounded-[var(--radius-pill)] bg-white/95 px-3 py-1 text-eyebrow uppercase tracking-[0.14em] text-ink shadow-card">
            Step free
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col pt-6">
        <h3 className="text-h4">{room.name}</h3>

        {/* Sleeping configuration as its own tier, not buried in prose */}
        <p className="mt-3 border-t border-line pt-3 text-micro text-faint">
          {room.beds}. {room.sleeps}.
        </p>

        <p className="mt-4 line-clamp-2 text-small text-muted">{room.blurb}</p>

        <Link
          href={`/rooms/${room.slug}`}
          className="mt-auto inline-flex w-fit items-center gap-1.5 pt-6 text-small text-navy underline decoration-navy/30 decoration-1 underline-offset-[6px] transition-colors duration-200 hover:text-ink hover:decoration-ink/60"
        >
          View room
          <ArrowUpRight
            size={14}
            weight="bold"
            className="transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>
    </article>
  );
}
