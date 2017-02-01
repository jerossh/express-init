const _ = require('lodash');

exports.new = function(req, res) {
  console.log('初始化系统');
  res.render('index', { title: 'Jon的项目' })
}
