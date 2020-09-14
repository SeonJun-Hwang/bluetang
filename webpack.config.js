const HtmlWebpackPlugin = require('html-webpack-plugin');
const MinifyCSSExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: ['./src/index.ts'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.css$/,
        use: [MinifyCSSExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        options: {
          name: '[hash].[ext]',
          limit: 10000,
        },
      }
    ],
  },
  resolve: {
    extensions: [
      '.ts', '.js', '.json'
    ],
    alias: {
      '~src': path.resolve(__dirname, 'src'),
      '~controllers': path.resolve(__dirname, 'src', 'controllers'),
      '~utils': path.resolve(__dirname, 'src', 'utils'),
      '~views': path.resolve(__dirname, 'src', 'views'),
      '~components': path.resolve(__dirname, 'src', 'components'),
      '~parser': path.resolve(__dirname, 'src', 'Parser'),
      '~style': path.resolve(__dirname, 'style'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      meta: {
        viewport: 'width=device-width, initial-scale=1',
      },
      favicon: './assets/logo.svg'
    }),
    new MinifyCSSExtractPlugin({
      filename: 'bundle.css'
    }),
  ],
};
