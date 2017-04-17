const express      = require('express');
const app          = express();
const path         = require('path');
const favicon      = require('serve-favicon');
const bodyParser   = require('body-parser');
const fs           = require('fs');
const mysql        = require('mysql');
// const ueditor = require('ueditor');
const compression  = require('compression');      // 压缩
const helmet       = require('helmet');      // 压缩
const logger       = require('morgan');                  // 可以用log4js替换
const multipart    = require('connect-multiparty');
const session      = require('express-session')
const Sequelize    = require('sequelize')
const SequelizeSto = require('connect-session-sequelize')(session.Store);
const cookieParser = require('cookie-parser')

const config       = require('./config')

// 连接数据库 mysql
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'user1',
  password : '123456,./',
  database : config.name
});
 
connection.connect();

const sequelize = new Sequelize(
config.name,
"user1",
"123456,./", {
    "dialect": "sqlite",
    "storage": "./session.sqlite"
});



// 模板引擎设置
app.set('port', process.env.PORT || config.port);   // 设置端口号
app.set('views', './app/views/pages');
app.set('view engine', 'pug');
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
}

// app 串联各种中间件
app.use(helmet());
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
  store: new SequelizeSto({db: sequelize}),
  proxy: false
}))

// 本地变量设置，用于前端模板文件
app.locals.moment = require('moment');
app.locals._env = process.env.NODE_ENV;             // 判定是否开发环境，是就调用本地资源；生产环境则使用 cdn 资源
app.locals._info = config.programSetting;           // 定义项目的通用内容，应用于前端

// 开发使用套件
if ('development' === app.get('env')){
  app.set('showStackErr', true)                     // 打印错误信息
  app.use(logger(':method:url:status'))             // 请求相关信息
  app.locals.pretty = true                          // 不压缩源码
  // mongoose.set('debug', true)                       // 数据库请求信息
}

// 路由
app.use('/', require('./app/routes/'));

// 如果没有被引用，最后启动程序
if (!module.parent){
  const server = app.listen(1999, function() {
    console.log('网站程序已启动，端口： ' + server.address().port);
  });
}
