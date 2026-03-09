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
        // Nova Paleta Tulipas
        'verde-tulipa': '#4d5f2f',
        'verde-tulipa-claro': '#5d6f3f',        // Ajustado para contraste 4.5:1
        'verde-tulipa-escuro': '#3d4f1f',
        'beje-tulipa': '#cec683',
        'beje-tulipa-claro': '#ddd69a',
        'beje-tulipa-escuro': '#e8e0a8',        // Para links no footer
        'rosa-tulipa': '#c80c66',
        'rosa-tulipa-claro': '#c21a6a',         // Ajustado para contraste 4.5:1
        'rosa-tulipa-escuro': '#a00a52',
        'off-white-rosado': '#fff8f6',
        'marrom-escuro': '#4a2f2f',
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
        'card-tulipa': '0 2px 8px rgba(77, 95, 47, 0.1)',
        'card-tulipa-hover': '0 4px 16px rgba(77, 95, 47, 0.15)',
      },
    },
  },
  plugins: [],
};

export default config;
