/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        custom_both: {
          custom_white: "#FFFFFF",
          custom_form_label: "#C4C4C4",
          custom_button: "#558FFF",
          custom_special: "#0B0917",
          work_list: "#B0ADAD",
          cust: "#544944",
        },
        custom_dark: {
          secondary: "#CE6A4F",
          large_text: "#E3DCD2",
          port_list: "#001C2E",
          background: "#56031C",
        },
        custom_light: {
          secondary_1: "#E3DCD2",
          secondary_2: "#4C70EF",
          left_contact: "#38405A",
          large_text: "#110974",
          port_list: "#3A3A3A",
          background: "#2C264F",
          footer: "#001C2E",
        },
      },
      backgroundImage: {
        "dark-img": "url('/src/assets/HeroPictDark.png')",
        "light-img": "url('/src/assets/HeroPictLight.png')",
      },
    },
    fontFamily: { poppins: ["poppins", "serif"] },
  },
  plugins: [],
};
