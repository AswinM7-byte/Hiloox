"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

const LoadingContext = createContext(() => () => {});
export function usePageLoading() { return useContext(LoadingContext); }

export default function LoadingProvider({ children }) {
  const [initial, setInitial] = useState(true);
  const [pending, setPending] = useState(0);
  const [expired, setExpired] = useState(false);
  const shell = useRef(null), overlay = useRef(null);
  const active = (initial || pending > 0) && !expired;
  const begin = useCallback(() => {
    setExpired(false);
    setPending(value => value + 1);
    return () => setPending(value => Math.max(0, value - 1));
  }, []);

  useEffect(() => {
    let disposed = false, first, second;
    const ready = () => {
      first = requestAnimationFrame(() => {
        second = requestAnimationFrame(() => { if (!disposed) setInitial(false); });
      });
    };
    // Hydrated content and its local font are usable; videos never gate the page.
    Promise.resolve(document.fonts?.ready).then(ready, ready);
    return () => { disposed = true; cancelAnimationFrame(first); cancelAnimationFrame(second); };
  }, []);

  useEffect(() => {
    if (!active) return;
    const content = shell.current, loadingLayer = overlay.current;
    const previousFocus = document.activeElement;
    const overflow = document.body.style.overflow;
    content.inert = true;
    document.body.style.overflow = "hidden";
    loadingLayer?.focus({ preventScroll: true });
    // Fail open if hydration, fonts or a route request never settles.
    const watchdog = setTimeout(() => setExpired(true), 8000);
    return () => {
      clearTimeout(watchdog);
      content.inert = false;
      document.body.style.overflow = overflow;
      if (document.activeElement === loadingLayer && previousFocus?.isConnected) previousFocus.focus?.({ preventScroll: true });
    };
  }, [active]);

  return <LoadingContext.Provider value={begin}>
    <div ref={shell} className="site-shell">{children}</div>
    <div ref={overlay} className="page-loading-overlay" data-active={active} aria-hidden={!active} role="status" aria-live="polite" aria-label="Loading Hiloox" tabIndex={-1} data-lenis-prevent>
      <div className="page-loading-mark" aria-hidden="true"><span className="loading-ear" /><span className="loading-ear" /><span className="loading-face">··</span></div>
      <span className="loading-brand">HILOOX</span><span className="loading-line" aria-hidden="true" />
    </div>
    <noscript><style>{".page-loading-overlay{display:none!important}"}</style></noscript>
  </LoadingContext.Provider>;
}
