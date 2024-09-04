import type { ImageMetadata } from "astro";

export const getImage = (
  image: ImageMetadata,
  alt: string = ""
): { src: ImageMetadata; widths: number[]; sizes: string; alt: string } =>
  ({
    src: image,
    widths: [420, 640, 768, image.width],
    sizes: `(max-width: 420px) 420px, (max-width: 640px) 640px, (max-width: 768px) 768px, ${image.width}px`,
    alt,
  } as const);
