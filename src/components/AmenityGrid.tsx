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
 * What comes with every room, one small tile per item with a light icon,
 * rather than ten rows of hairlines.
 */
export default function AmenityGrid({ className = "" }: { className?: string }) {
  return (
    <ul className={`grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 ${className}`}>
      {inRoomAmenities.map((a, i) => {
        const Glyph = icons[a] ?? Sparkle;
        return (
          <Reveal
            as="li"
            key={a}
            delay={(i % 5) * 0.05}
            y={16}
            className="flex min-h-[132px] flex-col justify-between gap-6 rounded-[var(--radius-card)] bg-surface p-5 shadow-[inset_0_0_0_1px_rgba(15,30,36,0.06),inset_0_1px_0_rgba(255,255,255,0.8)]"
          >
            <Glyph size={26} weight="light" className="text-navy" aria-hidden />
            <span className="text-small leading-snug text-ink">{a}</span>
          </Reveal>
        );
      })}
    </ul>
  );
}
