const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const webpackConfigBase = require("./webpack.base.conf");
const webpackConfigDev = {
    mode: "development", // 通过 mode 声明开发环境
    output: {
        path: path.resolve(__dirname, "../dist"),
        // 打包多出口文件
        filename: "./js/[name].bundle.js"
    },
    devServer: {
        // contentBase: path.join('../src/assets/index'),
        watchContentBase: true,
        // contentBase: path.join(__dirname, 'src'),
        publicPath: "/",
        host: "127.0.0.1",
        port: "8090",
        overlay: true, // 浏览器页面上显示错误
        // open: true, // 开启浏览器
        // stats: "errors-only", //stats: "errors-only"表示只打印错误：
        hot: true, // 开启热更新
        // 服务器代理配置项
        proxy: {
            "/testing/*": {
                target: "https://www.baidu.com",
                secure: true,
                changeOrigin: true
            }
        },
        // 开发环境路由
        historyApiFallback: {
            rewrites: [
                { from: /^\/$/, to: "/index/index.html" },
            ]
        },

        // before(app, server) {
        //     console.log('be~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
        //     server._watch(path.join(__dirname, "../src/pages/*/*.html"));
        // }
    },
    
    plugins: [
             new webpack.NamedModulesPlugin(),
             new webpack.HotModuleReplacementPlugin()
            ],
};
module.exports = merge(webpackConfigBase, webpackConfigDev);
