const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { NODE_ENV } = process.env

const isDev = !NODE_ENV
const isProd = NODE_ENV === 'production'
const isDemo = NODE_ENV === 'dev'

console.log({ isDev, isProd })

module.exports = {
  watch: isDev,
  devtool: isDev ? 'eval' : null,
  entry: {
    'react-selection': isProd
      ? ['./src']
      : ['./dev'],
  },
  // output: {
  //   path: isDemo ? `${__dirname}/dev` : `${__dirname}/dist`,
  //   filename: '[name].js',
  //   library: 'ReactSelection',
  //   libraryTarget: 'umd',
  // },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './dev/index.html',
      minify: {
        collapseWhitespace: true,
      },
    }),
  ],
}
