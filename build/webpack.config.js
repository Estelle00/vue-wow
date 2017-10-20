/**
 * Created by liubingwen on 2017/5/4.
 */
const path = require('path')
const webpack = require('webpack')
const vueLoaderConfig = require('./vue-loader.conf')
const ROOT_PATH = path.resolve(__dirname, '../')

const webpackConfig = {
  devtool: '#eval-source-map',
  entry: {
    main: path.join(ROOT_PATH, 'demo/main.js')
  },
  output: {
    path: ROOT_PATH,
    publicPath: '/dist/',
    filename: 'build.js'
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
        exclude: /(node_modules|dist)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      // 'vue': 'vue/dist/vue.common.js',
      // 'vue-wow': path.resolve(ROOT_PATH, './src/index.js')
      'vue-wow': path.resolve(ROOT_PATH, './dist/vue-wow.min.js')
    }
  },
  devServer: {
    historyApiFallback: true,
    compress: true,
    inline: true,
    host: '0.0.0.0',
    port: 8080,
    hot: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}
if (process.env.NODE_ENV === 'production') {
  webpackConfig.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  webpackConfig.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
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
  if (process.env.BUILD === 'publish') {
    webpackConfig.entry = './src/index.js'
    webpackConfig.output = {
      path: path.resolve(ROOT_PATH, 'dist'),
      filename: 'vue-wow.min.js',
      library: 'VueWow',
      libraryTarget: 'umd',
      umdNamedDefine: true
    }
    // Banner
    const moment = require('moment')
    const pkg = require('../package.json')
    const banner = 'Vue WOW \nversion: ' + pkg.version + ' \nrepo: ' + pkg.repository.url + ' \nbuild: ' + moment().format('YYYY-MM-DD HH:mm:ss')
    webpackConfig.plugins.push(
      new webpack.BannerPlugin({
        banner: banner,
        entryOnly: true
      })
    )
  }
}
module.exports = webpackConfig
