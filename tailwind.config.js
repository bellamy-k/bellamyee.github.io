/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        databricks: {
          red: '#FF3621',
          DEFAULT: '#FF3621',
        }
      }
    },
  },
  plugins: [],
}

