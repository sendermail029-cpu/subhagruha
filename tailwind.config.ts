import type { Config } from "tailwindcss";

// Brand colours taken from the Subhagruha logo
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#E11E26",
          "red-dark": "#B5151C",
          "red-soft": "#FDECEC",
          // NOTE: the "green" token names are kept for compatibility; they now hold the red + gold logo theme.
          green: "#8E1218",        // maroon – secondary buttons, links, top bar
          "green-dark": "#1F1414", // warm near-black – headings, dark text
          "green-deep": "#4A0A0D", // deep maroon – footer
          "green-soft": "#FDF1E4", // warm cream – chips, image placeholders
          gold: "#FCCC06",
          orange: "#F09C1E",
          leaf: "#1F8A4C",          // logo green – trust ticks, WhatsApp, approvals
          "leaf-dark": "#146B39",
          "leaf-soft": "#E8F6EE",
          cream: "#FFFAF3",
          ink: "#1F1414",
          muted: "#6B5E57",
          line: "#F0E2D2",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 20px 50px -24px rgba(74,10,13,.28)",
        glow: "0 12px 30px -10px rgba(225,30,38,.55)",
      },
      keyframes: {
        ticker: { to: { transform: "translateX(-50%)" } },
        fadeUp: { from: { opacity: "0", transform: "translateY(24px)" }, to: { opacity: "1", transform: "none" } },
      },
      animation: {
        ticker: "ticker 45s linear infinite",
        fadeUp: "fadeUp .9s cubic-bezier(.2,.7,.2,1) both",
      },
    },
  },
  plugins: [],
};
export default config;
