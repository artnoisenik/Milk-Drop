var express = require('express');
var router = express.Router();
var knex = require('../lib/knex');
var queries = require('../lib');
var handlebars = require('handlebars');

/* GET home page. */
router.get('/', function(req, res, next) {
  knex('listings')
    .select('rating', 'listings.id', 'created_at', 'title', 'amount', 'cost_per_ounce', 'description', 'requested', 'portrait_link', 'city', 'verified')
    .join('ratings', 'reciever_id', 'listings.user_id')
    .join('users', 'users.id', 'listings.user_id')
    .then(function(listings) {
      res.clearCookie('id');
      res.cookie('id', Math.floor(Math.random() * (4)) + 1, { signed: true } );
      res.render('index', {
        title: 'Milk Exchange',
        id: req.signedCookies.id,
        listings: listings
      });
      console.log(listings);
    });
});

router.get('/posting/:id', function(req,res,next){
  knex('listings').where('listings.id', req.params.id)
    .select('created_at', 'listings.id', 'title', 'amount', 'cost_per_ounce', 'description', 'requested', 'portrait_link', 'city', 'verified')
    .join('users', 'users.id', 'listings.user_id')
    .then(function(listings) {
      res.clearCookie('id');
      res.cookie('id', Math.floor(Math.random() * (4)) + 1, { signed: true } );
      res.render('singleposting', {
        title: 'MilConnect',
        id: req.signedCookies.id,
        listings: listings
      })
    })
})
router.get('/pasteurize', function(req, res, next) {
  res.render('pasteurize');
});
router.get('/massage', function(req, res, next) {
  res.render('massage');
});
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'MilConnect' });
});

module.exports = router;
