import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Bed, UsersThree, Footprints } from "@phosphor-icons/react/dist/ssr";
import type { Room } from "@/lib/rooms";

/**
 * Reads as a listing: the photograph in its tray, then the name, then the
 * sleeping configuration as its own tier. The whole card is one link.
 *
 * Step-free access is real information, so it sits in the meta line under
 * the photo rather than as a badge stamped on top of it.
 */
export default function RoomCard({
  room,
  eager = false,
  sizes = "(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw",
  showBlurb = true,
}: {
  room: Room;
  eager?: boolean;
  sizes?: string;
  showBlurb?: boolean;
}) {
  const stepFree = room.stairs.toLowerCase().startsWith("no stairs");

  return (
    <Link
      href={`/rooms/${room.slug}`}
      className="group flex h-full flex-col rounded-[var(--radius-shell)] focus-visible:outline-offset-4"
    >
      <div className="bezel transition-transform duration-700 ease-[var(--ease-glide)] group-hover:-translate-y-1">
        <div className="bezel-core aspect-[4/3] bg-mist">
          <Image
            src={room.images[0].src}
            alt={room.images[0].alt}
            fill
            loading={eager ? "eager" : undefined}
            sizes={sizes}
            className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out)] group-hover:scale-[1.04]"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col px-1 pt-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-h4">{room.name}</h3>
          <span
            aria-hidden
            className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink ring-1 ring-inset ring-ink/15 transition-[background-color,color,transform,box-shadow] duration-500 ease-[var(--ease-glide)] group-hover:-translate-y-px group-hover:translate-x-0.5 group-hover:bg-accent group-hover:text-white group-hover:ring-accent"
          >
            <ArrowUpRight size={14} weight="bold" />
          </span>
        </div>

        <ul className="mt-4 flex flex-col gap-2 text-small text-muted">
          <li className="flex items-start gap-2.5">
            <Bed size={18} weight="light" className="mt-0.5 shrink-0 text-faint" aria-hidden />
            <span>{room.beds}</span>
          </li>
          <li className="flex items-start gap-2.5">
            <UsersThree size={18} weight="light" className="mt-0.5 shrink-0 text-faint" aria-hidden />
            <span>{room.sleeps}</span>
          </li>
          {stepFree && (
            <li className="flex items-start gap-2.5 text-ink">
              <Footprints size={18} weight="light" className="mt-0.5 shrink-0 text-faint" aria-hidden />
              <span>Step free, no stairs to the door</span>
            </li>
          )}
        </ul>

        {showBlurb && <p className="mt-4 line-clamp-2 text-small text-faint">{room.blurb}</p>}
      </div>
    </Link>
  );
}
