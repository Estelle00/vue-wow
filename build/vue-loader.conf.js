const utils = require('./utils')
const isDev = /^dev/g.test(process.env.NODE_ENV)

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: !!isDev,
    extract: !isDev
  })
}
