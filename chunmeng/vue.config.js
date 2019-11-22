module.exports = {
  outputDir: './myDist',
  devServer: {
    port: '8888',
    proxy:{
      '/api': {
        target: 'https://www.zustservice.cn'
      },
      '/user': {
        target: 'https://www.zustservice.cn'
      }
    }
  },
  
}