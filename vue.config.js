module.exports = (options = {}) => ({
  publicPath: './',
  outputDir: '../backend/src/main/resources/static/ds',
  devServer: {
    host: 'localhost',
    port: 8066,
    disableHostCheck: true,   // That solved it
    proxy: {
      '/dev/': {
        // target: 'http://10.176.40.46:8080',
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/dev': '/abe'
        }
      },
      '/cert/': {
<<<<<<< HEAD
        // target: 'http://10.176.40.46/dpki/',
        target: 'http://127.0.0.1/dpki/',
=======
        target: 'http://10.176.40.46/dpki/',
>>>>>>> dabe
        changeOrigin: true,
        pathRewrite: {
          '^/cert': ''
        }
      }
    },
  },
})
