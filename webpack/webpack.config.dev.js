const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const commonConfig = require('./webpack.config.common.js')
const appsConfig = require('./webpack.config.apps.js')
const _cloneDeep = require('lodash/cloneDeep')
const rootDir = process.cwd()
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')

const devConfig = appConfig => ({
  mode: 'development',
  entry: {},
  devtool: 'inline-source-map',
  output: {
    filename: 'js/[name].[hash].js',
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  devServer: {
    contentBase: [path.join(rootDir, 'assets')],
    historyApiFallback: true,
    host: '0.0.0.0',
    disableHostCheck: true,
  },
  watchOptions: {
    ignored: ['/node_modules/', '/dist/'],
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        include: [rootDir],
        use: [
          {
            loader: 'babel-loader?cacheDirectory=true',
            options: {
              presets: ['@babel/preset-typescript', '@babel/preset-react'],
              plugins: [
                '@babel/syntax-dynamic-import',
                [
                  'module-resolver',
                  {
                    alias: {
                      '@app': './app',
                      '@appNext': './appNext',
                    },
                  },
                ],
                'react-hot-loader/babel',
              ],
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              experimentalWatchApi: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      {
        test: /\.(eot|ttf|otf|woff2?|gif|png|jpe?g|svg)$/,
        loader: 'file-loader',
        query: {
          name: '[path][name].[ext]',
          publicPath: '/',
        },
      },
      {
        test: /Modules\.scss$/,
        use: [
          'css-hot-loader',
          {
            loader: 'style-loader',
            options: { injectType: 'styleTag' },
          },
          'css-modules-typescript-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:7]',
              },
              importLoaders: 2,
              localsConvention: 'dashesOnly',
            },
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /(Styles\.scss|\.css)$/,
        use: [
          'css-hot-loader',
          {
            loader: 'style-loader',
            options: { injectType: 'styleTag' },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'initial',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
    },
  },
  plugins: [
    new webpack.WatchIgnorePlugin([/scss\.d\.ts$/]),
    /**
     * генерация css файлов
     */
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new HtmlWebpackPlugin({
      title: 'SITE',
      template: './index.html',
      inject: false,
      chunksSortMode: 'none',
    }),
    new webpack.DefinePlugin({
      DEVELOPMENT: JSON.stringify(true),
      IS_SERVER: JSON.stringify(false),
    }),
    new ErrorOverlayPlugin(),
  ],
})

module.exports = appsConfig.map(appConfig => merge(_cloneDeep(commonConfig), appConfig, devConfig(appConfig)))
