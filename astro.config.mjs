import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from "astro/config";
import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
	integrations: [tailwind(), alpinejs({ entrypoint: "/src/config/alpine" })],
	output: "server",
	adapter: vercel(),
});
