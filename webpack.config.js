const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: {
    index: "./public/js/index.js",
    profile: "./public/js/profile.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: __dirname + "/dist",
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["postcss-preset-env"],
              },
            },
          },
        ],
      },
    ],
  },
  mode: "development",
  plugins: [new Dotenv()],
  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
      fs: require.resolve("browserify-fs"),
      http: require.resolve("http-browserify"),
      util: require.resolve("util"),
      os: false,
      stream: false,
      buffer: false,
    },
  },
};
