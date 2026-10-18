import Image from "next/image";
import Link from "next/link";
import { Linkedin, Instagram, Mail } from "lucide-react";
import Parallax from "@/components/Parallax";
import { DecorLayer, DecorCluster } from "@/components/Decor";
import { nav } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-[#0b0b14] text-white">
      <Parallax speed={-60} className="pointer-events-none absolute -inset-y-24 inset-x-0" smooth={false}>
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: "radial-gradient(50% 60% at 50% 0%, rgba(90,49,244,0.18), transparent 70%)",
          }}
        />
      </Parallax>
      {/* Two composed clusters rather than scattered single shapes */}
      <DecorLayer>
        <DecorCluster variant="c" size={320} speed={30} className="-right-20 -top-10 text-white/[0.12]" />
        <DecorCluster variant="b" size={250} speed={-22} className="-left-16 bottom-4 text-secondary/30" />
      </DecorLayer>

      <div className="container-page relative py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Image src="/images/logo-full.png" alt="Hiloox" width={132} height={32} className="h-8 w-auto brightness-0 invert" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/50">
              Hiloox Private Limited builds intelligent AI voice and WhatsApp agents that help
              businesses answer every customer, 24/7.
            </p>
            <p className="mt-5 text-xs text-white/35">
              Joseph Avenue, A20/153, M.S. Road, Krishancoil, Nagercoil, Tamil Nadu 629001, India
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a href="mailto:hello@hiloox.com" aria-label="Email" className="text-white/50 hover:text-secondary">
                <Mail size={18} />
              </a>
              <a href="https://www.linkedin.com/company/hilooxhq" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/50 hover:text-secondary">
                <Linkedin size={18} />
              </a>
              <a href="https://www.instagram.com/hilooxhq/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/50 hover:text-secondary">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40">Navigate</p>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/60 hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40">Legal</p>
            <ul className="mt-5 space-y-3">
              <li>
                <Link href="/privacy-policy" className="text-sm text-white/60 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-white/60 hover:text-white">
                  Terms and Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/35">© {new Date().getFullYear()} Hiloox Private Limited. All rights reserved.</p>
          <p className="text-xs text-white/35">Hello, Powered by AI.</p>
        </div>
      </div>
    </footer>
  );
}


