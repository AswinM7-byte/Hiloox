import { siteUrl } from "@/lib/seo";

export const dynamic = "force-static";
export default function sitemap() {
  return ["/", "/products", "/solutions", "/about", "/contact", "/privacy-policy", "/terms"].map(path => ({ url: new URL(path, siteUrl).href }));
}
