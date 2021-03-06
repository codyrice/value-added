var express = require('express');
var rdb = require('../lib/rethink');
var auth = require('../lib/auth');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Valuable Support' });
});

router.get('/userlist', auth.authorize, function (request, response) {
  rdb.findAll('users')
  .then(function (users) {
    response.json(users);
  });
});

module.exports = router;
