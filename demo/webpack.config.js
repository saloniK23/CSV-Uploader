const webpack = require("webpack");

module.exports = {
  entry: ["babel-polyfill", "./demo/App.js"],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
	  {
		  test: /\.css$/,
		  loaders: ["style-loader", "css-loader"]
	  }
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  output: {
    path: __dirname + "/dist",
    publicPath: "/",
    filename: "bundle.js",
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: "./demo",
    hot: true,
    disableHostCheck: true,
	inline: false,
    port: 8001
  },
};
