'use strict'

const path = require('path')
const webpack = require('webpack')

const baseConfig = {
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
                    path.resolve(__dirname, 'node_modules')
                ],
                query: {
                    presets: [
                        ['react']
                    ],
                    cacheDirectory: true
                }
            }
        ]
    }
}


if (process.env.NODE_ENV === 'production') {
    baseConfig.plugins = [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]

    baseConfig.module.loaders[0].query.presets.push(['es2015', {'modules': false}])
} else {
    baseConfig.devtool = 'cheap-module-source-map'
}

module.exports = baseConfig