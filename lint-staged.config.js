module.exports = {
  "*.js": [
    "eslint --config eslint.config.js --cache --fix",
    "prettier --write",
  ],
  "*.css": "stylelint --cache --fix",
  "*.{json,md,html,css}": "prettier --write",
};
