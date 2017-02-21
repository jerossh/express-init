const _ = require('lodash');

exports.new = function(req, res) {
  console.log('恭喜，页面打开成功');
  res.render('index', { title: 'example page' })
}
