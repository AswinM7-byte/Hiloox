import Image from "next/image";

const artwork = {
  product: { src: "yona-product-orb", width: 1145, height: 1374, alt: "YONA wearing a headset and holding a glowing voice orb" },
  annotator: { src: "annotator", width: 1536, height: 1024, alt: "Violet voice orb surrounded by audio waves" },
  conversation: { src: "yona-conversation", width: 1374, height: 1145, alt: "YONA wearing a headset and holding a conversation panel" },
  welcome: { src: "yona-welcome", width: 1145, height: 1374, alt: "YONA giving a friendly thumbs-up" },
  ideas: { src: "yona-ideas", width: 1145, height: 1374, alt: "YONA with a bright idea" },
};

export default function BrandArtwork({ kind, priority = false, className = "" }) {
  const { src, width, height, alt } = artwork[kind];
  return <div className={`brand-artwork brand-artwork-${kind} ${className}`}>
    <Image src={`/images/${src}.webp`} width={width} height={height} alt={alt}
      priority={priority} sizes="(max-width: 900px) 90vw, 45vw" />
  </div>;
}
