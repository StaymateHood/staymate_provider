/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#E6F4F5',
          100: '#CDE9EB',
          500: '#0E7C86',
          600: '#0B6870',
          700: '#09545B',
          800: '#073F45',
        },
        ink: {
          DEFAULT: '#0F172A',
          muted: '#64748B',
          soft: '#94A3B8',
        },
        surface: '#F1F5F6',
        line: '#E2E8F0',
      },
      fontFamily: {
        pregular: ['Poppins-Regular'],
        psemibold: ['Poppins-SemiBold'],
        pbold: ['Poppins-Bold'],
      },
    },
  },
  plugins: [],
};
