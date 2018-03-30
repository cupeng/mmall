const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev'

function getHtmlConfig(name,title){
    return {
        template: './src/view/'+ name +'.html',
        filename: 'view/'+ name +'.html',
        title: title,
        inject: true,
        hash: true,
        chunks: ['common', name]
    }
}

const config = {
    entry: {
        'common': ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'login': ['./src/page/login/index.js']
    },
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'js/[name].min.js'
    },
    externals: {
        'jquery': 'window.jQuery'
    },
    resolve : {
        alias : {
            node_modules: __dirname + '/node_modules',
            util: __dirname + '/src/util',
            page: __dirname + '/src/page',
            service: __dirname + '/src/service',
            image: __dirname + '/src/image'
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            { 
                test: /\.(png|jpg|gif|eot|svg|ttf|woff|woff2|otf)$/, 
                use: [
                    {
                        loader: 'url-loader'
                    }
                ] 
            },
            { 
                test: /\.css$/, 
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            
            { 
                test: /\.string$/, loader: 'html-loader'
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/common.min.js'
        }),
        new ExtractTextPlugin("css/[name].min.css"),
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('login','用户登录'))
    ],
    devServer: {
        port:8086,
        contentBase: path.resolve(__dirname,'dist'),
        proxy: {
            '/product': {
                target: 'http://www.happymmall.com',
                changeOrigin : true
            }
        }
    }
}

module.exports = config