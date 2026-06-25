/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1e40af', // Modern Fintech Blue
          light: '#60a5fa',
        },
        earth: {
          DEFAULT: '#78350f', // Professional Earthy Brown for Agriculture
          light: '#d97706',
        }
      }
    },
  },
  plugins: [],
}
