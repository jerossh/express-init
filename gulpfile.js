'use strict'

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create('zhongyu');
// var reload = browserSync.reload;
var config = require('./config');
// const path = require('path');

// stylus need
var data = require('gulp-data');
var stylus = require('gulp-stylus');
var rename = require('gulp-rename');     // 重命名
var sourcemaps = require('gulp-sourcemaps');  // 就是开发调试的时候压缩文件映射到源文件



// 路径定义
var paths = {
  'routes': './routes/controllers/*.js',
  'models': './models/schemas/*.js'
}

// 系统判定，用于win 不能正确 chrome 的 bug
var openBrowser = (process.platform === 'win32')?false:true;

// 编译 stylus，开发模式的调试使用
gulp.task('stylus2css', function () {
  return gulp.src('./public/dev/stylus/*.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/stylesheet/'));
});

// 压缩且没有映射用于项目 build
gulp.task('compress', function () {
  return gulp.src('./public/dev/stylus/main.styl')
    .pipe(stylus({
      compress: true
    }))
    .pipe(gulp.dest('./public/stylesheet/build'));
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
    // watch:    [paths.routes, paths.models],
    env: { 'NODE_ENV': 'development' }
  })
})

// 前端页面自动刷新
gulp.task('start', ['serve'], function() {
  browserSync.init({      // null 干什么用？
      proxy: 'http://localhost:' + config.port,   // 监控代理地址
      files: ['./public', './views'],   // 监控的文件
      open: openBrowser,                 // 是否打开浏览器
      browser: 'google chrome',         // 打开的浏览器名称
      notify: false,                    // 浏览器不现实通知，不知道什么意思
      port: 5000                        // 映射到的地址
  });
  gulp.watch('./dev_public/stylus/*.styl', ['stylus2css']);
})


gulp.task('build', ['compress'])
// gulp.task('default', ['start', 'css'])
