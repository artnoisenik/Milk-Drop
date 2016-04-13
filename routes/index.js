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
      res.render('index', {
        title: 'Milk Exchange',
        listings: listings,
        user: req.user
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

router.post('/signupSubmit', function(req, res, next){
  res.render('completeprofile', { user: req.body });
});

router.post('/signupSubmit2', function(req, res, next){
  queries.createNewUser(req.body.First, req.body.Last, req.body.Email2, req.body.Password, req.body.Phone, req.body.PortraitLink, req.body.Address, req.body.Address_2, req.body.City, req.body.State, req.body.Zip).then(function(id){
    res.redirect('/');
  });
});

router.post('/login', function(req, res, next) {
  res.clearCookie('id');
  res.cookie('id', Math.floor(Math.random() * (4)) + 1, { signed: true } );
  res.redirect('/');
});

module.exports = router;
