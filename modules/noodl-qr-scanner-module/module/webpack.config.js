const path = require('path');
const fs = require('fs-extra');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const pjson = require('./package.json');
var outputPath = path.resolve('C:/Users/ander/AppData/Roaming/Noodl/projects/3baa5145-5330-4891-b5e4-b2f4698fcba3', 'noodl_modules/' + pjson.name);
//var outputPath = path.resolve('/Users/anderslarsson/Library/Application Support/Noodl/projects/3baa5145-5330-4891-b5e4-b2f4698fcba3', 'noodl_modules/' + pjson.name);

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
        path: outputPath
    },
    externals: {
    },
    resolve: {
        extensions: [".js", ".json", ".css"]
    },
    plugins: [
        new CleanWebpackPlugin(outputPath),
        new CopyWebpackPlugin([
            { from: 'assets/**/*', transformPath: targetPath => stripStartDirectories(targetPath, 1) },
        ]),

        // Copy the generated module files to the tests project if it exists
        {
            apply: (compiler) => {
                compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
                    if(fs.existsSync(path.resolve(__dirname, '../tests'))) {
                        fs.copySync(outputPath, path.resolve(__dirname, '../tests/noodl_modules/' + pjson.name));
                    }
                })
            }
        },
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 1
        })
    ],
    module: {
        rules: [
        ]
    }
};
