import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      colors: {
        appTheme: {
          text: "#0e0a0f",
          background: "#fcf9fc",
          primary: "#a939c8",
          secondary: "#d47eed",
          accent: "#d44df9",
        },
      },
    },
  },
  plugins: [],
}) satisfies Config;
