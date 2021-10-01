const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: './public/index.js',
        preloader: './public/js/preloader.js'
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist/public')
    },
    resolve: {
        alias: {
            '@js': path.resolve(__dirname, 'src/public/js'),
            '@css': path.resolve(__dirname, 'src/public/css')
        }
    },
    devServer: {
        port: 4200
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CopyPlugin({
            patterns: [{
                from: "./public/img",
                to: "img/[name][ext]",
                toType: "template"
            }]
        }),
        new CleanWebpackPlugin
    ],
    module: {
        rules: [{
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true, // webpack@1.x
                            disable: true, // webpack@2.x and newer
                        },
                    },
                ]
            }
        ]
    }
}