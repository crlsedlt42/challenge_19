const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      database: './src/js/database.js',
      editor: './src/js/editor.js',
      header: './src/js/header.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Text Editor',
      }),

      new WebpackPwaManifest({
        name: 'Just Another Text Editor',
        short_name: 'Text Editor',
        description: 'A simple text editor',
        thme_color: '#000000',
        background_color: '#ffffff',
        inject: true,
        fingerprints: true,
        start_url: '/',
        publicPath: '/',
        //icons: [{src: path.resolve('src/images/icon.png'), sizes: [96, 128, 192, 256, 384, 512], destination: path.join('assets', 'icons'),},],
        //crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
      }),
    ],

    module: {
      rules: [{
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
      }
        
      ],
    },
  };
};
