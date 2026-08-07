import type { CSSProperties } from "react";
import { posters, type Poster } from "@/lib/posters";

/**
 * Server component on purpose — the posters are static content and should ship
 * as HTML. Only the marquee that drives them is a client component.
 *
 * The plain <img> with explicit width/height is deliberate too: next/image
 * injects its own wrapper and lazy behaviour, which fights the decode fade-in
 * and the approach-preload the reel depends on.
 */

const pad = (n: number) => String(n).padStart(2, "0");

function PosterFigure({
  poster,
  i,
  decorative,
}: {
  poster: Poster;
  i: number;
  decorative: boolean;
}) {
  const ratio = (poster.width / poster.height).toFixed(4);

  return (
    <figure
      className={`poster poster--v${(i % 4) + 1}`}
      style={{ "--poster-ar": ratio } as CSSProperties}
    >
      <div className="poster__frame">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="poster__img"
          src={poster.src}
          width={poster.width}
          height={poster.height}
          loading="lazy"
          decoding="async"
          alt={decorative ? "" : `Event poster — ${poster.title}`}
        />
      </div>
      <figcaption className="poster__caption">
        <span className="poster__index" aria-hidden="true">
          {pad(i + 1)}
        </span>
        <span className="poster__title">{poster.title}</span>
        <span className="poster__tag">{poster.tag}</span>
      </figcaption>
    </figure>
  );
}

function PosterSet({ duplicate }: { duplicate: boolean }) {
  return (
    <div className="gallery__set" aria-hidden={duplicate || undefined}>
      {posters.map((poster, i) => (
        <PosterFigure
          key={`${duplicate ? "dup" : "real"}-${poster.src}`}
          poster={poster}
          i={i}
          decorative={duplicate}
        />
      ))}
    </div>
  );
}

export function GalleryReel() {
  return (
    // Two identical sets. xPercent:-50 assumes the track is exactly two equal
    // halves, so the duplicate must render the same children and trailing gap.
    <div className="gallery__reel" id="gallery-reel" aria-label="Event posters">
      <div className="gallery__track" id="gallery-track">
        <PosterSet duplicate={false} />
        <PosterSet duplicate={true} />
      </div>
    </div>
  );
}
