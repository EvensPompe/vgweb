const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

module.exports = {
    entry: './src/server.js',
    mode: 'production',
    target: "node",
    output: {
        filename : 'server.js',
        path : path.resolve(__dirname, 'dist'),
    },
    externals: [nodeExternals()],
};
