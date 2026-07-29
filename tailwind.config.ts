import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#12161C",
          soft: "#181D25",
          surface: "#1B2028",
          raised: "#232933",
          line: "#2A313D",
        },
        paper: {
          DEFAULT: "#E8E6E1",
          dim: "#9AA0AC",
          faint: "#5B6472",
        },
        ribbon: {
          DEFAULT: "#F2A65A",
          bright: "#FFC27A",
          dim: "#8A6538",
        },
        sage: {
          DEFAULT: "#7FB77E",
          dim: "#4E6E4D",
        },
        brick: {
          DEFAULT: "#E0625B",
          dim: "#7A3936",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      keyframes: {
        blink: {
          "0%, 55%": { opacity: "1" },
          "56%, 100%": { opacity: "0" },
        },
        rise: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        strike: {
          "0%": { transform: "translateX(0) rotate(0deg)" },
          "50%": { transform: "translateX(2px) rotate(-2deg)" },
          "100%": { transform: "translateX(0) rotate(0deg)" },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        rise: "rise 0.4s ease-out",
        strike: "strike 0.15s ease-in-out",
      },
    },
  },
  plugins: [],
};
export default config;
