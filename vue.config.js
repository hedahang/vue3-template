/*
 * @Author: munachar
 * @Date: 2021-11-11 16:37:11
 * @Last Modified by: munachar
 * @Last Modified time: 2021-11-12 15:28:24
 */
const path = require("path");
// const BundleAnalyzerPlugin =
//   require("webpack-bundle-analyzer").BundleAnalyzerPlugin; // 打包分析

// const IS_PROD = ["production"].includes(process.env.NODE_ENV);
const resolve = (dir) => path.join(__dirname, dir);
module.exports = {
  // 公共路径
  publicPath: "./",

  // 相对于打包路径index.html的路径
  indexPath: "index.html",

  // 'dist', 生产环境构建文件的目录
  outputDir: "dist",

  // 相对于outputDir的静态资源(js、css、img、fonts)目录
  assetsDir: "static",

  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
  lintOnSave: process.env.NODE_ENV !== "production",

  // 生产环境的 source map
  productionSourceMap: false,

  // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  parallel: require("os").cpus().length > 1,

  // pwa: {}, // 向 PWA 插件传递选项。
  // transpileDependencies: ["echarts"], // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
  chainWebpack: (config) => {
    config.resolve.symlinks(true); // 修复热更新失效
    config.resolve.alias // 添加别名
      .set("@", resolve("src"));
    // 打包分析, 打包之后自动生成一个名叫report.html文件(可忽视)
    // if (IS_PROD) {
    //   config.plugin("webpack-report").use(BundleAnalyzerPlugin, [
    //     {
    //       analyzerMode: "static",
    //     },
    //   ]);
    // }
    // set svg-sprite-loader
    //1. 已有的svg规则排除icons。
    config.module.rule("svg").exclude.add(resolve("src/assets/icons")).end();
    // 2.为icons添加新的规则
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/assets/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();

    config.when(process.env.NODE_ENV !== "development", (config) => {
      config
        .plugin("ScriptExtHtmlWebpackPlugin")
        .after("html")
        .use("script-ext-html-webpack-plugin", [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/,
          },
        ])
        .end();
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial", // only package third parties that are initially dependent
          },
          antdUI: {
            name: "chunk-antdUI", // split antdUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?ant-design-vue(.*)/, // in order to adapt to cnpm
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      });
      config.optimization.runtimeChunk("single");
    });
  },

  // webpack-dev-server 相关配置
  devServer: {
    overlay: {
      // 让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: true,
    },
    host: "0.0.0.0",
    port: 8080,
    https: false, // https:{type:Boolean}
    open: false, //配置自动启动浏览器
    hotOnly: true, // 热更新
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: `http://192.168.1.173:10085`,
        changeOrigin: true,
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_API]: "",
        },
      },
    },
  },

  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "./src/assets/styles/variables.less")],
    },
  },
};
