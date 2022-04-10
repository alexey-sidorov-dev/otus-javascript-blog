const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const path = require("path");

const { NODE_ENV } = process.env;

module.exports = {
  entry: path.resolve(__dirname, "./src/index.js"),
  devtool:
    NODE_ENV === "production" ? "nosources-source-map" : "eval-source-map",
  mode: NODE_ENV === "production" ? "production" : "development",

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "./images/[contenthash][ext]",
        },
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "./fonts/[contenthash][ext]",
        },
      },
    ],
  },

  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
    clean: true,
    environment: {
      arrowFunction: false,
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./index.html"),
    }),
    new MiniCssExtractPlugin(),
  ],

  optimization: {
    minimizer: [`...`, new CssMinimizerPlugin()],
  },

  devServer: {
    compress: true,
    hot: true,
    port: 9000,
    client: {
      logging: "info",
    },
  },
};

if (NODE_ENV === "development") {
  module.exports.devtool = "eval-source-map";
  module.exports.mode = "development";
}
