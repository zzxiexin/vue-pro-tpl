# vue-base-template

## 安装依赖

``` 
yarn
```

### 开启本地服务

``` 
yarn serve
```

### 项目打包

``` 
yarn build
```

### 格式化代码

``` 
yarn lint
```

功能配置
=================

1. 多环境配置 ✔

新增.env、.env.development、.env.staging、.env.production文件，满足项目在开发、预生产、生产多种情况下， 调用不同的API地址以及变量，packjson新增staging命令 "staging": "vue-cli-service serve --mode staging", （注: 除了BASE_URL、NODE_ENV不需要VUE_APP开头，其他变量都需要）  

2. vue.config.js基础配置 ✔

新增publicPath、outputDir、assetsDir、lintOnSave、productionSourceMap、parallel等基础配置，具体配置可以参考[参考文档传送门](https://cli.vuejs.org/zh/config/#publicpath)  

3. CROS配置 ✔  

新增devServer, 配置如下  

``` javascript
    devServer: {
        overlay: { // 让浏览器 overlay 同时显示警告和错误
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
    }
```

4. HMR(热更新)失效修复 ✔  

代码如下:  

``` javascript
    chainWebpack: config => {
        // 修复HMR
        config.resolve.symlinks(true);
    }
```
5. 添加别名 alias ✔  
6. 图片压缩 ✔  
7. 添加打包分析 ✔  
8. CDN配置 ✔  
9. 生产环境去除console ✔  
10. 开启gzip压缩 ✔  
11. Sass全局样式 ✔  

### 自定义配置

See [Configuration Reference](https://cli.vuejs.org/config/).
