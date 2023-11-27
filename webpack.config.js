const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const env = require("dotenv").config().parsed;

module.exports = {
  devtool: "source-map",
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "build"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.?js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.(c|sa|sc)ss$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: { url: false },
          },
          { loader: "sass-loader" },
        ],
      },
      {
        test: /\.(png|jp(e*)g|gif|ttf|woff(2)?|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
        use: ["file-loader"],
        // type: "asset/resource",
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-url-loader",
            options: {
              limit: 50000,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
      favicon: path.join(
        __dirname,
        "/src/assets/images",
        "logos",
        "all-in-chaoss-logo.svg"
      ),
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(env),
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "build"),
    },
    client: {
      logging: "info",
      overlay: true,
      reconnect: 2,
    },

    historyApiFallback: true,

    compress: true,
    port: 5050,
    hot: true,
  },
};
