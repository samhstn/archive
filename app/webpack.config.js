const path = require('path');

module.exports = {
  entry: './app/src/js/main.js',

  output: {
    path: path.resolve(__dirname, 'production'),
    publicPath: '/',
    filename: 'bundle.js',
  },

  devtool: 'source-map',

  devServer: {
    inline: true,
    port: 8080
  },

  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        loaders: ['react-hot', 'babel']
      },
      {
        test: /\.s?css$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        loader: 'style-loader!css-loader!sass-loader'
      }
    ]
  }
};
