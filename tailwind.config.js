/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        griffiths: ['Griffiths', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
        gilroy: ['Gilroy', 'sans-serif'],
      },
    },
  },
  plugins: [require("daisyui")],
}

