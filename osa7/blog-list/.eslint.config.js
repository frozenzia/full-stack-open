// NOT working yet, needs to be renamed to `eslint.config.js`, i.e. remove leading DOT,
// but even so, just still not working. Particularly unsure about import jest and react,
// and then using them in plugins. Of course ALSO changed this from "module" to whatever
// it is now, and the first errors I get trying to run `npm run lint` is about the first
// line, "cannot use import statement outside a module". Nrghn.
import globals from "globals";
import jest from "eslint-plugin-jest/configs/recommended/plugins";
import react from "eslint-plugin-react/configs/recommended/plugins";
import reactRecommended from "eslint-plugin-react/configs/recommended";

export default [
  "eslint:recommended",
  reactRecommended,
  // extends: [
  //     'eslint:recommended',
  //     'plugin:react/recommended'
  // ],
  {
    ignores: ["build/**"],
    // env: {
    //     'es6': true,
    //     'node': true,
    //     'jest': true,
    //     // 'commonjs': true,
    //     // 'browser': true
    // },
    languageOptions: {
      globals: {
        ...globals.browser,
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
      },
      parserOptions: {
        ecmaVersion: 2018,
        ecmaFeatures: {
          jsx: true,
        },
        sourceType: "module",
      },
    },
    plugins: [react, jest],
    rules: {
      indent: ["error", 4],
      eqeqeq: "error",
      "no-trailing-spaces": "error",
      "object-curly-spacing": ["error", "always"],
      "arrow-spacing": ["error", { before: true, after: true }],
      "linebreak-style": ["error", "unix"],
      quotes: ["error", "single"],
      semi: ["error", "never"],
      "no-console": 0,
      "react/prop-types": 0,
      "react/react-in-jsx-scope": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
