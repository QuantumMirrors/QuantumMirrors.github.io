const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const ROOT = path.resolve(__dirname, "src");
const DESTINATION = path.resolve(__dirname, "dist");

module.exports = (env, argv) => {
  const isDev = argv.mode !== "production";

  const config = {
    context: ROOT,

    entry: {
      main: "./main.ts",
    },

    output: {
      filename: "[name].bundle.js",
      path: DESTINATION,
    },
    resolve: {
      extensions: [".ts", ".js", ".scss"],
      modules: [ROOT, "node_modules"],
      fallback: {
        fs: false,
        buffer: false,
        path: false,
        assert: false,
      },
    },
    optimization: {
      minimize: true,
      minimizer: [new CssMinimizerPlugin()],
    },

    module: {
      rules: [
        /****************
         * PRE-LOADERS
         *****************/
        {
          enforce: "pre",
          test: /\.js$/,
          use: "source-map-loader",
        },
        {
          enforce: "pre",
          test: /\.ts$/,
          exclude: /node_modules/,
          use: "tslint-loader",
        },

        /****************
         * LOADERS
         *****************/
        {
          test: /\.ts$/,
          exclude: [/node_modules/],
          use: "awesome-typescript-loader",
        },
        {
          test: /\.(s?)css$/,
          use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                sourceMap: isDev,
              },
            },
            "sass-loader",
            // { loader: "style-loader" }, // to inject the result into the DOM as a style block
            // { loader: "css-modules-typescript-loader" }, // to generate a .d.ts module next to the .scss file (also requires a declaration.d.ts with "declare modules '*.scss';" in it to tell TypeScript that "import styles from './styles.scss';" means to load the module "./styles.scss.d.td")
            // { loader: "css-loader", options: { modules: true } }, // to convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to cryptic identifiers, except if wrapped in a :global(...) pseudo class)
            // { loader: "sass-loader" }, // to convert SASS to CSS
            // NOTE: The first build after adding/removing/renaming CSS classes fails, since the newly generated .d.ts typescript module is picked up only later
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          // use: "file-loader"
          type: 'asset/resource',
        }
      ],
    },

    devtool: "cheap-module-source-map",
    devServer: {},
    plugins: [
      new HtmlWebpackPlugin({
        template: "index.html",
        chunks: ["main"],
      }),
      // new HtmlWebpackPlugin({
      //   filename: "rngeddon.html",
      //   template: "rngeddon.html",
      //   chunks: ["main"],
      // }),
      new MiniCssExtractPlugin({
        filename: isDev ? "[name].css" : "[name].[contenthash].css",
        chunkFilename: isDev ? "[id].css" : "[id].[contenthash].css",
      }),
      // new CopyPlugin({
      //   patterns: [{ from: "res", to: "res" }],
      // }),
    ],
  };
  return config;
};
