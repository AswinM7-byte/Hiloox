import localFont from "next/font/local";
import "./globals.css";
import "./brand-theme.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgress from "@/components/ScrollProgress";
import SmoothScroll from "@/components/SmoothScroll";
import { pageMetadata, siteUrl } from "@/lib/seo";

const geom = localFont({
  variable: "--font-geom",
  src: "../../public/fonts/geom-variable.ttf",
  weight: "300 900",
  display: "swap",
});

export const metadata = {
  ...pageMetadata("/", "Hiloox — YONA AI Voice Agent", "Explore YONA, Hiloox’s AI voice agent for business conversations, customer enquiries, and connected workflows."),
  metadataBase: new URL(siteUrl),
  icons: {
    icon: "/images/icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geom.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-ink selection:bg-primary-light">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Hiloox Private Limited",
              url: "https://hiloox.com",
              "@id": "https://hiloox.com/#organization",
              email: "hello@hiloox.com",
              slogan: "Hello, Powered by AI.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Joseph Avenue, A20/153, M.S. Road, Krishancoil",
                addressLocality: "Nagercoil",
                addressRegion: "Tamil Nadu",
                postalCode: "629001",
                addressCountry: "IN",
              },
            }),
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebSite", "@id": "https://hiloox.com/#website", url: "https://hiloox.com", name: "Hiloox", publisher: { "@id": "https://hiloox.com/#organization" } }) }} />
        <a href="#main-content" className="skip-link">Skip to content</a>
        <SmoothScroll>
          <ScrollProgress />
          <Navbar />
          <main id="main-content" tabIndex={-1} className="flex-1">{children}</main>
          <Footer />
          <ScrollToTop />
        </SmoothScroll>
      </body>
    </html>
  );
}


