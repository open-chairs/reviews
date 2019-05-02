var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react', '@babel/preset-env']
        }
      },
      {
        test: /\.css/,
        include: SRC_DIR,
        loaders: ['style-loader', 'css-loader']
      }
    ]
  },
  output: {
    path: DIST_DIR,
    filename: 'bundle.js',
  },
  plugins: [
    new BundleAnalyzerPlugin()
  ]
};