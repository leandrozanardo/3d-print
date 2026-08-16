import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: [
      "**/dist/**",
      "**/node_modules/**",
      "**/.tmp/**",
      "**/3ds/**",
      "docs/**",
      "core/**",
      "**/jest.config.cjs",
      "**/*.cjs",
      "project_plans/**",
      ".cursor/**",
    ],
  },
  {
    files: ["scripts/**/*.{js,mjs}", "apps/**/scripts/**/*.{js,mjs}"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ["apps/web/scripts/**/*.{js,mjs}"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
  },
);
