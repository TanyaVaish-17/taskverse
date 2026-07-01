/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['Fraunces', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        base: {
          950: '#0e0d0c',
          900: '#161412',
          800: '#221f1c',
          700: '#332e29',
          600: '#4a433c',
        },
        accent: {
          400: '#ff9d6f',
          500: '#ff7a45',
          600: '#e85f2b',
        },
        priority: {
          low: '#7fb069',
          medium: '#e8c547',
          high: '#e85f45',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}