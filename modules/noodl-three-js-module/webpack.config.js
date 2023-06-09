const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const pjson = require('./package.json');
// var outputPath = path.resolve(__dirname, '../noodl_modules/' + pjson.name);
var outputPath = `C:\\Users\\Eric\\AppData\\Roaming\\Noodl\\projects\\a95582a8-944d-445b-8f94-76bff5bc3fc6\\noodl_modules\\noodl-three-js-module`

module.exports = {
  entry: './src/index.ts',
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: 'index.js',
    path: outputPath,
    clean: true,
  },
  externals : {
    'react': 'React',
    'react-dom': 'reactDom',
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".css"],
    alias: {
      '@noodl/noodl-sdk': path.resolve(__dirname, 'src/noodl-sdk/')
    }
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'assets/**/*',
          to: '[name][ext]'
        },
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  }
};
