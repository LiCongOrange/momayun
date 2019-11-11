'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      chunks: ['index']
    }),
    // new HtmlWebpackPlugin({
    //   filename: 'register.html',
    //   template: './src/pages/register/register.html',
    //   inject: true,
    //   chunks: ['register']
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'password.html',
    //   template: './src/pages/password/password.html',
    //   inject: true,
    //   chunks: ['password']
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'center.html',
    //   template: './src/pages/center/center.html',
    //   inject: true,
    //   chunks: ['center']
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'site.html',
    //   template: './src/pages/site/site.html',
    //   inject: true,
    //   chunks: ['site']
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'home.html',
    //   template: './src/pages/home/home.html',
    //   inject: true,
    //   chunks: ['home']
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'pre.html',
    //   template: './src/pages/home/preview/pre.html',
    //   inject: true,
    //   chunks: ['pre']
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'model.html',
    //   template: './src/pages/model/model.html',
    //   inject: true,
    //   chunks: ['model']
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'dllogin.html',
    //   template: './src/pages/dllogin/dllogin.html',
    //   inject: true,
    //   chunks: ['dllogin']
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'myacount.html',
    //   template: './src/pages/account/myacount/myacount.html',
    //   inject: true,
    //   chunks: ['myacount']
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'userlogin.html',
    //   template: './src/pages/dllogin/userlogin.html',
    //   inject: true,
    //   chunks: ['userlogin']
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'usercenter.html',
    //   template: './src/pages/dllogin/usercenter.html',
    //   inject: true,
    //   chunks: ['usercenter']
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'allset.html',
    //   template: './src/pages/allset/allset.html',
    //   inject: true,
    //   chunks: ['allset']
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'stafflogin.html',
    //   template: './src/pages/stafflogin/stafflogin.html',
    //   inject: true,
    //   chunks: ['stafflogin']
    // }), 
    // new HtmlWebpackPlugin({
    //   filename: 'step.html',
    //   template: './src/pages/step/step.html',
    //   inject: true,
    //   chunks: ['step']
    // }),
    


    
    // new HtmlWebpackPlugin({
    //   filename: 'login.html',
    //   template: './src/pages/login/login.html',
    //   inject: true,
    //   chunks: ['login']
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'account.html',
    //   template: './src/pages/account/account.html',
    //   inject: true,
    //   chunks: ['account']
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'recharge.html',
    //   template: './src/pages/account/recharge/recharge.html',
    //   inject: true,
    //   chunks: ['recharge']
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'work.html',
    //   template: './src/pages/work/work.html',
    //   inject: true,
    //   chunks: ['work']
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'mywork.html',
    //   template: './src/pages/work/mywork/mywork.html',
    //   inject: true,
    //   chunks: ['mywork']
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'pay.html',
    //   template: './src/pages/pay/pay.html',
    //   inject: true,
    //   chunks: ['pay']
    // }),


    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
