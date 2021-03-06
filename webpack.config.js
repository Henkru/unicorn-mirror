const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body',
});

const ExtractTextPluginConfig = new ExtractTextPlugin({
  filename: './css/style.css',
  allChunks: true,
});

const minify = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false,
  },
});

const PROD = (process.env.NODE_ENV === 'production');

module.exports = [
  {
    name: 'Client',
    devtool: '#eval-source-map',
    entry: './client/index.jsx',
    output: {
      path: path.resolve('dist/client/'),
      filename: 'index_bundle.js',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.css'],
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          include: [
            path.join(__dirname, 'client'),
            path.join(__dirname, 'modules'),
          ],
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            use: 'css-loader',
          }),
        },
        {
          test: /fonts\/.*\.(svg|ttf|woff2?|eot)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            publicPath: '/',
            outputPath: 'fonts/',
          },
        },
      ],
    },
    plugins: [HtmlWebpackPluginConfig, ExtractTextPluginConfig].concat(PROD ? [minify] : []),
  },
  {
    name: 'Backend',
    target: 'node',
    entry: './backend/index.js',
    output: {
      path: path.resolve('dist/backend/'),
      filename: 'index.js',
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          include: [
            path.join(__dirname, 'modules'),
          ],
        },
      ],
    },
    externals: [nodeExternals()],
    plugins: PROD ? [minify] : [],
  },
];
