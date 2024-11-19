/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  safelist: [
    "grid",
    "gap-",
    "p-",
    "grid-cols-"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

