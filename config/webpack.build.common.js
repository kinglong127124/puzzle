const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
// 构建前清理
const CleanWebpackPlugin = require("clean-webpack-plugin");
// 路径获取
const resolve = require("./utils").resolve;

module.exports = function(type, product) {
  let entry = {};
  entry[product] = `./src/${type}/${product}/`;

  const webpackConfig = {
    mode: "production",
    entry,
    output: {
      path: resolve(`dist/${type}/${product}`),
      publicPath: `./${type}/${product}/`,
      filename: "[name].[contenthash].js",
      library: `${type}_${product}`,
      libraryTarget: "umd"
    },
    // devtool: "source-map",
    plugins: [
      new CleanWebpackPlugin(),
      // 解决动态模块导入打包重名的问题
      new webpack.NamedChunksPlugin(chunk => product + "/" + chunk.name)
    ]
  };

  return merge(common, webpackConfig);
};
