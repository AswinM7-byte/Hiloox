"use client";
import { useId } from "react";

/** Live pupils sampled from the supplied purple-eye artwork, clipped inside
 * reconstructed sclera. This is a 2D facial layer, not a 3D eye rig. */
export default function YonaEyes() {
  const id = useId().replaceAll(":", "");
  return <svg className="contact-eye-layer" viewBox="0 0 477 523" aria-hidden="true">
    <defs>
      <radialGradient id={`${id}-white`}><stop offset="0" stopColor="#fff9fc" /><stop offset=".7" stopColor="#f6e6f2" /><stop offset="1" stopColor="#cba6c4" /></radialGradient>
      <clipPath id={`${id}-left`}><ellipse cx="176" cy="178" rx="19" ry="12.5" transform="rotate(-43 176 178)" /></clipPath>
      <clipPath id={`${id}-right`}><ellipse cx="247" cy="210" rx="22" ry="16" transform="rotate(-43 247 210)" /></clipPath>
      <clipPath id={`${id}-iris`}><ellipse cx="0" cy="0" rx="13" ry="17" /></clipPath>
    </defs>
    {[{ key: "left", x: 176, y: 178, scale: .9 }, { key: "right", x: 247, y: 210, scale: 1.1 }].map(eye => <g key={eye.key} clipPath={`url(#${id}-${eye.key})`}>
      <rect x={eye.x - 35} y={eye.y - 35} width="70" height="70" fill={`url(#${id}-white)`} />
      <g transform={`translate(${eye.x} ${eye.y})`}><g className="contact-pupil" style={{ transform: "translate(var(--gaze-x, 0px), var(--gaze-y, 0px))" }}><g transform={`rotate(25) scale(${eye.scale})`} clipPath={`url(#${id}-iris)`}>
        <image href="/images/yona-eyes.png" x="-38" y="-41" width="135.4" height="73.8" />
      </g></g></g>
    </g>)}
  </svg>;
}
