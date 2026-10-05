import {
  Armchair,
  Bed,
  Bread,
  Coffee,
  Door,
  Oven,
  Snowflake,
  Sparkle,
  Television,
  Thermometer,
  WifiHigh,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { inRoomAmenities } from "@/lib/rooms";
import Reveal from "./Reveal";

const icons: Record<string, Icon> = {
  "Serta Presidential Suite bed": Bed,
  "Free Wi-Fi": WifiHigh,
  "Flat-screen TV and DVD": Television,
  "Heat and air conditioning": Thermometer,
  Refrigerator: Snowflake,
  Microwave: Oven,
  "Coffee maker with coffee": Coffee,
  Toaster: Bread,
  "Private entrance": Door,
  "Patio furniture": Armchair,
};

/**
 * What comes with every room: a plain list with a thin icon on each line,
 * set in columns.
 */
export default function AmenityGrid({ className = "" }: { className?: string }) {
  return (
    <Reveal
      as="div"
      className={`grid grid-cols-1 gap-x-10 border-t border-ink/15 sm:grid-cols-2 lg:grid-cols-3 ${className}`}
    >
      {inRoomAmenities.map((a) => {
        const Glyph = icons[a] ?? Sparkle;
        return (
          <div key={a} className="flex items-center gap-4 border-b border-ink/15 py-4 text-body text-ink">
            <Glyph size={22} weight="light" className="shrink-0 text-muted" aria-hidden />
            {a}
          </div>
        );
      })}
    </Reveal>
  );
}
