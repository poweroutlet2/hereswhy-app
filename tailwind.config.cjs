/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      strokeWidth: {
        '2.5': '3px',
        '.5': '.5px',
      }
    },
  },
  plugins: [],
};
