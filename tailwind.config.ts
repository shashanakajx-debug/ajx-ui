import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light Mode Colors
        primary: {
          DEFAULT: "#1A73E8",  // AJX Blue
          light: "#4A8FEA",
          dark: "#1557B0",
        },
        secondary: {
          DEFAULT: "#0A0A0A",  // Deep Black
        },
        accent: {
          DEFAULT: "#3A8DFF",  // Electric Blue
          light: "#6BA5FF",
          dark: "#2A7DE8",
        },
        background: {
          DEFAULT: "#FFFFFF",
        },
        "soft-gray": "#F4F4F4",
        
        // Dark Mode Colors
        darkmode: {
          primary: "#0D1117",    // Deep Midnight Black
          secondary: "#1F2937",  // Slate Gray
          accent: "#3A8DFF",     // Electric Blue
          highlight: "#F3F6FF",  // Highlight White
        },
        
        // Text colors
        text: {
          DEFAULT: "#0A0A0A",
          muted: "#666666",
          light: "#F3F6FF",
          "dark-muted": "#9CA3AF",
        },
      },
      fontFamily: {
        glacial: ["Glacial Indifference", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      fontSize: {
        h1: ["64px", { lineHeight: "1.2", fontWeight: "700" }],
        "h1-lg": ["72px", { lineHeight: "1.2", fontWeight: "700" }],
        h2: ["40px", { lineHeight: "1.2", fontWeight: "700" }],
        "h2-lg": ["48px", { lineHeight: "1.2", fontWeight: "700" }],
        h3: ["28px", { lineHeight: "1.2", fontWeight: "700" }],
        "h3-lg": ["32px", { lineHeight: "1.2", fontWeight: "700" }],
        body: ["16px", { lineHeight: "1.6" }],
        "body-lg": ["18px", { lineHeight: "1.6" }],
        small: ["14px", { lineHeight: "1.5" }],
      },
      animation: {
        "img-left": "img-anim-left 1.3s ease-out",
        "img-right": "img-anim-right 1.3s ease-out",
        marquee: "marqueeAnimation 28.47s linear infinite",
      },
      keyframes: {
        "img-anim-left": {
          "0%": { transform: "translateX(-100px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "img-anim-right": {
          "0%": { transform: "translateX(100px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        marqueeAnimation: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      transitionDuration: {
        400: "400ms",
      },
      boxShadow: {
        'primary': '0 4px 20px rgba(26, 115, 232, 0.2)',
        'accent': '0 4px 20px rgba(58, 141, 255, 0.2)',
      },
    },
  },
  plugins: [],
};

export default config;