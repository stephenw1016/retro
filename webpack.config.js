const HtmlWebPackPlugin = require('html-webpack-plugin');
const DotenvPlugin = require('dotenv-webpack');

module.exports = {
  entry: {
    app: './src/app/index',
    vendor: './src/app/vendor',
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
      {
        test: /\.(js|jsx)$/,
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
    new DotenvPlugin(),
    new HtmlWebPackPlugin({
      template: './src/app/index.html',
      filename: './index.html',
    })
  ]
};
