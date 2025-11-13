/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bordeaux: {
          50: '#fdf2f2',
          100: '#fce6e6',
          200: '#f9d0d0',
          300: '#f4a8a8',
          400: '#ed7777',
          500: '#e04d4d',
          600: '#c92a2a',
          700: '#a61e1e',
          800: '#8b1a1a',
          900: '#722F37',
          950: '#800020',
        },
      },
    },
  },
  plugins: [],
};
