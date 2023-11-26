/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        green: {
          500: '#31C292',
        },
        blue: {
          100: '#E7F9FB',
        },
        coral: {
          600: '#F27669',
        },
        gray: {
          400: '#B9B5B5',
          500: '#808080',
        },
        mist: {
          100: '#E1FAFF',
        },
      },
    },
  },
  plugins: [],
};
