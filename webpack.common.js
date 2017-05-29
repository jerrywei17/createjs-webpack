var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
module.exports = {
    devtool: 'cheap-module-source-map',
    //app: ['webpack/hot/dev-server', './src/js/index.js'],
    entry: {
        main: './src/js/index.js',
        vendor: ['Easeljs', 'Tweenjs', 'Preloadjs']
    },

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/[name].js',
        sourceMapFilename: '[name].map'
    },

    resolve: {
        alias: {
            Easeljs: path.resolve(__dirname, 'src/lib/EaselJS/easeljs-0.8.2.min.js'),
            Tweenjs: path.resolve(__dirname, 'src/lib//TweenJS/tweenjs-0.6.2.min.js'),
            Preloadjs: path.resolve(__dirname, 'src/lib/PreloadJS/preloadjs-0.6.2.min.js'),
        }
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader',
                    fallback: 'style-loader',
                })
            },
            {
                test: /\.(png|gif|jpe?g)$/i,
                use: {
                    loader: 'url-loader',
                    query: {
                        limit: 10000,
                        name: 'img/[name].[ext]'
                    }
                }
            },
            {
                test: /\.(png|gif|jpe?g)$/i,
                use: {
                    loader: 'file-loader',
                    query: {
                        name: 'img/[name].[ext]'
                    }
                }
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: {
                    loader: 'url-loader',
                    query: {
                        limit: 10000,
                        minetype: 'application/font-woff',
                        name: 'font/[name].[ext]'
                    }
                }
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: {
                    loader: 'file-loader',
                    query: {
                        name: 'font/[name].[ext]'
                    }
                }
            },
            {
                test: /src(\/|\\)lib(\/|\\)(PreloadJS|SoundJS|EaselJS|TweenJS)(\/|\\).*\.js$/,
                use: "imports-loader?this=>window"
            }

        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'js/vendor.bundle.js',
            minChunks: function(module) {
                // 该配置假定你引入的 vendor 存在于 node_modules 目录中
                return module.context && module.context.indexOf('node_modules') !== -1;
            }

        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new webpack.HotModuleReplacementPlugin(), //开启热替换插件        
        new ExtractTextPlugin({
            filename: "css/[name].css"
        }),

        new HtmlWebpackPlugin({
            title: 'My App',
            filename: 'index.html',
            template: 'src/index.html'
        })

    ]
}