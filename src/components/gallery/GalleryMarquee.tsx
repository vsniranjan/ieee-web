"use client";

import { useEffect } from "react";
import { initGalleryMarquee } from "@/lib/poster-reel";

/**
 * Wires the reel's marquee loop. Renders nothing.
 *
 * No run-once ref guard here, deliberately. The brief uses one because its
 * init returns void — with no cleanup, StrictMode's double-invoke would leave
 * two loops running at double speed. This version returns a real teardown, so
 * the guard becomes actively harmful: StrictMode mounts, unmounts (tearing the
 * loop down), then remounts, and a guard would skip re-initialising. The reel
 * would sit perfectly still.
 *
 * Cleanup is the correct mechanism for both problems. The guard is not.
 */
export function GalleryMarquee() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return initGalleryMarquee(reducedMotion);
  }, []);

  return null;
}
