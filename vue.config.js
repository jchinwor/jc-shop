const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/',
  outputDir: 'dist',
  indexPath: 'index.html', // Ensure index.html is built
  devServer:{
    // proxy: 'http://localhost:8000',
    proxy: {
      '': {
         target: 'https://api-jcshop.cleanupnaija.online/',
         ws: false,
       }
    }
  },
  lintOnSave:false,
})
