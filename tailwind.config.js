/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-main': '#143D8B',
        'brand-sub': '#4280EF',
        'brand-black': '#353535',
        'brand-white': '#ffffff',
        'brand-gray-1': '#D0D0D0',
        'brand-gray-2': '#B1B1B1',
        'brand-gray-3': '#AFAFAF',
        'brand-gray-4': '#696969',
      },
      boxShadow: {
        'brand-main-shadow': '0 3px 10px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
};
