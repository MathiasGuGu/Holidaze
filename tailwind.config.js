/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: {
          DEFAULT: "#10172A",
        },
        background: {
          DEFAULT: "hsl(240, 20%, 95%)",
        },
        primary: {
          dark: "#0A247A",
          DEFAULT: "#3784FF",
          light: "#D7ECFF",
        },
        danger: {
          dark: "#7A0824",
          DEFAULT: "#FF3F2D",
          light: "#FFC6AB",
        },
        success: {
          dark: "#085A41",
          DEFAULT: "#2DBC58",
          light: "#ACF8AD",
        },
        warning: {
          light: "#FDFAA3",
          DEFAULT: "#F2E71A",
          dark: "#746C04",
        },
      },
      fontFamily: {
        para: ["Figtree", "sans-serif"],
        title: ["Sora", "sans-serif"],
      },
    },
  },
  plugins: [],
};
