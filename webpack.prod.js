const Merge = require('webpack-merge');
var webpack = require('webpack');
const CommonConfig = require('./webpack.common.js');
module.exports = function(env) {
    return Merge(CommonConfig, {
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                beautify: false,
                mangle: {
                    screw_ie8: true,
                    keep_fnames: true
                },
                compress: {
                    screw_ie8: true
                },
                comments: false
            })
        ]
    })
}