import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        satoshi: ['var(--font-satoshi)'],
        bon_foyage: ['var(--font-bon_foyage)']
      },
      gridTemplateColumns: {
        fluid: 'repeat(auto-fit, minmax(339px, 1fr))'
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.hide_scrollbar': {
          'scrollbar-width': 'none',
          '-ms-overflow-style': 'none'
        },
        '.hide_scrollbar::-webkit-scrollbar': {
          'display': 'none'
        }
      })
    }
  ],
};
export default config;
