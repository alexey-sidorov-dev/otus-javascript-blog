const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",

  plugins: [
    new BrowserSyncPlugin(
      {
        host: "localhost",
        port: 3000,
        proxy: "http://localhost:9000/",
        reloadDelay: 0,
        // https://github.com/Va1/browser-sync-webpack-plugin/issues/88
        files: [
          "**/*.css",
          {
            match: "**/*.js",
            options: {
              ignored: "dist/**/*.js",
            },
          },
        ],
      },
      {
        reload: false,
      }
    ),
  ],

  devServer: {
    compress: true,
    hot: true,
    port: 9000,
    client: {
      logging: "info",
      progress: true,
    },
  },
});
