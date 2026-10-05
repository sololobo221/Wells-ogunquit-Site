import Link from "next/link";
import Image from "next/image";
import type { Room } from "@/lib/rooms";

/**
 * A room as a listing: photograph, name, beds and occupancy, a link. The
 * whole card is one link. Step-free access is real information, so it is
 * stated in the details rather than stamped on the photo as a badge.
 */
export default function RoomCard({
  room,
  eager = false,
  sizes = "(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw",
  showBlurb = false,
}: {
  room: Room;
  eager?: boolean;
  sizes?: string;
  showBlurb?: boolean;
}) {
  const stepFree = room.stairs.toLowerCase().startsWith("no stairs");

  return (
    <Link href={`/rooms/${room.slug}`} className="group flex h-full flex-col">
      <div className="relative aspect-[4/3] overflow-hidden bg-sand">
        <Image
          src={room.images[0].src}
          alt={room.images[0].alt}
          fill
          loading={eager ? "eager" : undefined}
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col pt-6">
        <h3 className="text-h4 transition-colors duration-300 group-hover:text-accent">{room.name}</h3>
        <dl className="mt-3 space-y-1 text-small text-muted">
          <div>
            <dt className="sr-only">Beds</dt>
            <dd>{room.beds}</dd>
          </div>
          <div>
            <dt className="sr-only">Sleeps</dt>
            <dd>{room.sleeps}</dd>
          </div>
          {stepFree && (
            <div>
              <dt className="sr-only">Access</dt>
              <dd>No stairs to the door</dd>
            </div>
          )}
        </dl>
        {showBlurb && <p className="mt-4 text-small text-muted">{room.blurb}</p>}
        <span className="caps mt-auto w-fit border-b border-ink/30 pb-1.5 pt-6 transition-colors duration-300 group-hover:border-ink">
          View room
        </span>
      </div>
    </Link>
  );
}
