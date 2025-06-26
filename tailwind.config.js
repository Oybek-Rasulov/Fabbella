/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}", // Make sure Tailwind scans all source files
    ],
    theme: {
      extend: {
        colors: {
          primary: "#ff66c4", // Example custom color
        },
        fontFamily: {
          sans: ['"SUSE"', 'sans-serif'], // If using Google Fonts
        },
      },
    },
    plugins: [],
  };
  