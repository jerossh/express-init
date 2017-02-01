const Index = require('./controllers/index');
const fs = require('fs')
const path = require('path')

module.exports = function(app){

  // 路由之前，处理用户权限等等
  app.use(function(req, res, next){
    var _user = req.session.user
      app.locals.user = _user             
      next()
  })

  app.get('/', Index.new);

  // 路由结束
}
