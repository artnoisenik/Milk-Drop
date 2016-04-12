var express = require('express');
var router = express.Router();
var knex = require('../lib/knex');
var queries = require('../lib');

/* GET home page. */
router.get('/', function(req, res, next) {
  knex('listings')
    .select('created_at', 'title', 'amount', 'cost_per_ounce', 'description', 'requested', 'portrait_link', 'city', 'verified')
    .join('users', 'users.id', 'listings.user_id')
    .then(function(listings) {
      res.clearCookie('id');
      res.cookie('id', Math.floor(Math.random() * (4)) + 1);
      res.render('index', {
        title: 'MilKonnect',
        listings: listings
      });
    });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'MilKonnect' });
});

module.exports = router;
