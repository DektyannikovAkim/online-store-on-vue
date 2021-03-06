const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        server: './server/server.js'
    },
    output: {
        path: path.join(__dirname, 'dist/server'),
        publicPath: "/",
        filename: "[name].js"
    },
    target: "node",
    node: {
        // Только для express приложений
        __dirname: false,
        __filename: false
    },
    externals: [nodeExternals()], // Только для express приложений
    module: {
        rules: [{
            // Перекомпилировать es6+ в  es5
            test: /\.js$/,
            exclude: /node_modules/,
            // loader: "babel-loader"
        }]
    },
    plugins: [
        new CopyPlugin({
            patterns: [{
                from: "./server/db",
                to: "db/[name][ext]",
                toType: "template"
            }]
        }),
        new CleanWebpackPlugin
    ]
};