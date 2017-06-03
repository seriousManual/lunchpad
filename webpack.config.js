'use strict'

var path = require('path')

var webpack = require('webpack')
var autoprefixer = require('autoprefixer')

module.exports = [
    {
        devtool: 'cheap-module-source-map',
        entry: [
            './src/index.js'
        ],
        output: {
            path: path.join(__dirname, 'build'),
            filename: 'index.js'
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    query: {
                        presets: [
                            //["es2015", { "modules": false }]
                        ],
                        cacheDirectory: true
                    }
                }
            ]
        },

        plugins: []
    }
]