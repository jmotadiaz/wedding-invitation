import type { ImageMetadata } from "astro";

export const getImage = (
  image: ImageMetadata,
  alt: string = ""
): { src: ImageMetadata; widths: number[]; sizes: string; alt: string } =>
  ({
    src: image,
    widths: [240, 540, 720, image.width],
    sizes: `(max-width: 360px) 240px, (max-width: 720px) 540px, (max-width: 1600px) 720px, ${image.width}px`,
    alt,
  } as const);
