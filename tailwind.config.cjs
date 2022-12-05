/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      strokeWidth: {
        '2.5': '3px',
        '.5': '.5px',
      }
    },
    fontFamily: {
      sans: ['Inter var', ...defaultTheme.fontFamily.sans],
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }

      '3xl': '2560px',
      // => @media (min-width: 1782px) { ... }
    },
  },
  plugins: [
    require("tailwindcss-scoped-groups"),
  ],
};
