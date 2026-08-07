/**
 * Runs before first paint, blocking, in <head>.
 *
 * localStorage can only be read on the client, but the class has to be on
 * <html> before the browser paints. Without this every hard reload flashes
 * the wrong theme — the most visible polish bug on a page like this.
 */
const script = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var dark = stored
      ? stored === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
  } catch (e) {}
})();
`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
