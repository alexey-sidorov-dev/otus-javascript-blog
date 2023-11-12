module.exports = {
  "*.js": ["eslint --cache --fix", "prettier --write"],
  "*.{css,scss}": "stylelint --cache --fix",
  "*.{json,md,html,css,scss}": "prettier --write",
};
