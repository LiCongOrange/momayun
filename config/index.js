'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths   webpack-dev-server提供
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    // proxyTable: {
    //     '/api': {
    //         target: 'https://site.momayun.cn',
    //         secure: false,
    //         changeOrigin: true,
    //     }
    // },

    proxyTable: {
        '/api': {
            target: 'http://localhost:8084',
            pathRewrite: {
                '^/api': '/static/mock'
            }
        }
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8084, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),             //首页
    // register: path.resolve(__dirname, '../dist/register.html'),    //注册页
    // password: path.resolve(__dirname, '../dist/password.html'),    //找回密码
    // center: path.resolve(__dirname, '../dist/center.html'),        //产品中心
    // site: path.resolve(__dirname, '../dist/site.html'),            //新建站点首页
    // home: path.resolve(__dirname, '../dist/home.html'),            //网站编辑
    // pre: path.resolve(__dirname, '../dist/pre.html'),              //高级预览
    // model: path.resolve(__dirname, '../dist/model.html'),          //客户页面（二级域名页）
    // myacount: path.resolve(__dirname, '../dist/myacount.html'),     //代理账户
    // dllogin: path.resolve(__dirname, '../dist/dllogin.html'),      //代理登录页
    // userlogin: path.resolve(__dirname, '../dist/userlogin.html'),    //最终用户登录页
    // usercenter: path.resolve(__dirname, '../dist/usercenter.html'),    //最终用户中心页
    // allset: path.resolve(__dirname, '../dist/allset.html'),            //整套模板页
    // stafflogin: path.resolve(__dirname, '../dist/stafflogin.html'),        //员工登陆
    // step: path.resolve(__dirname, '../dist/step.html'),            //三步建站
    
    // login: path.resolve(__dirname, '../dist/login.html'),          //普通会员登录页
    // account: path.resolve(__dirname, '../dist/account.html'),      //账户信息
    // recharge: path.resolve(__dirname, '../dist/recharge.html'),    //充值中心
    // work: path.resolve(__dirname, '../dist/work.html'),            //工单管理
    // mywork: path.resolve(__dirname, '../dist/mywork.html'),        //我的工单管理
    // pay: path.resolve(__dirname, '../dist/pay.html'),              //支付页面

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
