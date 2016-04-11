var express = require('express');
var router = express.Router();
var knex = require('../lib/knex');
var queries = require('../lib');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Milk Money' });
});

module.exports = router;
