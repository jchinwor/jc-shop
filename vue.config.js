const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    // proxy: 'http://localhost:8000',
    proxy: {
      '': {
         target: 'https://jc-shop-api.onrender.com',
         ws: false,
       }
    }
  },
  lintOnSave:false,
})
