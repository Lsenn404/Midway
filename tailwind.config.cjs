/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.html",
    "./src/**/*.vue",
    "./src/**/*.jsx",
    "./src/**/*.js",
    "./src/**/*.ts",
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      fontFamily: {
        "delicious-handrawn": ["Delicious Handrawn", "cursive"],
        "fuzzy-bubbles": ["Fuzzy Bubbles", "cursive"],
        righteous: ["Righteous", "cursive"],
      },
    },
  },
  plugins: [],
};
