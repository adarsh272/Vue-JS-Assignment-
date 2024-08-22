/** @type {import('tailwindcss').Config} */
export default {
  //tailwind will affect all the files/folders listed below
  content: ['./index.html', './src/**/*.{vue, js, ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}

