/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Bricolage Grotesque', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        forest: {
          deep: '#1a3c1a',
          mid: '#2d5a27',
          light: '#4c8c4a',
        },
        nature: {
          bg: '#f8f9f5',
        },
        soil: {
          rich: '#3d2b1f',
        },
        glass: {
          border: 'rgba(255, 255, 255, 0.4)',
        },
        secondary: '#43493e',
      },
      lineClamp: {
        2: '2',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'zoom-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in-from-bottom-6': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-from-bottom-10': {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  safelist: [
    'bg-forest-deep',
    'bg-forest-mid',
    'bg-forest-light',
    'text-forest-deep',
    'text-forest-mid',
    'text-forest-light',
    'border-glass-border',
    'bg-nature-bg',
    'text-secondary',
  ],
  plugins: [],
}
