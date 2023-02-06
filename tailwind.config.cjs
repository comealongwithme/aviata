const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.vue|ts'],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem'
      },
      gridTemplateColumns: {
        main: '240px 1fr',
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif', ...defaultTheme.fontFamily.sans],
        arial: ['Arial', ...defaultTheme.fontFamily.sans]
      },
      padding: {
        '11.5': '2.875rem',
        ...defaultTheme.padding
      }
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1172px',
      // => @media (min-width: 1024px) { ... }
    },
    colors: {
      white: '#ffffff',
      dark: {
        plain: '#000000',
        deep: '#202123'
      },
      gray: {
        DEFAULT: '#B9B9B9',
        pale: '#EBEBEB',
        light: '#F5F5F5',
        middle: '#E1E1E1',
        dark: '#707276'
      },
      orange: '#FF9900',
      blue: {
        DEFAULT: '#7284E4',
        pale: '#EAF0FA',
        deep: '#5763B3'
      },
      green: '#55BB06',
      red: '#FF3724CC'
    }
  },
  plugins: [],
}
