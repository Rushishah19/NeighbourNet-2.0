/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Custom colors for the header or other UI elements
        'indigo-600': '#5A67D8',
        'purple-600': '#805AD5',
        'pink-600': '#ED64A6',
      },
      animation: {
        'move-slow': 'move 10s infinite linear',
        'move-fast': 'move 5s infinite linear',
        'spin-slow': 'spin 15s infinite linear',
        pulse: 'pulse 2s infinite',
        bounce: 'bounce 2s infinite',
      },
      keyframes: {
        move: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(20px)' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};