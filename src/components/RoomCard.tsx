import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { Room } from "@/lib/rooms";

export default function RoomCard({ room, priority = false }: { room: Room; priority?: boolean }) {
  const stepFree = room.stairs.toLowerCase().startsWith("no stairs");

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface transition-shadow duration-200 hover:shadow-hover">
      <Link href={`/rooms/${room.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-canvas">
        <Image
          src={room.images[0].src}
          alt={room.images[0].alt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {stepFree && (
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] uppercase tracking-[0.08em] text-ink">
            Step free
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-[1.35rem] leading-[1.15]">{room.name}</h3>
        <p className="mt-2 text-[0.82rem] leading-[1.55] text-faint">
          {room.beds}. {room.sleeps}.
        </p>
        <p className="mt-3 line-clamp-2 text-[0.88rem] leading-[1.6] text-muted">{room.blurb}</p>
        <Link
          href={`/rooms/${room.slug}`}
          className="mt-auto inline-flex w-fit items-center gap-1.5 pt-5 text-[0.85rem] text-navy transition-colors duration-200 hover:text-ink"
        >
          View room
          <ArrowUpRight size={14} weight="bold" className="transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" />
        </Link>
      </div>
    </article>
  );
}
