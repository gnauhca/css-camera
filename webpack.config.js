const webpack = require('webpack');
const path = require('path');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/main.js')
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'C3.js',
        library: "C3",
        libraryTarget:'umd'
    },

    devtool: 'source-map',

    plugins: [
        // new UglifyJSPlugin(/*{uglifyOptions: {mangle: false}}*/)
    ]
    // module: {
    //     rules: [
    //         {
    //             test: /.*\.scss$/, 
    //             use: ['style-loader', 'css-loader', 'sass-loader']
    //         }
    //     ]
    // },

    // devServer: {
    //     publicPath: '/dist',
    //     disableHostCheck: true,
    //     contentBase: __dirname,
    //     host: '0.0.0.0',
    //     port: 9123
    // }
}