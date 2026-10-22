import { pageMetadata } from "@/lib/seo";
import Contact from "@/components/Contact";
import "./contact.css";
export const metadata = pageMetadata("/contact", "Contact Hiloox — Let’s Build What’s Next", "Discuss YONA, business integrations, custom AI requirements, or partnerships with Hiloox.");
export default function ContactPage() { return <div className="brand-page contact-page"><Contact /></div>; }
