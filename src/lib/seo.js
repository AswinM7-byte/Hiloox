export const siteUrl = "https://hiloox.com";

export function pageMetadata(path, title, description) {
  const url = new URL(path, siteUrl).href;
  const images = [{ url: "/images/logo-full.png", alt: "Hiloox" }];
  return {
    title, description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: "Hiloox", type: "website", locale: "en_US", images },
    twitter: { card: "summary", title, description, images: ["/images/logo-full.png"] },
  };
}
