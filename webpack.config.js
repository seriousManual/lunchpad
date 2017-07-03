'use strict'

const path = require('path')

module.exports = {
    entry: './src/indexBrowser.js',
    output: {
        path: path.join(__dirname, 'dist/browser'),
        filename: 'indexBrowser.js',
        library: 'lunchpad'
    },
    externals: {
        react: {
            commonjs: 'react'
        },
        'react-dom': {
            commonjs: 'react-dom'
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