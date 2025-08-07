import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
	darkMode: ["class", "class"],
	content: [
		"./app/**/*.{ts,tsx}",
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	theme: {
		extend: {
			colors: {
				border: "hsl(217 32.6% 17.5%)",
				input: "hsl(217 32.6% 17.5%)",
				ring: "hsl(217 100% 35%)",
				background: "hsl(0 0% 100%)",
				foreground: "hsl(222.2 84% 4.9%)",
				primary: {
					DEFAULT: "#043873",
					main: "#043873",
					secondary: "#4f9cf9",
				},
				text1: "white",
				text2: "black",
				card: {
					DEFAULT: "hsl(0 0% 100%)",
					foreground: "hsl(222.2 84% 4.9%)",
				},
				popover: {
					DEFAULT: "hsl(0 0% 100%)",
					foreground: "hsl(222.2 84% 4.9%)",
				},
				secondary: {
					DEFAULT: "hsl(210 40% 96.1%)",
					foreground: "hsl(222.2 84% 4.9%)",
				},
				muted: {
					DEFAULT: "hsl(210 40% 96.1%)",
					foreground: "hsl(215.4 16.3% 46.9%)",
				},
				accent: {
					DEFAULT: "hsl(210 40% 96.1%)",
					foreground: "hsl(222.2 84% 4.9%)",
				},
				destructive: {
					DEFAULT: "hsl(0 84.2% 60.2%)",
					foreground: "hsl(210 40% 98%)",
				},
			},
			fontFamily: {
				sans: ["var(--font-sans)", ...fontFamily.sans],
			},
			keyframes: {
				"accordion-down": {
					from: {
						height: "0",
					},
					to: {
						height: "var(--radix-accordion-content-height)",
					},
				},
				"accordion-up": {
					from: {
						height: "var(--radix-accordion-content-height)",
					},
					to: {
						height: "0",
					},
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
