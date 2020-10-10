const path = require("path");
const isProduction = process.env.NODE_ENV === "production";
const resolve = src => path.join(__dirname, src);
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
// gzip压缩
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
// CDN
const externals = {
  vue: "Vue",
  "vue-router": "VueRouter",
  vuex: "Vuex",
  axios: "axios"
};
const cdn = {
  // 开发环境
  dev: {
    css: [],
    js: []
  },
  // 生产环境
  build: {
    css: [],
    js: [
      "https://cdn.bootcss.com/vue/2.5.17/vue.min.js",
      "https://cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js",
      "https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js",
      "https://cdn.bootcss.com/axios/0.19.0/axios.min.js"
    ]
  }
};
module.exports = {
  publicPath: isProduction ? process.env.VUE_APP_PUBLIC_PATH : "/", // 根据部署的目录名决定
  outputDir: "dist", // 也可以在不用的环境配置文件配置，免去每次修改的麻烦
  assetsDir: "", // 相对于outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: false, // 代码保存是否触发格式化
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: !isProduction, // 生产环境的 source map
  parallel: require("os").cpus().length > 1, // 多线程生产打包(仅用于生产打包)
  pwa: {},
  css: {
    extract: isProduction,
    sourceMap: false,
    loaderOptions: {
      scss: {
        prependData: `@import "@assets/style/global.scss";`
      }
    }
  },
  devServer: {
    overlay: {
      // 让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: true
    },
    open: false, // 是否打开浏览器
    host: "localhost",
    port: "8080",
    https: false,
    hotOnly: true, // 热更新
    proxy: {
      "/api": {
        target: "https://api.asilu.com/geoip/", // 目标代理接口地址
        secure: false,
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        // ws: true, // 是否启用websockets
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
  },
  chainWebpack: config => {
    // 修复HMR(热更新)
    config.resolve.symlinks(true);
    // 配置别名
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@components", resolve("src/components"))
      .set("@pages", resolve("src/pages"))
      .set("@router", resolve("src/router"))
      .set("@store", resolve("src/store"))
      .set("@layouts", resolve("src/layouts"));
    if (isProduction) {
      Object.assign(config, {
        externals
      });
      config.plugin("html").tap(args => {
        if (process.env.NODE_ENV === "production") {
          args[0].cdn = cdn.build;
        }
        if (process.env.NODE_ENV === "development") {
          args[0].cdn = cdn.dev;
        }
        return args;
      });
      // 打包性能分析
      config.plugin("webpack-report").use(BundleAnalyzerPlugin, [
        {
          analyzerMode: "static"
        }
      ]);
      // 图片压缩
      config.module
        .rule("images")
        .use("image-webpack-loader")
        .loader("image-webpack-loader")
        .options({
          mozjpeg: { progressive: true, quality: 65 },
          optipng: { enabled: false },
          pngquant: { quality: [0.65, 0.9], speed: 4 },
          gifsicle: { interlaced: false }
          // webp: { quality: 75 }
        });
    }
  },
  configureWebpack: config => {
    const plugins = [];
    if (isProduction) {
      Object.assign(config, {
        externals: externals
      });
      plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            output: {
              comments: false // 去掉注释
            },
            warnings: false,
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ["console.log"]
            }
          }
        })
      );
      plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      );
    }
  }
};
