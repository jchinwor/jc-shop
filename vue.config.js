const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    // proxy: 'http://localhost:8000',
    proxy: {
      '': {
         target: 'http://localhost:8000',
         ws: false,
       }
    }
  },
  lintOnSave:false,
})
