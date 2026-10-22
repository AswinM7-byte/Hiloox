"use client";
import Image from "next/image";
import { attachBunnyMotion } from "@/lib/contact-bunny-motion";
import YonaEyes from "@/components/YonaEyes";
import { useEffect, useId, useRef } from "react";

function Grass() {
  const id = useId().replaceAll(":", "");
  return <svg className="contact-grass" viewBox="0 0 520 150" aria-hidden="true" focusable="false">
    <defs>
      <radialGradient id={id+"-ground"}><stop stopColor="#b49bea" stopOpacity=".55" /><stop offset="1" stopColor="#5836c8" stopOpacity="0" /></radialGradient>
      <linearGradient id={id+"-blade"} x2="0" y2="1"><stop stopColor="#dbc6ff" /><stop offset=".55" stopColor="#8b5cdd" /><stop offset="1" stopColor="#402278" /></linearGradient>
    </defs>
    <ellipse cx="260" cy="96" rx="250" ry="49" fill={"url(#"+id+"-ground)"} />
    <ellipse cx="260" cy="99" rx="173" ry="23" fill="#1d0c35" opacity=".5" />
    {[0, 1].map(layer => <g key={layer} opacity={layer ? .9 : .55}>
      {Array.from({ length: 39 }, (_, i) => {
        const x = 32 + i * 12, curve = Math.sin(i * 2.4 + layer) * 17;
        const base = 91 + Math.sin(i * .72) * 10 + layer * 17, height = 17 + (i * 13 % 31);
        return <path key={i} d={`M${x} ${base} Q${x-7} ${base-height*.55} ${x+curve} ${base-height} Q${x+8} ${base-height*.4} ${x+5} ${base}Z`} fill={"url(#"+id+"-blade)"} />;
      })}
    </g>)}
    {[0,1,2,3,4,5,6].map(i => <path key={i} d="M0-3 1-1 3 0 1 1 0 3-1 1-3 0-1-1Z" transform={`translate(${63+i*65} ${83+(i*19%29)})`} fill={i%2 ? "#fff8ff" : "#cdbbf8"} opacity=".65" />)}
  </svg>;
}

export default function ContactBunny() {
  const root = useRef(null);
  useEffect(() => attachBunnyMotion(root.current), []);
  return <div ref={root} className="contact-mascot-panel">
    <p className="contact-visual-title" data-contact-reveal>Contact Us</p>
    <div className="contact-character-stage">
      <Grass />
      <div className="contact-mascot" data-contact-reveal role="img" aria-label="YONA seated on lavender grass, wearing a headset and purple hoodie">
        <Image className="contact-mascot-body" src="/images/yona-seated.png" width={477} height={523} priority sizes="(max-width: 1000px) 240px, 330px" alt="" />
        <div className="contact-mascot-head"><Image src="/images/yona-seated.png" width={477} height={523} priority sizes="(max-width: 1000px) 240px, 330px" alt="" /><YonaEyes /></div>
      </div>
    </div>
  </div>;
}
