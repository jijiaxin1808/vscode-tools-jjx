/* eslint-disable no-undef */

const path = require('path');
const fs = require('fs');

function scanPackage() {
    const packages = fs.readdirSync('packages').filter( path =>
        fs.statSync(`packages/${path}`).isDirectory()
    );
    const conf = packages.filter(path => !path.startsWith('_')).map(path => ({
        entry: `./packages/${path}/src/index.ts`,
        path,
        filename:`${path}.js`,
        outpath: `./packages/${path}/dist`
    }));
    return conf;
}

function getConfigs() {
    return scanPackage().map(config => ({
        target: 'node',
        entry:  config.entry,
        output: {
            path: path.resolve(__dirname, config.outpath),
            filename: config.filename,
            libraryTarget: 'commonjs2',
            devtoolModuleFilenameTemplate: '../[resource-path]'
        },
        devtool: 'source-map',
        externals: {
            vscode: 'commonjs vscode'
        },
        resolve: {
            extensions: ['.ts', '.js']
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'ts-loader'
                        }
                    ]
                }
            ]
        },
        mode: 'development',
        optimization: {
            usedExports: true,
        },

    }));
}

module.exports = getConfigs();