const path = require('path');
const fs = require('fs-extra');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const pjson = require('./package.json');
var outputPath = path.resolve(
	'C:/Users/Eric/AppData/Roaming/Noodl/projects/b0b06a53-8cb1-4471-acf0-97e4ab6f4a7a/noodl_modules/' + pjson.name
);

function stripStartDirectories(targetPath, numDirs) {
	const p = targetPath.split('/');
	p.splice(0, numDirs);
	return p.join('/');
}

module.exports = {
	entry: './src/index.js',
	mode: 'production',
	devtool: 'source-map',
	output: {
		filename: 'index.js',
		path: outputPath,
	},
	externals: {
		react: 'React',
		'react-dom': 'ReactDOM',
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json'],
	},
	plugins: [
		new CleanWebpackPlugin(outputPath),
		new CopyWebpackPlugin([
			{
				from: 'assets/**/*',
				transformPath: (targetPath) => stripStartDirectories(targetPath, 1),
			},
		]),
	],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							['@babel/preset-env', { modules: false }],
							'@babel/preset-react',
						],
					},
				},
			},
			{
        test: /(\.module)?.(sass|scss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]'
              },
              sourceMap: true
            }
          },
          'sass-loader'
        ]
      },
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
};
