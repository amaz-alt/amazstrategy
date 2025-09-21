import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#f0fdf4', // green-50
          DEFAULT: '#22c55e', // green-500
          medium: '#16a34a', // green-600
          dark: '#15803d',   // green-700
          darkest: '#14532d',// green-900
        },
      }
    }
  },
  plugins: [],
};
