/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  mode: "jit",
  theme: {
    fontSize: {
      xxs: ".7rem",
      xs: ".75rem",
      sm: ".875rem",
      tiny: ".875rem",
      base: "1rem",
      md: "1.05rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.5rem",
      "7xl": "5rem",
    },
    screens: {
      xs: "320px",
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }
      lgg: "1100px",
      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        darkPurple: "#0b031a",
        purplehaze:
          "linear-gradient(to right, rgb(107, 33, 168), rgb(76, 29, 149), rgb(107, 33, 168))",
        flatgray: "rgb(44, 44, 46)",
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        domine: ["Domine", ...defaultTheme.fontFamily.serif],
        fira: ["Fira Code", ...defaultTheme.fontFamily.sans],
        sen: ["Sen", ...defaultTheme.fontFamily.sans],
      },
      transitionProperty: {
        width: "width",
      },
      transitionDuration: {
        0: "0ms",
        2000: "2000ms",
      },
    },
  },
  safelist: [
    "bg-slate-900",
    "bg-green-800",
    "bg-violet-600",
    "text-slate-300",
    "text-violet-200",
    "text-green-200",
    ...[...Array(100).keys()].flatMap((i) => [`w-[${i}%]`]),
  ],
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/forms"),
    require("tailwind-scrollbar"),
  ],
};
