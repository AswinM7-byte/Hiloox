"use client";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

export default function BrandVideo({ kind, priority = false }) {
  const root = useRef(null), video = useRef(null);
  const [allowed, setAllowed] = useState(false);
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(priority);
  const poster = "/videos/yona-sphere-alpha-poster.webp";
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAllowed(!preference.matches);
    update(); preference.addEventListener("change", update);
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (entry.isIntersecting) setLoaded(true);
    }, { threshold: 0.05 });
    observer.observe(root.current);
    return () => { observer.disconnect(); preference.removeEventListener("change", update); };
  }, []);
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const update = () => {
      if (allowed && visible && !paused && !document.hidden) element.play().catch(() => setPaused(true));
      else element.pause();
    };
    update(); document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, [allowed, visible, paused, loaded]);
  return <figure ref={root} className={`brand-video brand-video-${kind}`}>
    <div className="brand-video-frame">
      {/* Always present for no-JS, reduced-motion and playback-error fallback. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="brand-video-media" src={poster} width="1280" height="720" alt={kind === "annotator" ? "A luminous violet voice orb" : "YONA bunny wearing a purple hoodie and headset"} fetchPriority={priority ? "high" : "auto"} loading={priority ? "eager" : "lazy"} />
      {allowed && loaded && !failed && <video ref={video} className={`brand-video-media video-layer ${ready ? "is-ready" : ""}`} src="/videos/yona-sphere-alpha.webm" poster={poster} width="1280" height="720" autoPlay muted loop playsInline preload={priority ? "auto" : "metadata"} aria-hidden="true" tabIndex={-1} onLoadedData={() => {
        // A browser that decodes VP9 without its alpha track gets the transparent poster.
        const canvas = document.createElement("canvas"); canvas.width = 1; canvas.height = 1;
        const context = canvas.getContext("2d", { willReadFrequently: true });
        if (!context) { setFailed(true); return; }
        try { context.drawImage(video.current, 0, 0, 1, 1, 0, 0, 1, 1); if (context.getImageData(0, 0, 1, 1).data[3] > 10) setFailed(true); else setReady(true); }
        catch { setFailed(true); }
      }} onError={() => setFailed(true)} />}
    </div>
    <figcaption className="annotator-caption"><span>YONA / {kind === "annotator" ? "Voice intelligence" : "Your next team player"}</span><button type="button" disabled={!allowed || failed} aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? <Play size={13} /> : <Pause size={13} />}{!allowed || failed ? "Still visual" : paused ? "Play motion" : "Pause motion"}</button></figcaption>
  </figure>;
}
