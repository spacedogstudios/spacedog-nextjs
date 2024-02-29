import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        main: "48px [gutter-start] auto [content-start] minmax(auto, 1024px) [content-end] auto [gutter-end] 48px,",
        small:
          "24px [gutter-start] auto [content-start] minmax(auto, 1024px) [content-end] auto [gutter-end] 24px,",
        services: "5rem 1fr",
      },
      gridColumn: {
        gutter: "gutter",
        content: "content",
      },
      zIndex: {
        "-10": "-10",
        "-20": "-20",
      },
    },
  },
  plugins: [],
};
export default config;
