module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-prettier"],
  plugins: ["stylelint-order"],
  rules: {
    "selector-class-pattern":
      "^[a-z]([a-z0-9-]+)?(__([a-z0-9]+-?)+)?(_([a-z0-9]+-?)+){0,2}?$",
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [/^import-glob$/],
      },
    ],
    "no-invalid-position-at-import-rule": [
      true,
      {
        ignoreAtRules: [/^import-glob$/],
      },
    ],
  },
};
