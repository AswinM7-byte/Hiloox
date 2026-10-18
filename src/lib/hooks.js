"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribes to a CSS media query.
 *
 * Uses `useSyncExternalStore` rather than `useState` + `useEffect` so the
 * value is read during render instead of being written back with a
 * synchronous `setState` inside an effect (which causes cascading renders).
 * Returns `false` during SSR, matching the pre-hydration markup.
 */
export function useMediaQuery(query) {
  const subscribe = useCallback(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query]
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
}

/**
 * True once the window has scrolled past `threshold` pixels.
 * Same rationale as useMediaQuery — subscribe, don't setState in an effect.
 */
export function useScrolledPast(threshold) {
  const subscribe = useCallback((onChange) => {
    window.addEventListener("scroll", onChange, { passive: true });
    return () => window.removeEventListener("scroll", onChange);
  }, []);

  return useSyncExternalStore(
    subscribe,
    () => window.scrollY > threshold,
    () => false
  );
}
