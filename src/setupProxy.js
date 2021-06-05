const proxy = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(proxy('/api', {
    target:'http://123.56.149.216:8080',
    secure: false,
    changeOrigin: true,
  }))
}
