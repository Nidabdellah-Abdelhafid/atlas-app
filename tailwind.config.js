/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        ginger: ['Ginger', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [require("daisyui")],
}

