import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Openhouse brand
        brand: {
          orange: "#F2643D",
          cream: "#F9F2E8",
          charcoal: "#2C2B28",
          white: "#FFFFFF",
        },
        // Programme category colours
        category: {
          language: "#A3C996",
          music: "#7DBBE2",
          movement: "#EDAAB0",
          art: "#F3C520",
          stem: "#5B8FB9",
        },
        // Segment palette — single source of truth for segment-coloured
        // surfaces (overview, day plan, library, popups). Every component
        // should read from here via segmentPalette.ts rather than hardcoding
        // hex literals or off-brand Tailwind palette utilities.
        segment: {
          yellow: "#F3C520",
          green: "#A3C996",
          blue: "#7DBBE2",
          pink: "#EDAAB0",
          orange: "#F2643D",
        },
        // Skill accents for Art & Design L1 (derived, warm/earthy)
        skill: {
          lt: "#C56A3A", // Lines & Texture — earth/ochre
          sf: "#4A6B8A", // Shape & Form — slate blue
          cp: "#A33E3E", // Colour & Paint — brick red
          ie: "#5B7A4C", // Imagination & Expression — sage
          resp: "#8A7A4C", // Responsibility — olive
        },
        ink: {
          DEFAULT: "#2C2B28",
          muted: "#6B6B6B",
          subtle: "#A5A29B",
        },
        bg: {
          DEFAULT: "#F9F2E8",
          subtle: "#F2EADA",
          white: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: [
          '"Nunito"',
          '"Avenir Next Rounded Std"',
          '"SF Pro Rounded"',
          "system-ui",
          "sans-serif",
        ],
      },
      borderRadius: {
        card: "16px",
        chip: "999px",
      },
      boxShadow: {
        // Layered, soft shadows for a premium card surface — a tight
        // contact shadow, a mid soft halo, and a far diffused one so
        // surfaces feel grounded without a harsh edge.
        card: "0 1px 2px rgba(44, 43, 40, 0.04), 0 6px 16px -4px rgba(44, 43, 40, 0.06), 0 16px 32px -16px rgba(44, 43, 40, 0.06)",
        float: "0 2px 4px rgba(44, 43, 40, 0.04), 0 12px 28px -8px rgba(44, 43, 40, 0.10), 0 24px 48px -16px rgba(44, 43, 40, 0.08)",
        // Used by interactive cards on hover.
        lift: "0 4px 8px rgba(44, 43, 40, 0.05), 0 16px 32px -8px rgba(44, 43, 40, 0.10), 0 28px 56px -12px rgba(44, 43, 40, 0.10)",
      },
      maxWidth: {
        content: "480px", // mobile-first container
      },
    },
  },
  plugins: [],
};

export default config;
