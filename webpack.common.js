const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

const distPath = path.resolve(__dirname, "./dist");
const srcPath = path.resolve(__dirname, "./src");

const pages = ["index", "list", "post", "feedback", "about"];

const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  entry: () => {
    const entry = {};
    pages.forEach((page) => {
      entry[page] = `./${page}.js`;
    });

    return entry;
  },
  context: path.resolve(__dirname, `${srcPath}/app`),

  output: {
    path: distPath,
    filename: devMode ? "[name].bundle.js" : "[name].[contenthash].js",
    clean: true,
    environment: {
      arrowFunction: false,
    },
  },

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
        test: /\.(handlebars|hbs)$/,
        loader: "handlebars-loader",
      },

      {
        test: /\.html$/i,
        loader: "html-loader",
      },

      {
        test: /\.(sc|c)ss$/i,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },

      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: devMode
            ? "./images/[name][ext]"
            : "./images/[contenthash][ext]",
        },
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: devMode
            ? "./fonts/[name][ext]"
            : "./fonts/[contenthash][ext]",
        },
      },
    ],
  },

  plugins: [
    ...pages.map(
      (page) =>
        new HtmlWebpackPlugin({
          filename: `${page}.html`,
          template: path.resolve(__dirname, "./src/pages/index.html"),
          chunks: [page],
          inject: true,
          favicon: "../images/favicon.svg",
          meta: { description: "Personal blog about everything." },
        })
    ),
  ].concat(
    devMode
      ? []
      : [
          new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            chunkFilename: "[id].[contenthash].css",
          }),
          new CopyWebpackPlugin({
            patterns: [
              {
                from: path.resolve(__dirname, `${srcPath}/public`),
                to: distPath,
              },
            ],
          }),
        ]
  ),
};
