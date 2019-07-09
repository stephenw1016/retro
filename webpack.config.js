const HtmlWebPackPlugin = require('html-webpack-plugin');
const DotenvPlugin = require('dotenv-webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',

  entry: {
    app: './src/app/index',
    vendor: './src/app/vendor',
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  mode: 'development',

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', {
          loader: 'eslint-loader',
          options: {
            cache: true,
            emitWarning: true,
            fix: true,
          },
        }]
      },
      {
        test: /\.html$/,
        use: { loader: 'html-loader', options: { minimize: true } },
      }
    ]
  },

  optimization: {
    usedExports: true,
  },

  plugins: [
    new DotenvPlugin(),
    new HtmlWebPackPlugin({
      template: './src/app/index.html',
      filename: './index.html',
    })
  ]
};
