const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
  entry: ["./js/main.js"],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: { loader: "html-loader" }
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
    alias: {
      handlebars: "handlebars/dist/handlebars.min.js"
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.tmpl.ejs"
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve("./css"),
        to: path.resolve("./dist/css")
      }
    ])
  ],
  output: {
    path: __dirname + "/dist",
    publicPath: "/",
    filename: "bundle.js"
  },
  devtool: "source-map",
  devServer: {
    contentBase: "./dist"
  }
};
