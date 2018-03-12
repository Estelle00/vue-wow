/**
 * Created by liubingwen on 2018/03/12.
 */
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CompressionPlugin = require('compression-webpack-plugin')
const webpackBaseConfig = require('./webpack.base.config')
const ROOT_PATH = path.resolve(__dirname, '../')
process.env.NODE_ENV = 'production'
module.exports = merge(webpackBaseConfig, {
  devtool: 'source-map',
  entry: {
    main: path.resolve(ROOT_PATH, 'src/index')
  },
  output: {
    path: path.resolve(ROOT_PATH, 'dist'),
    publicPath: '/dist/',
    filename: 'vue-wow.min.js',
    library: 'VueWow',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.UglifyJsPlugin({
      parallel: true,
      sourceMap: true,
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css)$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
})
