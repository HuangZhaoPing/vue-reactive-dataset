const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const resolve = (...value) => {
  return path.resolve(__dirname, '..', ...value)
}

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: resolve('example/main.ts'),
  output: {
    path: resolve('dist'),
    filename: '[name].js'
  },
  resolve: {
    alias: {
      '@': resolve('src'),
      '@root': resolve('.')
    },
    extensions: ['.ts', '.js']
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
        test: /\.ts?$/,
        use: {
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/]
          }
        },
        exclude: /node_modules/
      },
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
}
