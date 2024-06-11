/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			fontFamily: {
				hand: ["Caveat", "cursive", ...defaultTheme.fontFamily.sans],
				indie: ['"Indie Flower"', "cursive", ...defaultTheme.fontFamily.sans],
			},
			animation: {
				appear: "appear 0.5s ease-in-out",
				ltr: "ltr 0.5s ease-out",
				rtl: "rtl 0.5s ease-out",
				ttb: "ttb 0.5s ease-out",
				btt: "btt 0.5s ease-out",
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
						transform: "translate(-50%)",
					},
					"100%": {
						transform: "translate(0)",
					},
				},
				rtl: {
					"0%": {
						transform: "translate(50%)",
					},
					"100%": {
						transform: "translate(0)",
					},
				},
				ttb: {
					"0%": {
						transform: "translate(0, -50%)",
					},
					"100%": {
						transform: "translate(0)",
					},
				},
				btt: {
					"0%": {
						transform: "translate(0, 50%)",
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
