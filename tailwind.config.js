/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./frontend/index.html",
    "./frontend/src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#5a189a',
        secondary: '#a446ff',
        light: '#debcff',
        dark: '#1e0834',
      }
    },
  },
  plugins: [],
}
