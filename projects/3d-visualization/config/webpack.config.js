const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './frontend/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './frontend/index.html',
    }),
  ],
  devServer: {
    static: './dist',
    open: true,
    port: 8080,
    host: '0.0.0.0',
    proxy: [
      {
        context: ['/api'],
        target: 'http://repository_backend-api_1:4000',
        changeOrigin: true,
        secure: false
      }
    ]
  },
};