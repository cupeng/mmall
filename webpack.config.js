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
        'user-login': ['./src/page/user-login/index.js'],
        'user-register': ['./src/page/user-register/index.js'],
        'user-pass-reset': ['./src/page/user-pass-reset/index.js'],
        'result': ['./src/page/result/index.js']
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
                        loader: 'url-loader',
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
        new HtmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset','找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('result','操作页'))
    ],
    devServer: {
        port:8086,
        contentBase: path.resolve(__dirname,'dist/'),
        proxy: {
            '/product': {
                target: 'http://www.happymmall.com',
                changeOrigin: true
            },
            '/user': {
                target: 'http://www.happymmall.com',
                changeOrigin: true
            },
            '/cart': {
                target: 'http://www.happymmall.com',
                changeOrigin: true
            }
        }
    }
}

module.exports = config