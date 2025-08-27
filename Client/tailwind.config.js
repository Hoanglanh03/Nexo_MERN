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
          100: "#4B465C",
          200: "#F8F7FA",
          300: "#DBDADE",
        },
        label: {
          100: "#4B465C",
        },
        primary: {
          main: "#246AA3",
        },
        background: {
          main: "#F8F7FA",
        },
      },
    },
  },
  plugins: [],
};
