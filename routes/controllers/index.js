
const _ = require('lodash');

exports.new = function(req, res) {

  console.log('感谢使用Jon_shen 提供的 express 初始化系统');
  res.render('index', {
    title: 'Jon的项目',
    
  })

}
