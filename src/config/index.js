const isDev = process.env.NODE_ENV === 'development'
// dev:开发状态连接本地后台，服务器起在3000端口
// production:产品未来设置连接远程服务器，连接公网

export default {
  baseUrl: {
    dev: 'http://localhost:3000',
    pro: 'http://159.75.140.167:3000'
  },
  publicPath: [/^\/public/, /^\/login/],
  wsconfig: {
    url: isDev ? '127.0.0.1' : '',
    port: isDev ? '3001' : 22001
  }
}
