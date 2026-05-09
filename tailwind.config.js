// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         // Dark theme palette matching QuranMazid
//         bg: {
//           primary: "#0f1117",
//           secondary: "#161b27",
//           tertiary: "#1e2436",
//           card: "#1a2035",
//           hover: "#232b42",
//         },
//         gold: {
//           DEFAULT: "#c9a84c",
//           light: "#e2c37a",
//           dark: "#a07a28",
//           muted: "#8a6a2a",
//         },
//         text: {
//           primary: "#e8e8e8",
//           secondary: "#a0a8b8",
//           muted: "#606880",
//           arabic: "#f0ece0",
//         },
//         border: {
//           DEFAULT: "#252d42",
//           light: "#2e3a56",
//         },
//         accent: {
//           green: "#2ecc8a",
//           blue: "#3b8bde",
//         },
//       },
//       fontFamily: {
//         arabic: ["var(--font-arabic-uthmani)", "Scheherazade New", "serif"],
//         "arabic-amiri": ["var(--font-amiri)", "Amiri", "serif"],
//         "arabic-scheherazade": ["var(--font-scheherazade)", "Scheherazade New", "serif"],
//         sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
//       },
//       fontSize: {
//         "arabic-sm": "1.5rem",
//         "arabic-base": "2rem",
//         "arabic-lg": "2.5rem",
//         "arabic-xl": "3rem",
//       },
//       lineHeight: {
//         arabic: "2.5",
//       },
//       backgroundImage: {
//         "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
//         "gold-shimmer": "linear-gradient(135deg, #c9a84c 0%, #e2c37a 50%, #c9a84c 100%)",
//       },
//       animation: {
//         "fade-in": "fadeIn 0.3s ease-in-out",
//         "slide-in": "slideIn 0.3s ease-out",
//         "pulse-gold": "pulseGold 2s ease-in-out infinite",
//       },
//       keyframes: {
//         fadeIn: {
//           "0%": { opacity: "0" },
//           "100%": { opacity: "1" },
//         },
//         slideIn: {
//           "0%": { transform: "translateX(-100%)", opacity: "0" },
//           "100%": { transform: "translateX(0)", opacity: "1" },
//         },
//         pulseGold: {
//           "0%, 100%": { boxShadow: "0 0 0 0 rgba(201, 168, 76, 0)" },
//           "50%": { boxShadow: "0 0 0 4px rgba(201, 168, 76, 0.2)" },
//         },
//       },
//     },
//   },
//   plugins: [],
// };
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "var(--bg-primary)",
          secondary: "var(--bg-secondary)",
          tertiary: "var(--bg-tertiary)",
          card: "var(--bg-card)",
          hover: "var(--bg-hover)",
        },
        gold: {
          DEFAULT: "var(--gold)",
          light: "var(--gold-light)",
          dark: "var(--gold-dark)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
          arabic: "var(--text-arabic)",
        },
        border: {
          DEFAULT: "var(--border)",
          light: "var(--border-light)",
        },
      },
    },
  },
  plugins: [],
};
