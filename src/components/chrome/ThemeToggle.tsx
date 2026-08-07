"use client";

import { useEffect, useState } from "react";

/**
 * Placement is still an open question — CONTENT.md's navbar spec has no
 * toggle in it. Parked top-right for now so both themes are testable.
 */
export function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    document.documentElement.style.colorScheme = next ? "dark" : "light";
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
    setDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="fixed top-4 right-4 z-50 rounded-full border border-on-plate/25 bg-plate/70 px-3 py-1.5 text-xs font-medium text-on-plate backdrop-blur-none transition-colors hover:bg-plate"
    >
      {dark === null ? "Theme" : dark ? "Light" : "Dark"}
    </button>
  );
}
