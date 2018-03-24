const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

function getHtmlConfig(name){
    return {
        template: './src/view/'+ name +'.html',
        filename: 'view/'+ name +'.html',
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
    module: {
        rules: [
            { test: /\.css$/, use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            }) }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/commom.min.js'
        }),
        new ExtractTextPlugin("css/[name].min.css"),
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login'))
    ],
    devServer: {}
}

module.exports = config