var express = require('express');
var router = express.Router();
var knex = require('../lib/knex');
var queries = require('../lib');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Lact2Go' });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Lact2Go' });
});

module.exports = router;
