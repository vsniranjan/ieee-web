type ClassName = string | false | null | undefined;

/** Join conditional utility classes without adding a runtime dependency. */
export function cn(...inputs: ClassName[]): string {
  return inputs.filter(Boolean).join(" ");
}
