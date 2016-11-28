var Index = require('./controllers/index');


var fs = require('fs')
var path = require('path')

module.exports = function(app){

  // 路由之前，处理用户权限等等
  app.use(function(req, res, next){
    var _user = req.session.user          // 登录后有一个转跳的过程，正好把参数传到这里
      app.locals.user = _user             // The app.locals object is a JavaScript object,
      next()                              // and its properties are local variables within the application.
  })

  // 路由开始
  // 前端页面
  app.get('/', Index.new);

  // 路由结束

  // // 处理url错误的请求，要放在 路由后面
  // // catch 404 and forward to error handler
  // app.use(function(req, res, next) {
  //     var err = new Error('您的页面未找到，尝试一下搜索吧');
  //     err.status = 404;
  //     next(err);
  // });
  // // development error handler
  // // will print stacktrace
  // if (app.get('env') === 'development') {
  //     app.use(function(err, req, res, next) {
  //         res.status(err.status || 500);
  //         res.render('error', {
  //             message: err.message,
  //             error: err,
  //             title: '开发模式'
  //         });
  //     });
  // }
  // // production error handler
  // // no stacktraces leaked to user
  // app.use(function(err, req, res, next) {
  //     res.status(err.status || 500);
  //     res.render('error', {
  //         message: err.message,
  //         error: {},
  //         title: '生产模式'
  //     });
  // });

// 结束
}
