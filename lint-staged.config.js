module.exports = {
  "*.js": [
    "eslint --config eslint.config.js --cache --fix",
    "prettier --write",
  ],
  "*.{css,scss}": "stylelint --cache --fix",
  "*.{json,md,html,css,scss}": "prettier --write",
};
