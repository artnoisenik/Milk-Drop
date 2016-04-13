var express = require('express');
var router = express.Router();
var knex = require('../lib/knex');
var queries = require('../lib');
var handlebars = require('handlebars');
var bcrypt = require('bcryptjs');

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
    });
});

router.get('/posting/:id', function(req, res, next) {
  knex('listings').where('listings.id', req.params.id)
    .join('ratings', 'reciever_id', 'listings.user_id')
    .join('users', 'users.id', 'listings.user_id')
    .then(function(listings) {
      res.render('singleposting', {
        title: 'Milk Exchange',
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
  res.render('signup', {
    title: 'Milk Exchange'
  });
});

router.post('/signupSubmit', function(req, res, next) {
  var errorArray = [];

  if(!req.body.Email2) {
    errorArray.push('Please enter a username');
  }
  if(!req.body.Password2) {
    errorArray.push('Please enter a password');
  }
  if(errorArray.length > 0) {
    res.render('signup', {errors: errorArray});
  }
  else{
    res.render('completeprofile', {
      user: req.body
    });
  }
});

router.post('/signupSubmit2', function(req, res, next) {
  var hash = bcrypt.hashSync(req.body.Password, 8);
  queries.createNewUser(req.body.First, req.body.Last, req.body.Email, hash, req.body.Phone, req.body.PortraitLink, req.body.Address, req.body.Address_2, req.body.City, req.body.State, req.body.Zip)
    .then(function(id) {
      res.clearCookie('userID');
      res.cookie('userID', Number(id), { signed: true });
      res.redirect('/');
    });
});

router.get('/logout', function(req, res, next) {
  res.clearCookie('userID');
  res.redirect('/signup');
});

router.post('/login', function(req, res, next) {
  knex('users').where({ email: req.body.email }).first().then(function(user) {
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      res.clearCookie('userID');
      res.cookie('userID', user.id, { signed: true } );
      res.redirect('/');
    } else {
      res.redirect('/signup');
    }
  });
});


// router.post('/login', function(req,res,next){
//   knex('users')
//   .where('username', '=', req.body.username)
//   .first()
//   .then(function(response){
//     if(response && bcrypt.compareSync(req.body.password, response.password)){
//       req.session.user = response.username;
//       res.redirect('/');
//     } else {
//       res.render('login', {error: 'Invalid username or password'});
//     }
//   });
// });
//
// router.get('/logout', function(req,res,next){
//   req.session.user = null;
//   res.redirect('/');
// });


module.exports = router;
