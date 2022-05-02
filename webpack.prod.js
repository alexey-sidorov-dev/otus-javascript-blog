const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "production",
  devtool: false,

  optimization: {
    minimize: true,
    minimizer: [`...`, new CssMinimizerPlugin()],

    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
        styles: {
          type: "css/mini-extract",
          name: "styles",
          chunks: "all",
          enforce: true,
        },
      },
    },
  },
});
