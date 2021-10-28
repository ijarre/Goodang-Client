const colors = require("tailwindcss/colors");

module.exports = {
  // mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      btn: "#97B3FB",
      dongker: "#202938",
      main: "#F3F7FF",
      navbar: "#E8ECF4",
      orange: "#FFE0B2",
      copy: "#332C2B",
      transparent: "transparent",
      current: "currentColor",
      green: colors.green,
      black: colors.black,
      blue: colors.blue,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      blue: colors.blue,
      red: colors.rose,
      yellow: colors.amber,
      green: colors.green,
      lime: colors.lime,
      violet: colors.violet,
    },
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
    },
    container: {
      center: true,
      padding: "1rem",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
