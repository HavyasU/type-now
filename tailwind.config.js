import textshadow from "tailwindcss-textshadow";

/** @type {import('tailwindcss').Config} */
export default config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textShadow: {
        // sm: "1px 1px 2px rgba(0,0,0,0.25)",
        // DEFAULT: "2px 2px 4px rgba(0,0,0,0.25)",
        // lg: "3px 3px 6px rgba(0,0,0,0.)",
        // white: "2px 2px 4px red",
        // "2xs": "1px 1px 1px rgba(0,0,0,0.15)",
      },
    },
  },
  plugins: [textshadow],
};
