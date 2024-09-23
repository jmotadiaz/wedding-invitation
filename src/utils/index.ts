import type { ImageMetadata } from "astro";

export interface FormDataWrapper {
  get(key: string): string;
  getAll(key: string): string[];
  getFile(key: string): File | null;
  has(key: string): boolean;
}

export const createFormDataWrapper = (formData: FormData): FormDataWrapper => ({
  get: (key) => (formData.get(key) as string) || "",
  getAll: (key) => formData.getAll(key).map((value) => (value as string) || ""),
  getFile: (key) => (formData.get(key) as File) || null,
  has: (key) => formData.has(key),
});

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

export const arrayFrom = (n: number): number[] =>
  Array.from({ length: n }, (_, i) => i + 1);

export const booleanToText = (value: boolean) => (value ? "SI" : "NO");

export const show = (
  properties?: astroHTML.JSX.CSSProperties
): astroHTML.JSX.CSSProperties =>
  ({
    ...properties,
    opacity: 1,
  } as const);

export const translate = (
  properties?: astroHTML.JSX.CSSProperties
): astroHTML.JSX.CSSProperties =>
  ({
    ...properties,
    transform: "translateY(0)",
  } as const);

export const onIntersect = (
  properties: astroHTML.JSX.CSSProperties
): { [":style"]: string } => ({
  ":style": `shown && ${JSON.stringify(properties)}`,
});
