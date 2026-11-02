import path from "node:path";

const buildPrettierCommand = (filenames) =>
  `prettier --write ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" ")}`;

const buildEslintCommand = (filenames) =>
  `eslint --fix ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" ")}`;

const config = {
  "*.{js,jsx,ts,tsx}": [
    buildPrettierCommand,
    buildEslintCommand,
    "jest --bail --findRelatedTests --passWithNoTests",
  ],
};

export default config;
