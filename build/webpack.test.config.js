/**
 * 用于单元测试
 */

const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.config')
const path = require('path')
const ROOT_PATH = path.resolve(__dirname, '../')
const webpackConfig = merge(webpackBaseConfig, {
  devtool: 'eval-source-map',
  resolve: {
    alias: {
      'vue-wow': path.resolve(ROOT_PATH, 'src/index')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"testing"'
      }
    })
  ]
})

// no need for app entry during tests
delete webpackConfig.entry

module.exports = webpackConfig
