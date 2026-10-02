import type { FieldProject } from "@/content/home";

/**
 * Compact glyphs for the field-work rows, in the same drawn language as the
 * page terrain. Drawn for this size specifically — a large composition scaled
 * down turns to mud.
 */

export const PATHS: Record<FieldProject["figure"], string[]> = {
  // Sun over a ridge: the two solar systems, and the ground they sit on.
  solar: [
    "M4 27 C 9 24, 13 28, 18 25 S 27 22, 32 25",
    "M18 12 m-5 0 a5 5 0 1 0 10 0 a5 5 0 1 0 -10 0",
    "M18 3 v3 M18 18 v3 M9 12 h3 M24 12 h3",
    "M11.2 5.2 l2.1 2.1 M22.7 16.7 l2.1 2.1 M24.8 5.2 l-2.1 2.1 M13.3 16.7 l-2.1 2.1",
  ],
  // Two nodes joined over the ground, signal spreading from one end.
  link: [
    "M4 27 C 9 24, 13 28, 18 25 S 27 22, 32 25",
    "M8 24 C 12 10, 24 10, 28 23",
    "M8 24 m-2.4 0 a2.4 2.4 0 1 0 4.8 0 a2.4 2.4 0 1 0 -4.8 0",
    "M28 23 m-2.4 0 a2.4 2.4 0 1 0 4.8 0 a2.4 2.4 0 1 0 -4.8 0",
    "M28 23 m-7 0 a7 7 0 0 1 14 0",
  ],
  // A track crossing a threshold ring.
  watch: [
    "M4 29 C 9 26, 13 30, 18 27 S 27 24, 32 27",
    "M3 24 C 8 20, 12 12, 18 10 S 27 7, 31 4",
    "M18 14 m-8 0 a8 8 0 1 0 16 0 a8 8 0 1 0 -16 0",
    "M18 14 m-2 0 a2 2 0 1 0 4 0 a2 2 0 1 0 -4 0",
  ],
};

export function FieldIcon({ figure }: { figure: FieldProject["figure"] }) {
  return (
    <svg
      viewBox="0 0 36 32"
      aria-hidden
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      className="size-full"
    >
      {PATHS[figure].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
