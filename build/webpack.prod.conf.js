'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

// const Header = r => require.ensure([], () => r(require('./Header.vue')), 'group-foo')


const env = require('../config/prod.env')

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`, 
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true,
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
      chunks: ['manifest', 'vendor', 'index']
    }),
    // new HtmlWebpackPlugin({
    //   filename: config.build.register,
    //   template: './src/pages/register/register.html',
    //   inject: true,
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeAttributeQuotes: true
    //   },
    //   chunksSortMode: 'dependency',
    //   chunks: ['manifest', 'vendor', 'register']
    // }),
    // new HtmlWebpackPlugin({
    //   filename: config.build.password,
    //   template: './src/pages/password/password.html',
    //   inject: true,
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeAttributeQuotes: true
    //   },
    //   chunksSortMode: 'dependency',
    //   chunks: ['manifest', 'vendor', 'password']
    // }),
    // new HtmlWebpackPlugin({
    //   filename: config.build.center,
    //   template: './src/pages/center/center.html',
    //   inject: true,
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeAttributeQuotes: true
    //   },
    //   chunksSortMode: 'dependency',
    //   chunks: ['manifest', 'vendor', 'center']
    // }),
    // new HtmlWebpackPlugin({
    //   filename: config.build.site,
    //   template: './src/pages/site/site.html',
    //   inject: true,
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeAttributeQuotes: true
    //   },
    //   chunksSortMode: 'dependency',
    //   chunks: ['manifest', 'vendor', 'site']
    // }),
    // new HtmlWebpackPlugin({
    //   filename: config.build.home,
    //   template: './src/pages/home/home.html',
    //   inject: true,
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeAttributeQuotes: true
    //   },
    //   chunksSortMode: 'dependency',
    //   chunks: ['manifest', 'vendor', 'home']
    // }),
    // new HtmlWebpackPlugin({
    //   filename: config.build.pre,
    //   template: './src/pages/home/preview/pre.html',
    //   inject: true,
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeAttributeQuotes: true
    //   },
    //   chunksSortMode: 'dependency',
    //   chunks: ['manifest', 'vendor', 'pre']
    // }),
    // new HtmlWebpackPlugin({
    //   filename: config.build.model,
    //   template: './src/pages/model/model.html',
    //   inject: true,
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeAttributeQuotes: true
    //   },
    //   chunksSortMode: 'dependency',
    //   chunks: ['manifest', 'vendor', 'model']
    // }),
    // new HtmlWebpackPlugin({
    //   filename: config.build.dllogin,
    //   template: './src/pages/dllogin/dllogin.html',
    //   inject: true,
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeAttributeQuotes: true
    //   },
    //   chunksSortMode: 'dependency',
    //   chunks: ['manifest', 'vendor', 'dllogin']
    // }),
    // new HtmlWebpackPlugin({
    //   filename: config.build.myacount,
    //   template: './src/pages/account/myacount/myacount.html',
    //   inject: true,
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeAttributeQuotes: true
    //   },
    //   chunksSortMode: 'dependency',
    //   chunks: ['manifest', 'vendor', 'myacount']
    // }),
    // new HtmlWebpackPlugin({
    //   filename: config.build.userlogin,
    //   template: './src/pages/userlogin/userlogin.html',
    //   inject: true,
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeAttributeQuotes: true
    //   },
    //   chunksSortMode: 'dependency',
    //   chunks: ['manifest', 'vendor', 'userlogin']
    // }),
    // new HtmlWebpackPlugin({
    //   filename: config.build.usercenter,
    //   template: './src/pages/usercenter/usercenter.html',
    //   inject: true,
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeAttributeQuotes: true
    //   },
    //   chunksSortMode: 'dependency',
    //   chunks: ['manifest', 'vendor', 'usercenter']
    // }),
    // new HtmlWebpackPlugin({
    //   filename: config.build.allset,
    //   template: './src/pages/allset/allset.html',
    //   inject: true,
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeAttributeQuotes: true
    //   },
    //   chunksSortMode: 'dependency',
    //   chunks: ['manifest', 'vendor', 'allset']
    // }),
    // new HtmlWebpackPlugin({
    //   filename: config.build.stafflogin,
    //   template: './src/pages/stafflogin/stafflogin.html',
    //   inject: true,
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeAttributeQuotes: true
    //   },
    //   chunksSortMode: 'dependency',
    //   chunks: ['manifest', 'vendor', 'stafflogin']
    // }),
    // new HtmlWebpackPlugin({
    //   filename: config.build.step,
    //   template: './src/pages/step/step.html',
    //   inject: true,
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeAttributeQuotes: true
    //   },
    //   chunksSortMode: 'dependency',
    //   chunks: ['manifest', 'vendor', 'step']
    // }),
    


    
    // new HtmlWebpackPlugin({
    //   filename: config.build.login,
    //   template: './src/pages/login/login.html',
    //   inject: true,
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeAttributeQuotes: true
    //   },
    //   chunksSortMode: 'dependency',
    //   chunks: ['manifest', 'vendor', 'login']
    // }),
    // new HtmlWebpackPlugin({
    //   filename: config.build.account,
    //   template: './src/pages/account/account.html',
    //   inject: true,
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeAttributeQuotes: true
    //   },
    //   chunksSortMode: 'dependency',
    //   chunks: ['manifest', 'vendor', 'account']
    // }), 
    // new HtmlWebpackPlugin({
    //   filename: config.build.recharge,
    //   template: './src/pages/account/recharge/recharge.html',
    //   inject: true,
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeAttributeQuotes: true
    //   },
    //   chunksSortMode: 'dependency',
    //   chunks: ['manifest', 'vendor', 'recharge']
    // }), 
    // new HtmlWebpackPlugin({
    //   filename: config.build.work,
    //   template: './src/pages/work/work.html',
    //   inject: true,
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeAttributeQuotes: true
    //   },
    //   chunksSortMode: 'dependency',
    //   chunks: ['manifest', 'vendor', 'work']
    // }), 
    // new HtmlWebpackPlugin({
    //   filename: config.build.mywork,
    //   template: './src/pages/work/mywork/mywork.html',
    //   inject: true,
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeAttributeQuotes: true
    //   },
    //   chunksSortMode: 'dependency',
    //   chunks: ['manifest', 'vendor', 'mywork']
    // }), 
    // new HtmlWebpackPlugin({
    //   filename: config.build.pay,
    //   template: './src/pages/pay/pay.html',
    //   inject: true,
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeAttributeQuotes: true
    //   },
    //   chunksSortMode: 'dependency',
    //   chunks: ['manifest', 'vendor', 'pay']
    // }), 

    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),

    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
