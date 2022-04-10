module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  extends: [
    "airbnb-base",
    "plugin:jest/recommended",
    "plugin:jest/style",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["jest"],
  rules: {
    "import/prefer-default-export": "off",
    "no-console": "off",
    "no-alert": "off",
    "max-len": ["error", { ignoreComments: true, code: 120 }],
    "no-param-reassign": ["error", { props: false }],
    "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
    "no-use-before-define": [
      "error",
      { functions: false, classes: true, variables: true },
    ],
  },
};
