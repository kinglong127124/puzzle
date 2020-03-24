const webpack = require("webpack");
// Vue编译用
const VueLoaderPlugin = require("vue-loader/lib/plugin");
// 路径获取
const resolve = require("./utils").resolve;

module.exports = {
  output: {
    filename: "[name].bundle.[hash].js",
    path: resolve("dist/frame")
  },
  resolve: {
    extensions: ["*", ".js", ".vue", ".json"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": resolve("src"),
      "@core": resolve("src/core"),
      '@coreApi': resolve('src/core/api'),
      '@coreUtils': resolve('src/core/utils'),
      '@coreMixins': resolve('src/core/utils/mixins'),
      '@coreData': resolve('src/core/assets/data'),
      '@coreImg': resolve('src/core/assets/img'),
      '@corePlugins': resolve('src/core/assets/plugins'),
      '@coreTheme': resolve('src/core/assets/theme'),
      '@coreComp': resolve('src/core/components'),
      "@frames": resolve("src/frames"),
      "@framesDashboard": resolve("src/frames/dashboard"),
      '@framesDashboardViews': resolve('src/frames/dashboard/views'),
      '@framesDashboardViewsComp': resolve('src/frames/dashboard/views/components'),
      "@puzzles": resolve("src/puzzles"),
      "@puzzlesCustorm": resolve("src/puzzles/custormManager"),
      "@puzzlesSys": resolve("src/puzzles/sysManager")
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"]
      },
      {
        test: /\.less$/,
        use: ["vue-style-loader", "css-loader", "less-loader"]
      },
      {
        test: /\.(sass|scss)$/,
        use: ["vue-style-loader", 'css-loader', 'sass-loader']
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('src/core/icons')],
        exclude: /node_modules/,
        options: {
          symbolId: 'icon-[name]'
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: [resolve('src/core/icons')],
        use: [
          {
            loader: "file-loader",
            options: { outputPath: "img" }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "file-loader",
            options: { outputPath: "font" }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    // dll
    new webpack.DllReferencePlugin({
      manifest: require("../static/dll/core.manifest.json")
    }),
    new webpack.DllReferencePlugin({
      manifest: require("../static/dll/puzzle.manifest.json")
    })
  ]
};
