const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {

  entry: {
    app: './src/app/index.js',
    vendor: './src/app/vendor.js',
  },

  resolve: {
    extensions: ['.js']
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.html$/,
        use: { loader: 'html-loader', options: { minimize: true } },
      }
    ]
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: './src/app/index.html',
      filename: './index.html',
    })
  ]

};
