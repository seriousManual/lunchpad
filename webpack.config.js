'use strict'

var path = require('path')

var webpack = require('webpack')
var autoprefixer = require('autoprefixer')

module.exports = [
    {
        devtool: 'cheap-module-source-map',
        entry: [
            './src/app.js'
        ],
        output: {
            path: path.join(__dirname, 'build'),
            filename: 'app.js'
        },
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    loader: 'babel-loader',
                    query: {
                        presets: [
                            ["react"],
                            ["es2015", { "modules": false }]
                        ],
                        cacheDirectory: true
                    }
                }
            ]
        },

        plugins: [
            //new webpack.optimize.UglifyJsPlugin()
        ]
    }
]