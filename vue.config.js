const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
const isProduction = process.env.NODE_ENV === 'production';
const Timestamp = new Date().getTime();

module.exports = {
  // publicPath: process.env.NODE_ENV === 'production' ? '/vue-typescript-admin-template/' : '/',
  pwa: {
    name: 'vue-typescript-admin-template'
  },
  lintOnSave: false,
  productionSourceMap: false,

  devServer: {
    port:'8080',
  //   proxy: { // 配置代理
  //     '/api':{
  //       target:'http://47.244.44.174:8010/',
  //       changeOrigin:true,
  //       ws:false,
  //       pathRewrite: {
  //         "^/api/": "/"
  //       }
  //     }
  //   },
  // },
  // configureWebpack:{
  //   plugins:[ // 配置压缩文件
  //     new CompressionWebpackPlugin({
  //       algorithm: 'gzip',
  //       test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
  //       threshold: 10240,
  //       minRatio: 0.8,
  //     }),
  //   ],
  //   output: { // js输出
  //     filename: `js/[name].[chunkhash:8].${Timestamp}.js`,
  //     chunkFilename: `js/[name].[chunkhash:8].${Timestamp}.js`,
  //   },
  // },
  // css: {
  //   extract: { // css输出
  //     filename: `css/[name].[contenthash:8]${Timestamp}.css`,
  //     chunkFilename: `css/[name].[contenthash:8]${Timestamp}.css`,
  //   },
  },
}
