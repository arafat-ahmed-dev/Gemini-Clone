/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        expandWidth: {
          '0%': {
            width: '0%', // Start with 0 width
            opacity: 0,  // Optional: Start with 0 opacity
          },
          '100%': {
            width: '100%', // End with full width
            opacity: 1,    // Optional: End with full opacity
          },
        },
      },
      animation: {
        expandWidth: 'expandWidth 2s ease-in-out infinite', // Infinite animation
      },
    },
  },
  plugins: [],
}