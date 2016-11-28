'use strict'

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create('zhongyu');
var config = require('./config')
// const path = require('path');

var paths = {
  'routes': './routes/controllers/*.js',
  'models': './models/schemas/*.js'
}

gulp.task('serve', function () {
  nodemon({
    script: 'app.js',
    ext: 'js',
    ignore: [
      './public/'
    ],
    // watch:    [paths.routes, paths.models],
    env: { 'NODE_ENV': 'development' }
  })
})

gulp.task('start', ['serve'], function() {
  browserSync.init(null, {      // null 干什么用？
      proxy: 'http://localhost:' + config.port,   // 监控代理地址
      files: ['./public', './views'],   // 监控的文件
      open: false,                 // 是否打开浏览器
      browser: 'google chrome',         // 打开的浏览器名称
      notify: false,                    // 浏览器不现实通知，不知道什么意思
      port: 5000                        // 映射到的地址
  });
})
