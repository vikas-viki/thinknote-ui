/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        'light-blue': '#E1F5FE',
        'light-red': '#FFEBEE',
        'light-purple': '#F3E5F5',
        'light-green': '#E8F5E8',
        'light-yellow': '#FFFDE7',
      }
    },
  },
  plugins: [],
};