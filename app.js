var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var fs = require('fs');
var mongoose = require('mongoose');
var ueditor = require('ueditor');
const compression = require('compression');      // 压缩
var config = require('./config')


// 开发用的模块
var logger = require('morgan');                  // HTTP request logger middleware for node.js

var multipart = require('connect-multiparty');


//for the offline storage
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)     // 用于本地 session
var cookieParser = require('cookie-parser')
var dburl = 'mongodb://localhost/' + config.name;

// database
mongoose.connect(dburl)
// mongoose.on('error', console.error.bind(console,'连接错误:'));    // 报错，not a function

// program config
app.set('port', process.env.PORT || config.port);                  // 设置端口号
app.set('views', './views/pages');
app.set('view engine', 'pug');

app.use(express.static('public'));

app.use(compression());


app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());


// 如果有使用 ueditor, 这个上传和 ueditor的上传模块冲突，所以要放在 ueditor后面
app.use(multipart());

// 用户登录持久化
app.use(cookieParser());        //session 依赖的中间件  存储sessionid
app.use(session({               //用来本地存储信息 store 对象
  secret: config.secret,
  resave: false,                // 不设置为 true, 登录会失败
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 43200000              // 半个小时
  },                            // 这次是这里设置为false才登陆成功，resave 设置false， 奇怪
  store: new MongoStore({
    url: dburl,
    collection: 'sessions'      // 这条不懂，为什么是sessions是
  })
}))

// 本地变量设置
app.locals.moment = require('moment')
// app.locals._env = app.get('env')                   //pod里不能用这个
app.locals._env = process.env.NODE_ENV                // 判定是否开发环境，是就调用本地资源


// 开发使用套件
if ('development' === app.get('env')){              // 如果是开发环境
  app.set('showStackErr', true)                     // 打印错误信息
  app.use(logger(':method:url:status'))             // 请求相关信息
  app.locals.pretty = true                          // 不压缩源码
  mongoose.set('debug', true)                       // 数据库请求信息
}

// 路由
require('./routes/router')(app);


// 最后启动程序
var server = app.listen(app.get('port'), function() {
  console.log('网站程序已启动，端口： ' + server.address().port);
});
