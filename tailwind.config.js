/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Theme-aware tokens — driven by CSS variables in styles/themes.css.
        // Use bg-retro-bg, text-retro-fg, border-retro-border, etc.
        retro: {
          bg: "var(--retro-bg)",
          "bg-alt": "var(--retro-bg-alt)",
          fg: "var(--retro-fg)",
          "fg-dim": "var(--retro-fg-dim)",
          accent: "var(--retro-accent)",
          "accent-alt": "var(--retro-accent-alt)",
          border: "var(--retro-border)",
          "border-light": "var(--retro-border-light)",
          "border-dark": "var(--retro-border-dark)",
          panel: "var(--retro-panel)",
          chrome: "var(--retro-chrome)",
          "chrome-fg": "var(--retro-chrome-fg)",
          link: "var(--retro-link)",
          visited: "var(--retro-visited)",
          warn: "#FF0000",
        },
        // Legacy apple-* kept for in-flight pages so nothing visually shatters mid-migration.
        apple: {
          dark: "#000000",
          space: "#0a0a0a",
          silver: "var(--retro-fg)",
          gray: "var(--retro-fg-dim)",
        },
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', "monospace"],
        term: ['"VT323"', '"IBM Plex Mono"', "monospace"],
        mono: ['"IBM Plex Mono"', '"Courier Prime"', "monospace"],
        sys: ['"Tahoma"', '"MS Sans Serif"', "Geneva", "sans-serif"],
        sans: ['"Tahoma"', '"MS Sans Serif"', "Geneva", "sans-serif"],
      },
      boxShadow: {
        "bevel-out":
          "inset 1px 1px 0 var(--retro-border-light), inset -1px -1px 0 var(--retro-border-dark), inset 2px 2px 0 var(--retro-panel), inset -2px -2px 0 #000",
        "bevel-in":
          "inset 1px 1px 0 var(--retro-border-dark), inset -1px -1px 0 var(--retro-border-light), inset 2px 2px 0 #000, inset -2px -2px 0 var(--retro-panel)",
        glow: "0 0 6px var(--retro-accent), 0 0 14px var(--retro-accent)",
      },
    },
  },
  plugins: [],
};
