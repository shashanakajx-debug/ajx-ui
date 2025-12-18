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
        /* ===========================
           PRIMARY COLORS
           =========================== */
        primary: {
          DEFAULT: "#1A73E8",      // Light mode - AJX Blue
          light: "#4A8FEA",        // Lighter shade
          dark: "#1557B0",         // Darker shade
          50: "#EBF5FF",
          100: "#D6EBFF",
          200: "#ADD6FF",
          300: "#85C2FF",
          400: "#5CADFF",
          500: "#1A73E8",          // Main
          600: "#1557B0",
          700: "#104189",
          800: "#0B2C61",
          900: "#06163A",
        },
        
        /* ===========================
           SECONDARY COLORS
           =========================== */
        secondary: {
          DEFAULT: "#0A0A0A",      // Light mode - Deep Black
          light: "#4B5563",
          dark: "#000000",
        },
        
        /* ===========================
           ACCENT COLORS
           =========================== */
        accent: {
          DEFAULT: "#3A8DFF",      // Electric Blue
          light: "#6BA5FF",        // Lighter
          dark: "#2A7DE8",         // Darker
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3A8DFF",          // Main
          600: "#2A7DE8",
          700: "#1D6DD6",
          800: "#1E40AF",
          900: "#1E3A8A",
        },
        
        /* ===========================
           BACKGROUND COLORS
           =========================== */
        background: {
          DEFAULT: "#FFFFFF",      // Light mode
          dark: "#0B0E11",         // Dark mode main
          surface: "#F9FAFB",      // Light mode surface
          "surface-dark": "#161B22", // Dark mode surface
        },
        
        /* ===========================
           GRAY SHADES (Both Modes)
           =========================== */
        "soft-gray": {
          DEFAULT: "#F4F4F4",      // Light mode
          dark: "#1F2937",         // Dark mode
        },
        
        gray: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
          950: "#0B0E11",
        },
        
        /* ===========================
           DARK MODE SPECIFIC
           =========================== */
        darkmode: {
          primary: "#3A8DFF",      // Brighter blue
          secondary: "#E5E7EB",    // Light gray
          accent: "#60A5FA",       // Lighter accent
          bg: "#0B0E11",           // Main background
          surface: "#161B22",      // Cards/Surface
          "soft-gray": "#1F2937",  // Soft areas
          border: "#30363D",       // Borders
          "border-hover": "#424A53", // Border hover
        },
        
        /* ===========================
           TEXT COLORS
           =========================== */
        text: {
          DEFAULT: "#0A0A0A",      // Light mode primary
          secondary: "#4B5563",    // Light mode secondary
          muted: "#6B7280",        // Light mode muted
          light: "#F3F4F6",        // Dark mode primary
          "light-secondary": "#D1D5DB", // Dark mode secondary
          "dark-muted": "#9CA3AF", // Dark mode muted
        },
        
        /* ===========================
           BORDER COLORS
           =========================== */
        border: {
          DEFAULT: "#E5E7EB",      // Light mode
          hover: "#D1D5DB",        // Light mode hover
          dark: "#30363D",         // Dark mode
          "dark-hover": "#424A53", // Dark mode hover
        },
        
        /* ===========================
           STATUS COLORS (Both Modes)
           =========================== */
        success: {
          DEFAULT: "#10B981",
          light: "#34D399",
          dark: "#059669",
        },
        warning: {
          DEFAULT: "#F59E0B",
          light: "#FBBF24",
          dark: "#D97706",
        },
        error: {
          DEFAULT: "#EF4444",
          light: "#F87171",
          dark: "#DC2626",
        },
        info: {
          DEFAULT: "#3B82F6",
          light: "#60A5FA",
          dark: "#2563EB",
        },
      },
      
      /* ===========================
         FONT FAMILIES
         =========================== */
      fontFamily: {
        glacial: ["Glacial Indifference", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        sans: ["Montserrat", "sans-serif"],
        heading: ["Glacial Indifference", "sans-serif"],
      },
      
      /* ===========================
         FONT SIZES
         =========================== */
      fontSize: {
        // Headings
        "h1": ["64px", { lineHeight: "1.2", fontWeight: "700" }],
        "h1-lg": ["72px", { lineHeight: "1.2", fontWeight: "700" }],
        "h1-sm": ["48px", { lineHeight: "1.2", fontWeight: "700" }],
        "h1-xs": ["40px", { lineHeight: "1.2", fontWeight: "700" }],
        
        "h2": ["40px", { lineHeight: "1.2", fontWeight: "700" }],
        "h2-lg": ["48px", { lineHeight: "1.2", fontWeight: "700" }],
        "h2-sm": ["32px", { lineHeight: "1.2", fontWeight: "700" }],
        "h2-xs": ["28px", { lineHeight: "1.2", fontWeight: "700" }],
        
        "h3": ["28px", { lineHeight: "1.2", fontWeight: "700" }],
        "h3-lg": ["32px", { lineHeight: "1.2", fontWeight: "700" }],
        "h3-sm": ["24px", { lineHeight: "1.2", fontWeight: "700" }],
        "h3-xs": ["22px", { lineHeight: "1.2", fontWeight: "700" }],
        
        "h4": ["24px", { lineHeight: "1.3", fontWeight: "600" }],
        "h5": ["20px", { lineHeight: "1.4", fontWeight: "600" }],
        "h6": ["18px", { lineHeight: "1.4", fontWeight: "600" }],
        
        // Body text
        "body": ["16px", { lineHeight: "1.6" }],
        "body-lg": ["18px", { lineHeight: "1.6" }],
        "body-sm": ["14px", { lineHeight: "1.5" }],
        
        // Small text
        "small": ["14px", { lineHeight: "1.5" }],
        "xs": ["12px", { lineHeight: "1.4" }],
      },
      
      /* ===========================
         SPACING
         =========================== */
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '128': '32rem',
        '144': '36rem',
      },
      
      /* ===========================
         ANIMATIONS
         =========================== */
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "fade-in-down": "fadeInDown 0.6s ease-out",
        "slide-in-left": "slideInLeft 0.6s ease-out",
        "slide-in-right": "slideInRight 0.6s ease-out",
        "img-left": "img-anim-left 1.3s ease-out",
        "img-right": "img-anim-right 1.3s ease-out",
        "marquee": "marqueeAnimation 28.47s linear infinite",
        "spin-slow": "spin 3s linear infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 2s infinite",
      },
      
      /* ===========================
         KEYFRAMES
         =========================== */
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
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
      
      /* ===========================
         TRANSITION DURATIONS
         =========================== */
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      
      /* ===========================
         BOX SHADOWS
         =========================== */
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'primary': '0 4px 20px rgba(26, 115, 232, 0.25)',
        'primary-lg': '0 8px 30px rgba(26, 115, 232, 0.3)',
        'accent': '0 4px 20px rgba(58, 141, 255, 0.25)',
        'accent-lg': '0 8px 30px rgba(58, 141, 255, 0.3)',
        // Dark mode shadows
        'dark-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
        'dark-md': '0 4px 6px -1px rgba(0, 0, 0, 0.4)',
        'dark-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
        'dark-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.6)',
      },
      
      /* ===========================
         BORDER RADIUS
         =========================== */
      borderRadius: {
        'sm': '0.25rem',
        'DEFAULT': '0.375rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      
      /* ===========================
         Z-INDEX
         =========================== */
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      
      /* ===========================
         BACKDROP BLUR
         =========================== */
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;