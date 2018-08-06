var express = require('../express');
var router = express.router();

/* GET home page. */
router.get('/', function(req, res, next) {
  express.render(res, 'index', {title: 'Express'});
});

module.exports = router;
