/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				cav: ['Caveat', 'cursive', ...defaultTheme.fontFamily.sans],
				indie: ['"Indie Flower"', 'cursive', ...defaultTheme.fontFamily.sans],
			},
			animation: {
				'appear': 'appear 0.8s ease-in-out',
				'ltr': 'ltr 0.8s linear',
				'rtl': 'rtl 0.8s linear',
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
			}
		},
	},
	plugins: [],
}
