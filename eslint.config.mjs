import js from "@eslint/js";
import svelte from 'eslint-plugin-svelte';
import globals from "globals";
import ts from 'typescript-eslint';

import path from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default ts.config(
   js.configs.recommended,
   ...ts.configs.recommended,
   ...svelte.configs.recommended,
   {
    languageOptions: {
        globals: {
            ...globals.node,
            ...globals.browser,
            ...globals.jquery,
        },
    },

    rules: {
        "no-shadow": ["error", {
            builtinGlobals: true,
            hoist: "all",
            allow: ["document", "event", "name", "parent", "status", "top"],
        }],
    },
});
