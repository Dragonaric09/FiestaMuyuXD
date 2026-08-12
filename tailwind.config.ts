import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        typewriter: ["var(--font-typewriter)"],
      },
      // ... el resto de tu configuración de colores de shadcn
    },
  },
};

export default config;
