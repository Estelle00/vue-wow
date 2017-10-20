/**
 * Created by liubingwen on 2017/5/4.
 */
const path = require('path')
const webpack = require('webpack')
const vueLoaderConfig = require('./vue-loader.conf')
const ROOT_PATH = path.resolve(__dirname, '../')
module.exports = {
  devtool: false,
  entry: {
    index: path.join(ROOT_PATH, 'src/index.js')
  },
  output: {
    path: path.resolve(ROOT_PATH, './dist'),
    filename: 'vue-wow.min.js',
    libraryTarget: 'commonjs2'
  },
  externals: {
    'better-scroll': {
      commonjs2: 'better-scroll'
    }
  },
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
        exclude: path.resolve(__dirname, 'node_modules'),
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true,
        drop_debugger: true, // discard “debugger” statements
        drop_console: true
      },
      output: {
        comments: false
      }
    })
  ]
}
