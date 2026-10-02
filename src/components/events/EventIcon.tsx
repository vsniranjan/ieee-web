import { PATHS as FIELD_PATHS } from "@/components/home/FieldIcon";
import type { EventIconName } from "@/content/events";

/**
 * Line glyphs for the event cards, drawn on the same 36×32 grid and stroke as
 * FieldIcon. The three humanitarian projects reuse its figures directly so the
 * same project carries the same mark on home and here.
 */
const PATHS: Record<EventIconName, string[]> = {
  ...FIELD_PATHS,
  code: ["M12 9 L5 16 L12 23", "M24 9 L31 16 L24 23", "M20.5 6 L15.5 26"],
  talk: [
    "M7 6 h22 a3 3 0 0 1 3 3 v11 a3 3 0 0 1 -3 3 h-12 l-6 5 v-5 h-4 a3 3 0 0 1 -3 -3 v-11 a3 3 0 0 1 3 -3 z",
    "M11 12.5 h14 M11 17 h9",
  ],
  flask: [
    "M14 4 h8",
    "M15.5 4 v9 l-8 13 a2 2 0 0 0 1.7 3 h17.6 a2 2 0 0 0 1.7 -3 l-8 -13 v-9",
    "M10.5 21 h15",
  ],
  spark: [
    "M18 4 L20.6 13.4 L30 16 L20.6 18.6 L18 28 L15.4 18.6 L6 16 L15.4 13.4 Z",
    "M28 4 v4 M26 6 h4",
  ],
  pulse: [
    "M18 28 C 8 21, 4 15, 6.5 10 C 9 5.5, 15 5.5, 18 10 C 21 5.5, 27 5.5, 29.5 10 C 32 15, 28 21, 18 28 Z",
    "M8 17 h5 l2 -4 l3 7 l2 -3 h8",
  ],
};

export function EventIcon({ name, className = "size-full" }: { name: EventIconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 36 32"
      aria-hidden
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {PATHS[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
