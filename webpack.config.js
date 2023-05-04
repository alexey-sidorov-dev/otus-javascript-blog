const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const path = require("path");

const { NODE_ENV } = process.env;
const devMode = NODE_ENV === "development";
const prodMode = NODE_ENV === "production";

const pagesPath = "./src/pages/";
const pages = ["index", "about", "feedback", "list", "post"];

module.exports = {
  mode: NODE_ENV,

  entry: () => {
    const entry = {};
    pages.forEach((page) => {
      entry[page] = path.resolve(__dirname, pagesPath, `${page}.js`);
    });

    return entry;
  },

  context: path.resolve(__dirname, "./src"),

  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: devMode ? "[name].bundle.js" : "[name].[contenthash].js",
    clean: true,
    environment: {
      arrowFunction: false,
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
        },
      },

      {
        test: /\.(handlebars|hbs)$/i,
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
        test: /\.(woff|woff2|ttf|otf)$/i,
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
          template: path.resolve(__dirname, "./src/templates/index.html"),
          chunks: [page],
          inject: true,
          favicon: path.resolve(__dirname, "./src/images/favicon.svg"),
        })
    ),
  ],
};

if (devMode) {
  module.exports.devtool = "eval-cheap-module-source-map";
  module.exports.devServer = {
    compress: true,
    hot: true,
    port: 9000,
    client: {
      logging: "info",
      overlay: {
        errors: true,
        warnings: true,
      },
      progress: true,
    },
  };
  module.exports.plugins?.push(
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
    )
  );
}

if (prodMode) {
  module.exports.devtool = false;
  module.exports.plugins?.push(
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, `./public/robots.txt`),
          to: path.resolve(__dirname, "./dist"),
        },
      ],
    })
  );
  module.exports.optimization = {
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
  };
}
