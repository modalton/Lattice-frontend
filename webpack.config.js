const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, '../dist/'),
    port: 9000,
    publicPath: '/',
    proxy: {
        '/': {
            target: `http://localhost:${process.env.PORT || 3030}`,
            secure: false
        }
    }
  },
  entry: {
    index: './src/index.tsx'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.tsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(css|png|jpg|gif|woff|woff2|ttf|svg|eot)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Homecooked',
      filename: 'index.html',
      template: './src/index.html'
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
    mainFiles: ['index']
  }
};
