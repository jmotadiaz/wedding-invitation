/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface Window {
  Alpine: import("alpinejs").Alpine;
  htmx: any;
}

interface ImportMetaEnv {
  readonly POSTGRES_URL: string;
  // more env variables...
}
