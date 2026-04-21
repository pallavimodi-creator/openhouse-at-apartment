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
          orange: "#F25E35",
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
        card: "0 1px 2px rgba(44, 43, 40, 0.04), 0 4px 12px rgba(44, 43, 40, 0.04)",
        float: "0 4px 16px rgba(44, 43, 40, 0.08)",
      },
      maxWidth: {
        content: "480px", // mobile-first container
      },
    },
  },
  plugins: [],
};

export default config;
