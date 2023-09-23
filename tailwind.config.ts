const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/assets/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    colors: {
      "app-red": "hsl(0, 97%, 63%)",
      "app-dark-blue": "hsl(223, 30%, 9%)",
      "app-semi-dark-blue": "hsl(223, 36%, 14%)",
      "app-greyish-blue": "hsl(223, 23%, 46%)",
      "app-grey": "hsla(0, 0%, 100%, 0.749)",
      "app-placeholder": "hsl(223, 3%, 54%)",
      "app-white": "hsl(0, 0%, 100%)",
      "app-black": "hsl(0, 0%, 0%)",
    },
    fontFamily: {
      sans: ["Outfit", ...defaultTheme.fontFamily.sans],
    },
    fontSize: {
      "app-heading-lg": "var(--font-heading-lg)",
      "app-heading-md": "var(--font-heading-md)",
      "app-heading-sm": "var(--font-heading-sm)",
      "app-body-md": "var(--font-body-md)",
      "app-body-sm": "var(--font-body-sm",
      "app-body-xsm": "var(--font-body-xsm",
    },
    gridTemplateColumns: {
      main: "auto, 1fr",
      "cards-mobile": "repeat(auto-fill, minmax(210px, 1fr))",
      "cards-tablet": "repeat(auto-fill, minmax(220px, 1fr))",
      "cards-desktop": "repeat(auto-fill, minmax(280px, 1fr))",
    },
  },
  plugins: [],
};
