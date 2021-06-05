const { resolve } = require('./utils')

module.exports = {
  resolve: {
    alias: {
      '@': resolve('src'),
      '@root': resolve('.')
    },
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  }
}
