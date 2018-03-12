const path = require('path')
const webpack = require('webpack')
const vueLoaderConfig = require('./vue-loader.conf')
const pkg = require('../package.json')
const ROOT_PATH = path.resolve(__dirname, '../')
module.exports = {
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader',
          options: {
            fix: false
          }
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|dist)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'components': path.resolve(ROOT_PATH, './src/components'),
      'utils': path.resolve(ROOT_PATH, './src/utils'),
      'mixins': path.resolve(ROOT_PATH, './src/mixins')
    }
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env.VERSION': `'${pkg.version}'`
    }),
  ]
}
