import type { Config } from "tailwindcss";

const config: Config = {
  // darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'loginImage': "url('/wallpaper.webp')",
      },
      colors: {
        sky:'#c3ebfa',
        skyLight: '#edf9fd',
        pirple:"#cfceff",
        purpleLight:'#f1f0ff',
        yellow:'#fae27c',
        yellowLight:'#fefce8',
        red: '#be2326',
        learningBlue: '#1E3A8A', // Deep blue for knowledge
        learningPurple: '#6B21A8',
        learningGreen: '#358856', // Green for growth
      }
    },
  },
  plugins: [],
};
export default config;
