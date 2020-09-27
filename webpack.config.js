const HtmlWebpackPlugin = require('html-webpack-plugin');
const MinifyCSSExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = (env, { mode }) => {
  const isProduction = mode === 'production';
  return {
    mode,
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
        "~": path.resolve(__dirname),
        '~src': path.resolve(__dirname, 'src'),
        '~controllers': path.resolve(__dirname, 'src', 'controllers'),
        '~utils': path.resolve(__dirname, 'src', 'utils'),
        '~views': path.resolve(__dirname, 'src', 'views'),
        '~components': path.resolve(__dirname, 'src', 'components'),
        '~parser': path.resolve(__dirname, 'src', 'Parser'),
        '~style': path.resolve(__dirname, 'style'),
        '@types': path.resolve(__dirname, "./src/@types/index.ts")
      },
    },
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          sourceMap: true,
          extractComments: isProduction,
          terserOptions: {
            warnings: false,
            compress: {
              drop_console: isProduction
            }
          }
        })
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
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
  }
};