"use client";
import Image from "next/image";
import YonaEyes from "@/components/YonaEyes";
import { useEffect, useRef } from "react";

export default function ContactBunny() {
  const root = useRef(null);
  useEffect(() => {
    const panel = root.current, head = panel.querySelector(".contact-mascot-head"), mascot = panel.querySelector(".contact-mascot");
    const preference = matchMedia("(prefers-reduced-motion: reduce)"), fine = matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0, timer = 0, targetX = 0, targetY = 0, x = 0, y = 0, last = 0;
    const tick = now => {
      const factor = 1 - Math.exp(-Math.min(40, last ? now - last : 16) / 90); last = now;
      x += (targetX - x) * factor; y += (targetY - y) * factor;
      head.style.transform = `perspective(700px) translate(${x * 2}px, ${y * 1.5}px) rotateX(${-y * 6}deg) rotateY(${x * 9}deg) rotateZ(${x * 3}deg)`;
      head.style.setProperty("--gaze-x", `${x * 5}px`); head.style.setProperty("--gaze-y", `${y * 4}px`);
      if (Math.abs(x-targetX) + Math.abs(y-targetY) > .001) frame = requestAnimationFrame(tick);
      else { frame = 0; last = 0; }
    };
    const animate = () => { if (!frame) frame = requestAnimationFrame(tick); };
    const sparkle = () => {
      if (document.hidden || panel.querySelectorAll(".contact-cursor-star").length >= 10) return;
      const box = mascot.getBoundingClientRect(), rect = panel.getBoundingClientRect();
      const side = Math.random() < .5 ? -1 : 1;
      const star = document.createElement("span"); star.className = "contact-cursor-star"; star.setAttribute("aria-hidden", "true");
      star.style.left = `${box.left - rect.left + box.width * (side < 0 ? .13 : .87)}px`;
      star.style.top = `${box.top - rect.top + box.height * (.1 + Math.random() * .52)}px`;
      star.style.setProperty("--star-size", `${4 + Math.random() * 7}px`);
      star.style.setProperty("--star-turn", `${Math.random() * 70 - 35}deg`);
      star.style.setProperty("--star-drift", `${side * (12 + Math.random()*18)}px`);
      star.style.setProperty("--star-color", ["#ae6fff", "#d5b4ff", "#f4ebff"][Math.floor(Math.random()*3)]);
      star.addEventListener("animationend", () => star.remove(), {once:true}); panel.appendChild(star);
    };
    const enter = event => {
      if (event.pointerType !== "mouse" || preference.matches || !fine.matches) return;
      clearInterval(timer); sparkle(); timer = setInterval(sparkle, 210);
    };
    const leave = () => {
      clearInterval(timer); targetX = 0; targetY = 0; animate();
    };
    const disable = () => {
      leave();
      if (preference.matches || !fine.matches || document.hidden) {
        cancelAnimationFrame(frame); frame = 0; last = 0; x = 0; y = 0;
        head.style.transform = ""; head.style.setProperty("--gaze-x","0px"); head.style.setProperty("--gaze-y","0px");
        panel.querySelectorAll(".contact-cursor-star").forEach(star => star.remove());
      }
    };
    const move = event => {
      if (event.pointerType !== "mouse" || preference.matches || !fine.matches) return;
      const rect = panel.getBoundingClientRect();
      targetX = Math.max(-1,Math.min(1,(event.clientX-rect.left)/rect.width*2-1));
      targetY = Math.max(-1,Math.min(1,(event.clientY-rect.top)/rect.height*2-1)); animate();
    };
    panel.addEventListener("pointerenter",enter); panel.addEventListener("pointermove",move); panel.addEventListener("pointerleave",leave);
    preference.addEventListener("change",disable); fine.addEventListener("change",disable); document.addEventListener("visibilitychange",disable);
    const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) leave(); }); observer.observe(panel);
    return () => {
      clearInterval(timer); cancelAnimationFrame(frame); observer.disconnect(); panel.querySelectorAll(".contact-cursor-star").forEach(star => star.remove());
      panel.removeEventListener("pointerenter",enter); panel.removeEventListener("pointermove",move); panel.removeEventListener("pointerleave",leave);
      preference.removeEventListener("change",disable); fine.removeEventListener("change",disable); document.removeEventListener("visibilitychange",disable);
    };
  }, []);
  return <div ref={root} className="contact-mascot-panel">
    <h2 className="contact-visual-title">Contact Us</h2>
    <div className="contact-ambient" aria-hidden="true" />
    <div className="contact-mascot" role="img" aria-label="YONA seated in a violet glow, wearing a headset and purple hoodie">
      {/* Head and body retain matching source coordinates; the eye overlay is live. */}
      <Image className="contact-mascot-body" src="/images/yona-seated.png" width={477} height={523} priority sizes="(max-width: 760px) 300px, 40vw" alt="" />
      <div className="contact-mascot-head"><Image src="/images/yona-seated.png" width={477} height={523} priority sizes="(max-width: 760px) 300px, 40vw" alt="" /><YonaEyes /></div>
    </div>
    <div className="contact-grass" aria-hidden="true" /><div className="contact-ground" aria-hidden="true" />
  </div>;
}

