import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import tseslint from "typescript-eslint";

export default [
  // ── Ignore generated / vendored code ───────────────────────
  {
    ignores: ["dist/**", "build/**", "node_modules/**", "js/**", "vendor/**"],
  },

  // ── Base JS recommended rules (all files) ──────────────────
  js.configs.recommended,

  // ── Browser globals for JS / JSX ───────────────────────────
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: { globals: globals.browser },
  },

  // ── TypeScript recommended rules ───────────────────────────
  ...tseslint.configs.recommended.map((c) => ({
    ...c,
    files: ["**/*.{ts,tsx}"],
  })),

  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: { ecmaVersion: "latest", sourceType: "module" },
    },
    plugins: { "@typescript-eslint": tseslint.plugin },
    rules: {
      // Base rule must be OFF for TS — it doesn't understand enums
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },

  // ── React (JSX / TSX only) ─────────────────────────────────
  {
    ...pluginReact.configs.flat.recommended,
    files: ["**/*.{jsx,tsx}"],
  },
];
