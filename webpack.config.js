const path = require('path');

module.exports = {
  entry: ['url-polyfill','./src/index.js'],
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['babel-preset-env']
        }
      }
    }
    ]
  },
  output: {
    filename: 'savvy-sign-on.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'SavvySignOn',
    libraryTarget: 'umd'
  }
};
