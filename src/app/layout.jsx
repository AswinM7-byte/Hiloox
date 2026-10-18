import localFont from "next/font/local";
import "./globals.css";
import "./brand-theme.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgress from "@/components/ScrollProgress";
import LoadingProvider from "@/components/LoadingProvider";
import SmoothScroll from "@/components/SmoothScroll";

const geom = localFont({
  variable: "--font-geom",
  src: "../../public/fonts/geom-variable.ttf",
  weight: "300 900",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://hiloox.com"),
  title: "Hiloox — AI Voice & WhatsApp Agents | Hello, Powered by AI.",
  description:
    "Deploy intelligent AI voice and WhatsApp agents that answer customers instantly, automate conversations, qualify leads, and work 24/7. Hiloox — Hello, Powered by AI.",
  keywords: [
    "AI phone agent",
    "AI WhatsApp agent",
    "voice AI",
    "conversational AI",
    "customer support automation",
    "Hiloox",
  ],
  openGraph: {
    title: "Hiloox — AI Agents That Never Miss a Conversation",
    description:
      "Deploy intelligent AI voice and WhatsApp agents that answer customers instantly and work 24/7.",
    type: "website",
    images: ["/images/logo-full.png"],
  },
  twitter: {
    card: "summary_large_image",
  },
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
        <LoadingProvider><a href="#main-content" className="skip-link">Skip to content</a>
        <SmoothScroll>
          <ScrollProgress />
          <Navbar />
          <main id="main-content" tabIndex={-1} className="flex-1">{children}</main>
          <Footer />
          <ScrollToTop />
        </SmoothScroll></LoadingProvider>
      </body>
    </html>
  );
}


