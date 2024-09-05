/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			fontFamily: {
				hand: ["'Alloystan'", "cursive", ...defaultTheme.fontFamily.sans],
				title: ["'Alloystan'", "cursive", ...defaultTheme.fontFamily.sans],
				sans: ["'Jost'", ...defaultTheme.fontFamily.sans],
			},
			fontSize: {
				sm: '1rem',
				base: '1.20rem',
				lg: '1.30rem',
				xl: '1.50rem',
				'2xl': '1.663rem',
				'3xl': '2.053rem',
				'4xl': '2.541rem',
				'5xl': '3.152rem',
				'base-hand': ['2.20rem', {
					lineHeight: '1.5rem',
				}],
				'hand-lg': ['3.20rem', {
					lineHeight: '2.50rem',
				}],
				'hand-xl': ['4rem', {
					lineHeight: '3rem',
				}],
				'hand-2xl': ['5rem', {
					lineHeight: '4rem',
				}],
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
