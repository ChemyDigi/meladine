"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribes to a CSS media query.
 * Returns `undefined` during server rendering and hydration (the viewport is
 * unknown there), then the real match once the component is live on the client.
 */
export function useMediaQuery(query: string): boolean | undefined {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    [query]
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => undefined
  );
}

/**
 * Phones, tablets and any touch-first device get pre-rendered images in place
 * of the WebGL instrument scenes (the models weigh up to 35 MB each).
 */
export const STATIC_INSTRUMENTS_QUERY =
  "(max-width: 1023px), (hover: none) and (pointer: coarse)";

export function useStaticInstruments(): boolean | undefined {
  return useMediaQuery(STATIC_INSTRUMENTS_QUERY);
}

/** Below this width the mentors showcase switches to a stacked layout. */
export const COMPACT_LAYOUT_QUERY = "(max-width: 1279px)";

export function useCompactLayout(): boolean | undefined {
  return useMediaQuery(COMPACT_LAYOUT_QUERY);
}
