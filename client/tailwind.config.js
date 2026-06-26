/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: '#1B4D3E',
        secondary: '#F4B942',
        background: {
          DEFAULT: '#F8FAF9',
          card: '#FFFFFF',
        },
        text: {
          primary: '#1E1E1E',
          secondary: '#5A6B66',
          muted: '#9AA6A2',
        },
        alert: {
          danger: '#D95B43',
          success: '#2E9E6F',
        },
      },
    },
  },
  plugins: [],
}
