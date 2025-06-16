/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1A5276",
          50: "#E8F1F8",
          100: "#C6DDF0",
          200: "#9BC5E3",
          300: "#6FAED7",
          400: "#4496CA",
          500: "#307FB0",
          600: "#1A5276",
          700: "#154360",
          800: "#0F2F42",
          900: "#09202D",
        },
        secondary: {
          DEFAULT: "#F7B955",
          50: "#FEF4E6",
          100: "#FEECD3",
          200: "#FBDAA3",
          300: "#F9C774",
          400: "#F7B955",
          500: "#F5A726",
          600: "#DD8B09",
          700: "#AC6C07",
          800: "#7B4D05",
          900: "#4A2E03",
        },
        accent: {
          DEFAULT: "#C0392B",
          50: "#F8D6D3",
          100: "#F4B8B2",
          200: "#EC9A91",
          300: "#E47C70",
          400: "#DC5E4F",
          500: "#C0392B",
          600: "#962C22",
          700: "#6C2019",
          800: "#421310",
          900: "#180706",
        },
      },
      fontFamily: {
        title: ["Bebas Neue", "Inter", "sans-serif"], // si tu veux accent fort
      },
      boxShadow: {
        smooth: "0 4px 20px rgba(0, 0, 0, 0.05)",
      },
      spacing: {
        128: "32rem",
      },
    },
  },
  plugins: [],
};
