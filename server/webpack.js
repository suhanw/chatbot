const path = require("path");
const nodeExternals = require("webpack-node-externals");
const NodemonPlugin = require("nodemon-webpack-plugin");

const isDevelopment =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

console.log({ isDevelopment });

const config = {
  mode: isDevelopment ? "development" : "production",
  devtool: isDevelopment ? "inline-source-map" : false,
  watch: isDevelopment,
  target: "node",
  externals: [nodeExternals()],
  entry: path.resolve(__dirname, "./src/index.ts"),
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "server.js",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    isDevelopment &&
      new NodemonPlugin({
        script: "./dist/server.js",
        watch: ["./dist"],
        nodeArgs: ["--inspect"],
      }),
  ].filter(Boolean),
};

module.exports = config;
