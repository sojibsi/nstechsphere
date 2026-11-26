import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: "var(--surface)",
        "surface-elevated": "var(--surface-elevated)",
        border: "var(--border)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        // Official NS TechSphere Palette
        brand: {
          navy: "#101C32",
          blue: "#1677FF",
          cyan: "#00C8D7",
          dark: "#0B1220",
          light: "#F5F8FC",
          secondary: "#64748B",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "-apple-system", "sans-serif"],
        bengali: ["Hind Siliguri", "Noto Sans Bengali", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.375rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(16, 28, 50, 0.08)",
        "glass-dark": "0 8px 32px 0 rgba(0, 200, 215, 0.05)",
        subtle: "0 1px 3px 0 rgba(16, 28, 50, 0.04), 0 1px 2px -1px rgba(16, 28, 50, 0.04)",
        elevated: "0 10px 25px -5px rgba(16, 28, 50, 0.08), 0 8px 10px -6px rgba(16, 28, 50, 0.04)",
        "brand-glow": "0 0 25px -5px rgba(22, 119, 255, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
