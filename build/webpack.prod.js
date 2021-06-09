const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')
const { name, version } = require('../package.json')
const { resolve } = require('./utils')
const common = require('./webpack.common')
const { merge } = require('webpack-merge')

module.exports = merge(common, {
  mode: 'production',
  entry: {
    [name]: resolve('src/index.ts'),
    [`${name}.min`]: resolve('src/index.ts')
  },
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    library: {
      type: 'umd',
      name: name.toUpperCase()
    }
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.min.js(\?.*)?$/i,
        extractComments: false
      })
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `${name}.js\nversion: ${version}`
    })
  ],
  externals: ['vue', 'memoizee']
})
