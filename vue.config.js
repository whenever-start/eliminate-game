module.exports = {
  publicPath: '/eliminate-game',
  outputDir: 'dist',
  assetsDir: 'assets',
  chainWebpack: (config) => {
    config.resolve.alias
      .set('components', '@/components')
      .set('assets', '@/assets')
      .set('views', '@/views')
  },
  devServer: {
    // 设置 open, 启动报错
    // open: true,
    host: 'localhost',
    port: 8080,
    https: false,
    hotOnly: false
  }
}
