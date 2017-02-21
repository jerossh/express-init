const express = require('express');
const app = express();
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const compression = require('compression');
const logger = require('morgan');
const multipart = require('connect-multiparty');
const cookieParser = require('cookie-parser');   // session 需要用 cookie 配合使用
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);  // 用于本地 session
const config = require('./config');
const dburl = 'mongodb://localhost/' + config.name;

// 连接数据库
mongoose.connect(dburl);

// 模板引擎设置
app.set('port', process.env.PORT || config.port);   // 设置端口号
app.set('views', './app/views/pages');
app.set('view engine', 'pug');

// app 串联各种中间件
app.use(express.static('./app/public'));
app.use(compression());
app.use(favicon(__dirname + '/app/public/images/favicon.ico'));
app.use(bodyParser.urlencoded({ extended: true }));  // key/value 使用
app.use(bodyParser.json());
app.use(multipart());   // 如果有使用 ueditor, 这个上传和 ueditor的上传模块冲突，所以要放在 ueditor后面

// 用户登录持久化
app.use(cookieParser());
app.use(session({
  secret: config.secret,
  resave: false,  // 除非修改否则不会重新保存
  saveUninitialized: false,  // 除非登陆否则不会有 cookie
  cookie: { secure: false, maxAge: 43200000 },
  // cookie: { domain:'.yourdomain.com'}, 各个子域名中共享
  store: new MongoStore({ url: dburl, collection: 'sessions' })
}));

// 本地变量设置，用于前段模板文件
app.locals.moment = require('moment');
app.locals._env = process.env.NODE_ENV;             // 判定是否开发环境，是就调用本地资源；生产环境则使用 cdn 资源

// 开发使用套件
if ('development' === app.get('env')){
  app.set('showStackErr', true)                     // 打印错误信息
  app.use(logger(':method:url:status'))             // 请求相关信息
  app.locals.pretty = true                          // 不压缩源码
  mongoose.set('debug', true)                       // 数据库请求信息
}

// 路由
app.use('/', require('./app/routes/'));

// 如果没有被引用，最后启动程序
if (!module.parent){
  const server = app.listen(app.get('port'), function() {
    console.log('网站程序已启动，端口： ' + server.address().port);
  });
}
