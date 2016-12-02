// To bundle src/website/

const webpack = require('webpack')
const path = require('path')

module.exports = {
  context: __dirname,
  entry: './src/website/index.js',
  output: {
    path: path.join(__dirname, 'website'),
    publicPath: '/', // as defined in our .html
    filename: 'bundle.js', // no hash in main.js because index.html is a static page
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015'],
        },
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
}
