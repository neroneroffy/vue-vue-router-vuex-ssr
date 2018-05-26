const path = require('path');
const isDev = process.env.NODE_ENV === 'development';
const createVueLoaderOptions = require('./vue-loader.config');

const config = {
    target:'web',
    entry:path.join(__dirname, '../client/index.js'),
    output:{
        filename:'bundle.[hash:8].js',
        path:path.join(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /\.(vue|js|jsx)/,
                loader:'eslint-loader',
                exclude:/node_modules/,
                enforce:"pre"
            },
            {
                test: /\.vue/,
                loader:'vue-loader',
                options:createVueLoaderOptions(isDev)
            },
            {
                test: /\.jsx/,
                loader:'babel-loader'
            },
            {
                test: /\.js/,
                loader:'babel-loader',
                exclude:/node_modules/
            },
            {
                test:/\.(gif|jpg|jpeg|png|svg)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit: 1024,//小于1024的转为base64,
                            name:'resource/[path][name].[hash].[ext]'
                        }
                    }
                ]
            }

        ]
    }
}


module.exports = config