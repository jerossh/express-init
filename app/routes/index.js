const Index = require('./controllers/index');
const fs = require('fs')
const path = require('path')
const router = require('express').Router();

router.use(function(req, res, next){
  var _user = req.session.user
    res.locals.user = _user
    next()
})
router.get('/', Index.new);

module.exports = router;
