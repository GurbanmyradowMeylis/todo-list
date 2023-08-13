/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./**/*.{html,js,svg}"],
  theme: {
    extend: {
      borderRadius: {
        "1xl": "22px",
      },
      borderWidth: {
        1: "1px",
      },
      dropShadow: {
        xsm: "5px 5px 10px #000000",
      },
    },
  },
  plugins: [],
};
