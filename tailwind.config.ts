import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'rosa-blush': '#E8B4B8',
        'rosa-claro': '#F7E9EA',
        'creme-claro': '#FFF8F6',
        'marrom-rosado': '#6B4F4F',
        'marrom-forte': '#4A2F2F',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        'card': '0.75rem',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(107, 79, 79, 0.1)',
        'card-hover': '0 4px 16px rgba(107, 79, 79, 0.15)',
      },
    },
  },
  plugins: [],
};

export default config;
