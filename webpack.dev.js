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
      },
      {
        reload: false,
        injectCss: true,
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
