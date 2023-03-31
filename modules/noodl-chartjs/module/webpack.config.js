const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const pjson = require('./package.json');
// var outputPath = path.resolve(__dirname, '../noodl_modules/' + pjson.name);
// var outputPath = `/Users/eric/Library/Application Support/Noodl/projects/af203093-14cd-428a-8900-10282137e92c/noodl_modules/` + pjson.name;
var outputPath = `C:\\Users\\Eric\\AppData\\Roaming\\Noodl\\projects\\155e4849-bfae-4c1d-9102-58c8e4bd92c3\\noodl_modules\\` + pjson.name;

// TODO: This will be replaced when the SDK is updated.
const noodlSdkPath = path.resolve(__dirname, '..', '..', 'noodl-sdk', "build/dist/index.js");

module.exports = {
  entry: './src/index.ts',
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: 'index.js',
    path: outputPath,
    clean: true,
  },
  externals: {
    'react': 'React',
    'react-dom': 'reactDom',
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".css"]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{
        from: 'assets/**/*',
        to: '[name][ext]'
      }, ]
    })
  ],
  module: {
    rules: [{
      test: /\.(ts|tsx)$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    }, ]
  }
};