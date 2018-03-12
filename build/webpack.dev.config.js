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
    main: path.resolve(ROOT_PATH, 'examples/main')
  },
  output: {
    path: path.resolve(ROOT_PATH, 'examples/dist'),
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
      filename: path.join(__dirname, '../examples/dist/index.html'),
      template: path.join(__dirname, '../examples/index.html')
    }),
    new FriendlyErrorsPlugin()
  ]
})
