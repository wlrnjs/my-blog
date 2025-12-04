import nextConfig from "eslint-config-next";

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
  ...nextConfig,
  {
    ignores: ["node_modules/**", ".next/**"],
  },
];

export default config;

