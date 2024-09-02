/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			fontFamily: {
				hand: ["'Bellandha'", "cursive", ...defaultTheme.fontFamily.sans],
				title: ["'Bellandha'", "cursive", ...defaultTheme.fontFamily.sans],
				sans: ["'Callingstone'", ...defaultTheme.fontFamily.sans],
			},
			animation: {
				ltr: "ltr 1.5s ease-out",
				rtl: "rtl 1.5s ease-out",
			},
			keyframes: {
				ltr: {
					"0%": {
						opacity: 0,
						transform: "translate(-80%)",
					},
					"75%": {
						opacity: 1,
					},
					"100%": {
						transform: "translate(0)",
					},
				},
				rtl: {
					"0%": {
						opacity: 0,
						transform: "translate(80%)",
					},
					"75%": {
						opacity: 1,
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
