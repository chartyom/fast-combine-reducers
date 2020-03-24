const webpack = require('webpack')
const path = require('path')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const rootDir = process.cwd()

module.exports = {
  target: 'web',
  context: rootDir,
  entry: {},
  output: {
    path: path.join(rootDir, 'dist', 'public'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@appNext': path.join(rootDir, 'appNext'),
      '@app': path.join(rootDir, 'app'),
    },
    modules: [path.join(rootDir, 'node_modules')],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.join(rootDir, 'tsconfig.json'),
      }),
    ],
  },
  stats: 'errors-only',
  plugins: [new CaseSensitivePathsPlugin()],
}
