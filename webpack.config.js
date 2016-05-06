const isDemo = process.env.WEBPACK === 'demo'
const isDev = !process.env.WEBPACK
const isProd = process.env.WEBPACK === 'prod'

const webpack = require('webpack')
const ExtractText = require('extract-text-webpack-plugin')

console.log({isDev, isDemo, isProd})

module.exports = {
  entry: {
    'react-selection': isProd
      ? ['./src/index.jsx']
      : ['./demo'],
  },
  output: {
    path: isDemo ? `${__dirname}/demo` : `${__dirname}/dist`,
    filename: '[name].js',
    library: 'ReactSelection',
    libraryTarget: 'umd',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: isDev ? ['react-hmre'] : []
        }
      },
      {
        test: /\.styl$/,
        loader: isProd ? ExtractText.extract('style', 'css!stylus') : 'style!css!stylus'
      }
    ]
  },
  resolve: {
    alias: isDemo ? {
      'react': 'react/dist/react.min.js',
      'react-dom': 'react-dom/dist/react-dom.min.js',
    } : {}
  },
  externals: isProd ? {
    'react': {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
    },
    'lodash': {
      root: '_',
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
    }
  } : {},
  plugins: isProd ?
    [
      new ExtractText('react-selection.css')
    ]
    : isDemo
    ? []
    : [],
  watch: isDev,
  devtool: isDev ? 'eval' : '',
}
