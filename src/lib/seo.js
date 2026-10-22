export const siteUrl = "https://hiloox.com";

export function pageMetadata(path, title, description) {
  const url = new URL(path, siteUrl).href;
  const image = new URL("/images/logo-full.png", siteUrl).href;
  const images = [{ url: image, width: 500, height: 500, alt: "Hiloox" }];
  return {
    title, description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: "Hiloox", type: "website", locale: "en_US", images },
    twitter: { card: "summary", title, description, images: [image] },
  };
}
