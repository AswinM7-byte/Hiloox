"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { nav } from "@/lib/content";
import { useScrolledPast } from "@/lib/hooks";

export default function Navbar() {
  const pathname = usePathname();
  const scrolled = useScrolledPast(12);
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const button = useRef(null);
  return <header className={`brand-nav ${scrolled ? "brand-nav-scrolled" : ""}`} onKeyDown={(event) => { if (event.key === "Escape" && open) { setOpen(false); button.current?.focus(); } }}>
    <div className="container-page brand-nav-inner">
      <Link href="/" aria-label="Hiloox home" onClick={() => setOpen(false)}><Image src="/images/logo-full.png" alt="Hiloox" width={244} height={80} priority className="brand-logo" /></Link>
      <nav aria-label="Main navigation" className="brand-desktop-nav">{nav.map((item) => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>{item.label}{pathname === item.href && <motion.span className="brand-nav-indicator" layoutId="route-indicator" transition={{ duration: reduced ? 0 : 0.25 }} />}</Link>)}</nav>
      <Link href="/products#demo" className="brand-nav-cta">Experience YONA</Link>
      <button className="brand-menu-toggle" ref={button} type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)}>{open ? <X /> : <Menu />}</button>
    </div>
    <nav id="mobile-navigation" aria-label="Mobile navigation" hidden={!open} className="brand-mobile-nav">{nav.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} aria-current={pathname === item.href ? "page" : undefined}>{item.label}</Link>)}<Link href="/products#demo" onClick={() => setOpen(false)}>Experience YONA </Link></nav>
  </header>;
}

