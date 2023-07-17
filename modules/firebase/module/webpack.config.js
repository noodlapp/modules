const path = require('path');
const fs = require('fs-extra');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const pjson = require('./package.json');
var outputPath = path.resolve(
	'C:/Users/Eric/AppData/Roaming/Noodl/projects/43152fca-d35a-4039-95da-2a84bb11654b/noodl_modules/' + pjson.name
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
		extensions: ['.js', '.json', '.css'],
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
				test: /\.js$/,
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
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
};
