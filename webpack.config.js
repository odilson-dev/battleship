const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(mp3|wav)$/, // Add all supported sound file extensions here
        use: [
          {
            loader: "file-loader", // or 'url-loader' if you prefer
            options: {
              name: "[name].[ext]", // Output file name
              outputPath: "sounds/", // Output directory
            },
          },
        ],
      },
    ],
  },
};
