/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#182535",
        secondary: "#B4C6CC",
        accent: "#E1E1E1",
        background: "#FFFFFF",
        text_gray: "#B2B2B2",
      },
    },
  },
  plugins: [],
};
