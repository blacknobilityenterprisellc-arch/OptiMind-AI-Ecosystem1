import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigNext from "eslint-config-next";

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigNext,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "warn",
      "prefer-const": "error",
      "no-var": "error",
    },
  },
  {
    ignores: [".next/*", "node_modules/*", "dist/*"],
  },
];