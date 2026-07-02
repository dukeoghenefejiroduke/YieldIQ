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
        slate: {
          900: '#1E293B',
          600: '#475569',
        },
        green: {
          900: '#166534',
        },
        gray: {
          50: '#F1F5F9',
        },
        background: {
          DEFAULT: '#1E293B', // Deep Slate
          card: '#475569',   // Clay/Muted Earth
        },
        text: {
          primary: '#F1F5F9', // High-visibility
          secondary: '#F1F5F9',
          muted: '#CBD5E1',
        },
        alert: {
          danger: '#EF4444',
          success: '#22C55E',
        },
      },
    },
  },
  plugins: [],
}
