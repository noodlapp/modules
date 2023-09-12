const path = require('path');
const fs = require('fs-extra');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const pjson = require('./package.json');
var outputPath = path.resolve(__dirname, '../project/noodl_modules/' + pjson.name);

outputPath = '/Users/mikaeltellhed/Library/Application Support/Noodl/projects/6cbf8464-625c-4dff-bd12-27bb9cfa1003/noodl_modules/' + pjson.name;

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
        }
    ],
    module: {
        rules: [
        ]
    }
};
