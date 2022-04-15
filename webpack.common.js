const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const fg = require("fast-glob");

const distPath = path.resolve(__dirname, "./dist");
const srcPath = path.resolve(__dirname, "./src");
const pagesPath = path.resolve(srcPath, "./pages");
const pagesStr = "./src/pages/";
const files = fg.sync(`${pagesStr}*.html`);

const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  entry: () => {
    const entry = {};
    files.map((file) => {
      const name = file.replace(pagesStr, "").replace(".html", "");
      entry[name] = `./${name}.js`;
      return file;
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
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              // Run `postcss-loader` on each CSS `@import` and CSS modules/ICSS imports
              // Do not forget that `sass-loader` compile non CSS `@import`'s into a single file
              // If you need run `sass-loader` and `postcss-loader` on each CSS `@import` please set it to `2`
              importLoaders: 1,
            },
          },
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
        test: /\.html$/i,
        loader: "html-loader",
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
    ...files.map(
      (file) =>
        new HtmlWebpackPlugin({
          filename: file.replace(pagesStr, ""), // "index.html"
          template: path.resolve(pagesPath, `./${file.replace(pagesStr, "")}`), // "./src/pages/index.html"
          chunks: [file.replace(pagesStr, "").replace(".html", "")], // ["index"]
          inject: true,
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
        ]
  ),
};
