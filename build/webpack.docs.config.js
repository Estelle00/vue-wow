/**
 * Created by liubingwen on 2018/03/12.
 */
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.config')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const ROOT_PATH = path.resolve(__dirname, '../')
module.exports = merge(webpackBaseConfig, {
  devtool: 'eval-source-map',
  entry: {
    main: path.resolve(ROOT_PATH, 'examples/index'),
    vendors: ['vue']
  },
  output: {
    path: path.resolve(ROOT_PATH, 'docs'),
    publicPath: '',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  resolve: {
    alias: {
      'vue-wow': path.resolve(ROOT_PATH, 'src/index')
    }
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendors', filename: 'vendor.bundle.js' }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: path.resolve(ROOT_PATH, 'docs/index.html'),
      template: path.resolve(ROOT_PATH, 'examples/index.html')
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.UglifyJsPlugin({
      parallel: true,
      sourceMap: true
    })
  ]
})
