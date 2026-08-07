import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Poster travel speed, in CSS pixels per second — independent of poster count. */
const REEL_SPEED = 64;

/** Posters fade in as they decode; nothing pops into a half-drawn frame. */
function trackImageLoads(track: HTMLElement): void {
  track.querySelectorAll<HTMLImageElement>(".poster__img").forEach((img) => {
    if (img.complete) img.classList.add("is-loaded");
    else img.addEventListener("load", () => img.classList.add("is-loaded"), { once: true });
  });
}

/**
 * Posters sit off to the right of the viewport, so lazy loading would only
 * fetch them as the marquee dragged each one in — a visible blank. Once the
 * reel itself is near, fetch the whole strip.
 */
function preloadOnApproach(reel: HTMLElement, track: HTMLElement): void {
  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      track.querySelectorAll<HTMLImageElement>(".poster__img").forEach((img) => {
        img.loading = "eager";
      });
      observer.disconnect();
    },
    { rootMargin: "600px 0px" },
  );
  observer.observe(reel);
}

/**
 * Seamless auto-scrolling poster reel; eases to a stop on hover.
 *
 * `staticReel` hands the strip to native scrolling instead of the marquee.
 * Reserved for reduced motion: touch devices run the marquee too, so the reel
 * reads as alive on a phone rather than as a strip that happens to be cut off.
 *
 * The hover pause is mouse-only by nature, so on touch `hovered` stays false
 * and the scroll-velocity boost drives the reel on its own.
 *
 * Returns a teardown so React can kill the loop and its listeners on unmount —
 * without it a route change leaves a ticker callback running forever.
 */
export function initGalleryMarquee(staticReel: boolean): () => void {
  const reel = document.getElementById("gallery-reel");
  const track = document.getElementById("gallery-track");
  if (!reel || !track) return () => {};

  trackImageLoads(track);
  preloadOnApproach(reel, track);

  if (staticReel) {
    // no marquee to carry posters past — hand the strip over to native scrolling
    reel.classList.add("is-static");
    return () => {};
  }

  const set = track.querySelector<HTMLElement>(".gallery__set");
  const loop = gsap.to(track, {
    xPercent: -50,
    duration: set ? set.offsetWidth / REEL_SPEED : 36,
    ease: "none",
    repeat: -1,
  });

  let hovered = false;
  const onEnter = () => {
    hovered = true;
    gsap.to(loop, { timeScale: 0, duration: 0.6 });
  };
  const onLeave = () => {
    hovered = false;
    gsap.to(loop, { timeScale: 1, duration: 0.6 });
  };
  reel.addEventListener("mouseenter", onEnter);
  reel.addEventListener("mouseleave", onLeave);

  // reel speeds up with scroll velocity; ticker decays it back to 1
  const clampBoost = gsap.utils.clamp(1, 4);
  const trigger = ScrollTrigger.create({
    onUpdate: (self) => {
      if (hovered) return;
      loop.timeScale(
        Math.max(loop.timeScale(), clampBoost(1 + Math.abs(self.getVelocity()) / 2200)),
      );
    },
  });
  const decay = () => {
    if (hovered) return;
    const ts = loop.timeScale();
    if (ts > 1) loop.timeScale(ts + (1 - ts) * 0.03);
  };
  gsap.ticker.add(decay);

  return () => {
    reel.removeEventListener("mouseenter", onEnter);
    reel.removeEventListener("mouseleave", onLeave);
    gsap.ticker.remove(decay);
    trigger.kill();
    loop.kill();
  };
}
