const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

let config
const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"'
    }
  }),
  new HTMLPlugin({
    template:path.join(__dirname,'./template.html')
  })
]
const devServer = {
  port: 8080,
  host: '0.0.0.0',
  overlay: {
    errors: true
  },
  historyApiFallback: {

  },
  open: true,
  hot: true
}
config = merge(baseConfig,{
  entry:path.join(__dirname,'../practice/index.js'),
  devtool: '#cheap-module-eval-source-map',
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
            loader: 'postcss-loader',
            options: {
              sourceMap: true //直接使用前面的（stylus-loader）生成的sourcemap
            }
          },
          'stylus-loader'
        ]
      }
    ]
  },
  devServer,
  // import Vue from 'vue'
  resolve: {
    alias: {
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  plugins: defaultPlugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ])
})

module.exports = config
