const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development",
  plugins: [new Dotenv()],
  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
      fs: false,
      os: false,
    },
  },
};
