const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

var WEBPACK_ENV         = process.env.WEBPACK_ENV || 'dev'

function getHtmlConfig(name,title){
    return {
        template: './src/view/'+ name +'.html',
        filename: 'view/'+ name +'.html',
        title: title,
        inject: true,
        hash: true,
        trunk: ['commom',name]
    }
}

const config = {
    entry: {
        'index': ['./src/page/index/index.js'],
        'login': ['./src/page/login/index.js']
    },
    output: {
        path: path.resolve(__dirname,'dist'),
        publicPath: '/dist/view',
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
    }
    module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
            { test: /\.string$/, loader: 'html-loader'}
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/commom.min.js'
        }),
        new ExtractTextPlugin("css/[name].min.css"),
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('login','登录'))
    ],
}

if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config