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
        use: {
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/]
          }
        },
        exclude: /node_modules/
      }
    ]
  }
}
