/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'], // Professional font
    },
    extend: {
      colors: {
        navy: '#182B49',   // UCSD Navy (Background)
        blue: '#00629B',   // UCSD Blue (Panels)
        yellow: '#FFCD00', // UCSD Yellow (Accents)
        gold: '#C69214',   // UCSD Gold (Text/Borders)
        white: '#FFFFFF',
        black: '#000000',
      }
    },
  },
  plugins: [],
}
