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
        // Nova Paleta Terracota
        'terracota': '#742615',
        'terracota-claro': '#a85a3a',           // Hover state (bem mais claro)
        'terracota-escuro': '#5f1f11',          // Active state
        'areia': '#c89e82',
        'areia-clara': '#d4b09a',               // Hover state
        'areia-escura': '#b88a6a',              // Bordas e detalhes
        'background-principal': '#f6f4f0',
        'background-card': '#ffffff',
        
        // Manter aliases para compatibilidade durante transição
        'verde-tulipa': '#742615',
        'verde-tulipa-claro': '#a85a3a',
        'verde-tulipa-escuro': '#5f1f11',
        'beje-tulipa': '#c89e82',
        'beje-tulipa-claro': '#d4b09a',
        'beje-tulipa-escuro': '#b88a6a',
        'rosa-tulipa': '#742615',
        'rosa-tulipa-claro': '#a85a3a',
        'rosa-tulipa-escuro': '#5f1f11',
        'off-white-rosado': '#f6f4f0',
        'marrom-escuro': '#742615',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        'card': '0.75rem',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(116, 38, 21, 0.1)',
        'card-hover': '0 4px 16px rgba(116, 38, 21, 0.15)',
        'card-tulipa': '0 2px 8px rgba(116, 38, 21, 0.1)',
        'card-tulipa-hover': '0 4px 16px rgba(116, 38, 21, 0.15)',
      },
    },
  },
  plugins: [],
};

export default config;
