import Link from "next/link";
import { site } from "@/lib/site";

/**
 * Pinned to the bottom of small screens: call, or book. Two flat halves,
 * the way most hotel sites do it on a phone. A server component, so it ships
 * no JavaScript.
 *
 * z-30 keeps it below the full-screen menu (z-40), which carries its own
 * booking button. The footer reserves matching space so nothing hides behind
 * it, and the safe-area padding clears the iPhone home indicator.
 */
export default function MobileBookBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-[2fr_3fr] border-t border-line bg-canvas pb-[env(safe-area-inset-bottom)] lg:hidden">
      <a
        href={site.phones.tollFreeHref}
        className="caps flex h-14 items-center justify-center text-ink active:bg-sand"
      >
        Call us
      </a>
      <Link
        href="/booking"
        className="caps flex h-14 items-center justify-center bg-accent text-white active:bg-accent-deep"
      >
        Book a room
      </Link>
    </div>
  );
}
