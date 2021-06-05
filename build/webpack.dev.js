const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const { resolve } = require('./utils')
const common = require('./webpack.common')
const { merge } = require('webpack-merge')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: resolve('example/main.ts'),
  output: {
    path: resolve('dist'),
    filename: '[name].js'
  },
  devServer: {
    host: 'localhost',
    port: 9994,
    compress: true,
    hot: true,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.vue?$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(ttf|woff)$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Example',
      template: resolve('example/index.html')
    }),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: ['Example is running at: http://localhost:9994']
      }
    }),
    new VueLoaderPlugin()
  ]
})
