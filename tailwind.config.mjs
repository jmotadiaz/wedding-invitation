/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			fontFamily: {
				hand: ["'Dancing Script'", "cursive", ...defaultTheme.fontFamily.sans],
			},
			animation: {
				appear: "appear 0.5s ease-in-out",
				ltr: "ltr 0.7s ease-out",
				rtl: "rtl 0.7s ease-out",
			},
			keyframes: {
				appear: {
					"0%": {
						opacity: "0",
					},
					"100%": {
						opacity: "1",
					},
				},
				ltr: {
					"0%": {
						transform: "translate(-80%)",
					},
					"100%": {
						transform: "translate(0)",
					},
				},
				rtl: {
					"0%": {
						transform: "translate(80%)",
					},
					"100%": {
						transform: "translate(0)",
					},
				},
			},
		},
	},
	plugins: [],
};
