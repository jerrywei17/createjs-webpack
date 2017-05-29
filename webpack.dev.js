const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
var path = require('path');
module.exports = function(env) {
    return Merge(CommonConfig, {
        devServer: {
            inline: true,
            hot: true,
            contentBase: path.resolve(__dirname, 'build'),
            port: 3005
        },
    })
}