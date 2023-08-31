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
        services: "4rem 1fr",
      },
      gridColumn: {
        gutter: "gutter",
        content: "content",
      },
      zIndex: {
        "-10": "-10",
        "-20": "-20",
      },
      content: {
        appIcon: 'url("/app-icon.svg")',
        webIcon: 'url("/web-icon.svg")',
      },
    },
  },
  plugins: [],
};
export default config;
