"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function SolutionsHero({ children }) {
  const root = useRef(null);
  useEffect(() => {
    const element = root.current;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let observer;
    const reset = () => {
      observer?.disconnect();
      element.classList.remove("hero-reveal");
    };
    if (!preference.matches && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        element.classList.add("hero-reveal");
        observer.disconnect();
      }, { threshold: .12 });
      observer.observe(element);
    }
    preference.addEventListener("change", reset);
    return () => { reset(); preference.removeEventListener("change", reset); };
  }, []);
  return <section ref={root} className="brand-hero solutions-push-hero">
    <div className="container-page solutions-push-layout">
      <div className="solutions-mascot">
        <Image src="/images/yona-solutions.png" width={1145} height={1373} priority sizes="(max-width: 760px) 230px, (max-width: 1200px) 32vw, 420px" alt="YONA smiling in a purple hoodie and headset" />
        <span className="solutions-ground" aria-hidden="true" />
      </div>
      <div className="solutions-push-copy">{children}</div>
    </div>
  </section>;
}
