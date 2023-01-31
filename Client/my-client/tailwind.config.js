/** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

module.exports = {
  darkMode: "media",
  content: [
    "./src/**/*.{html,js,jsx}",
    "./src/Components/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "mob-sm": "350px",
        "mob-md": "420px",
        "mob-lg": "500px",
      },
    },
  },
  plugins: [],
};
