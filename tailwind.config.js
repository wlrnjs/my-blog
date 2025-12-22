/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/widgets/**/*.{ts,tsx}",
    "./src/features/**/*.{ts,tsx}",
    "./src/entities/**/*.{ts,tsx}",
    "./src/shared/**/*.{ts,tsx}",
    "./src/content/**/*.{md,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
