const express = require('express');
const app = express();
<<<<<<< HEAD
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');
const ueditor = require('ueditor');
const compression = require('compression');      // 压缩
const config = require('./config')
const logger = require('morgan');                  // 可以用log4js替换
const multipart = require('connect-multiparty');

//for the offline storage
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)     // 用于本地 session
const cookieParser = require('cookie-parser')
const dburl = 'mongodb://localhost/' + config.name;

// database
mongoose.connect(dburl)

// program config
app.set('port', process.env.PORT || config.port);                  // 设置端口号
app.set('views', './views/pages');
app.set('view engine', 'pug');

app.use(express.static('public'));
app.use(compression());
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(multipart());    // 如果有使用 ueditor, 这个上传和 ueditor的上传模块冲突，所以要放在 ueditor后面
=======
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
>>>>>>> origin/master

// 用户登录持久化
app.use(cookieParser());
app.use(session({
  secret: config.secret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 43200000 },
  store: new MongoStore({ url: dburl, collection: 'sessions' })
<<<<<<< HEAD
}))

// 本地变量设置
app.locals.moment = require('moment')
// app.locals._env = app.get('env')                   //pod里不能用这个
app.locals._env = process.env.NODE_ENV                // 判定是否开发环境，是就调用本地资源

=======
}));

// 本地变量设置，用于前段模板文件
app.locals.moment = require('moment');
app.locals._env = process.env.NODE_ENV;             // 判定是否开发环境，是就调用本地资源；生产环境则使用 cdn 资源

>>>>>>> origin/master
// 开发使用套件
if ('development' === app.get('env')){
  app.set('showStackErr', true)                     // 打印错误信息
  app.use(logger(':method:url:status'))             // 请求相关信息
  app.locals.pretty = true                          // 不压缩源码
  mongoose.set('debug', true)                       // 数据库请求信息
}

// 路由
<<<<<<< HEAD
require('./routes/router')(app);
=======
require('./app/routes/router')(app);
>>>>>>> origin/master

// 最后启动程序
const server = app.listen(app.get('port'), function() {
  console.log('网站程序已启动，端口： ' + server.address().port);
});
