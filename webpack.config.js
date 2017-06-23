'use strict'

const path = require('path')

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: [
        './src/indexBrowser.js'
    ],
    output: {
        path: path.join(__dirname, 'dist/browser'),
        filename: 'indexBrowser.js'
    },
    externals: {
        react: {
            commonjs: "react",
            amd: "react",
            root: "react"
        },
        "react-dom": {
            commonjs: "react-dom",
            amd: "react-dom",
            root: "react-dom"
        }
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: [
                    path.resolve(__dirname, 'node_modules')
                ],
                query: {
                    presets: [
                        ['react'],
                        ['es2015']
                    ],
                    cacheDirectory: true
                }
            }
        ]
    }
}