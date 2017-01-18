'use strict'

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync').create('zhongyu');
const config = require('./config');

// stylus need
const data = require('gulp-data');
const stylus = require('gulp-stylus');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');  // 就是开发调试的时候压缩文件映射到源文件

// 错误处理
const plumber = require('gulp-plumber');

// 路径定义
var paths = {
  'routes': './routes/controllers/*.js',
  'models': './models/schemas/*.js'
}

// 系统判定，用于win 不能正确 chrome 的 bug
var openBrowser = (process.platform === 'win32')?false:true;

// 编译 stylus，开发模式的调试使用
gulp.task('stylus2css', function () {
  return gulp.src('./public/stylus/*.styl')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/stylesheet/'));
});

// 压缩且没有映射用于项目 build
gulp.task('compress', function () {
  return gulp.src('./public/stylus/*.styl')
    .pipe(stylus({
      compress: true
    }))
    .pipe(rename({suffix: '.min',}))
    .pipe(gulp.dest('./public/stylesheet/'));
});

// 应用自动重启
gulp.task('serve', function () {
  nodemon({
    script: 'app.js',
    ext: 'js',
    ignore: [
      './public/',
      './idea/',
    ],
    env: { 'NODE_ENV': 'development' }
  })
})

// 前端页面自动刷新
gulp.task('start', function() {
  browserSync.init({      // null 干什么用？
      proxy: 'http://localhost:' + config.port,   // 监控代理地址
      files: ['./public', './views'],             // 监控的文件
      open: openBrowser,                          // 是否打开浏览器
      browser: 'google chrome',                   // 打开的浏览器名称
      notify: false,                              // 浏览器不现实通知，不知道什么意思
      port: 5000                                  // 映射到的地址
  });
  gulp.watch('./util/dev_public/stylus/*.styl', ['stylus2css']);
})


gulp.task('build', ['compress'])
gulp.task('default', ['serve', 'start'])
