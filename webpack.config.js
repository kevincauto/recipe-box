var path = require('path'); //a utility that comes with node
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');


var config = {
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'), //this is where it gets bundled
    filename: 'index_bundle.js', //this is what the bundle is called
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ]}
    ]
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html'
    })
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  )
}

module.exports = config;
