const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge')
const ExtractPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base')
const isDev = process.env.NODE_ENV === 'development';

let config;
const defaultPlugins = [
    new webpack.DefinePlugin({
        'process.env':{
            NODE_ENV:isDev? '"development"':'"production"'
        }
    }),
    new HTMLPlugin()
]
const  devServer={
        port :8000,
        host :'0.0.0.0',
        overlay:{
            errors:true
        },
        historyApiFallback:{

        },
        open:true,
        hot:true
    }
if(isDev){
    config = merge(baseConfig,{
        module:{
            rules:[
                {
                    test:/\.styl/,
                    use:[
                        'vue-style-loader',
                        'css-loader',
/*
                    从外部引入的styl遵循cssModule规则
                        {
                            loader:'css-loader',
                            options:{
                                module:true,
                                localIdentName:isDev? '[path]-[name]-[hash:base64:5]':'[hash:base64:5]',
                                camelCase:true//将用横杠链接的类名转换为驼峰命名
                            }
                        },
*/
                        {
                            loader:'postcss-loader',
                            options:{
                                sourceMap:true//直接使用前面的（stylus-loader）生成的sourcemap
                            }
                        },
                        'stylus-loader'
                    ]
                }
            ]
        },
        devtool: '#cheapmodule-eval-source-map',
        devServer,
        plugins:defaultPlugins.concat([
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ])
    })

}else{
    config = merge(baseConfig,{
        entry:{
            entry:path.join(__dirname, '../client/index.js'),
            vendor:['vue']
        },
        output:{
            filename:'[name].[chunkhash:8].js'
        },
        module:{
            rules:[
                {
                    test:/\.styl/,
                    use:ExtractPlugin.extract({
                        fallback:'vue-style-loader',
                        use:[
                            'css-loader',
                            {
                                loader:'postcss-loader',
                                options:{
                                    sourceMap:true//直接使用前面的（stylus-loader）生成的sourcemap
                                }
                            },
                            'stylus-loader'
                        ]
                    })
                },
            ]
        },
        plugins:defaultPlugins.concat([
            new ExtractPlugin('style.[contentHash]:8.css'),
            new webpack.optimize.CommonsChunkPlugin({
                name:'vendor'
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name:'runtime'
            }),

        ])
    })

}

module.exports = config