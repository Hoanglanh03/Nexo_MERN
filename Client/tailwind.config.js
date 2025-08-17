/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        10: "10px",
        12: "12px",
      },
      colors: {
        dark: {
          100: "#F8F7FA",
        },
        label: {
          100: "#4B465C",
        },
      },
    },
  },
  plugins: [],
};
