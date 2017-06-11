'use strict'

var path = require('path')

var webpack = require('webpack')

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
                    exclude: [
                        path.resolve(__dirname, "node_modules")
                    ],
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