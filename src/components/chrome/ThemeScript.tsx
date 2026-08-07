/**
 * Runs before first paint, blocking, in <head>.
 *
 * There is no light theme — the site is one dark terrain — so this no longer
 * resolves a theme. It only marks that JS is alive: disclosures default to open
 * in CSS so a JS failure leaves every paragraph readable, and this class is
 * what allows them to close.
 */
const script = `document.documentElement.classList.add("js");`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
