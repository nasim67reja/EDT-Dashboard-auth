const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      primary: "#007EE1",
      secondary: "#777777",
      bgPrimary: "#FAFAFC",
      textColor: "#202020",
    },
  },
  plugins: [],
});
