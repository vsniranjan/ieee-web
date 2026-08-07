import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* The team portraits are already WebP at q92. Next's default re-encode at
       q75 is a second lossy pass over an image that has no headroom left, and
       on the softer originals it shows as visible mush at thumbnail size.
       `qualities` has to list every value used, or Next rejects the request. */
    qualities: [75, 90],
  },
};

export default nextConfig;
