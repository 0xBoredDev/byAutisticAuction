import type { Config } from "tailwindcss";
// const flowbite = require("flowbite-react/tailwind");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/lib/**/*.js"
  ],
  theme: {
    extend: {
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
export default config;
