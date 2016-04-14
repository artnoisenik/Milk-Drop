var express = require('express');
var router = express.Router();
var knex = require('../lib/knex');
var queries = require('../lib');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// function isAuthenticated(req, res, next) {
//     if (req.user.authenticated)
//         return next();
//     // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
//     res.redirect('/signup');
// }

router.post('/request', function(req, res, next) {
  res.redirect('/signup');
});

router.get('/posting', function(req, res, next) {
  res.render('newposting', {
    title: 'Milk Drop - Add Posting'
  });
})

router.post('/addposting', function(req, res, next) {
  knex('listings')
    .insert({
      user_id: req.signedCookies.userID,
      title: req.body.title,
      post_end: req.body.expiration_date,
      amount: req.body.amount,
      cost_per_ounce: req.body.cost_per_ounce,
      description: req.body.description
    })
    .then(function() {
      res.render('newposting', {
        title: 'Milk Drop',
        success: 'Post added'
      });
    });
})

router.get('/post/edit/:id', function(req, res, next) {
  knex('listings')
    .where('id', req.params.id).first()
    .then(function(post) {
      console.log(post);
      res.render('editposting', {
        title: 'Milk Drop',
        post: post
      })
    })
})

router.post('/post/edit/:id', function(req, res, next) {
  knex('listings')
    .where('id', req.params.id).first()
    .returning('id')
    .update({
      'title': req.body.title,
      'post_end': req.body.post_end,
      'amount': req.body.amount,
      'cost_per_ounce': req.body.cost_per_ounce,
      'description': req.body.description
    })
    .then(function(post_id) {
      res.redirect(302, '/users/post/edit/' + post_id);
    });
})

router.get('/profile', function(req, res, next) {
  if (req.signedCookies.userID) {
    knex('listings')
      .where('user_id', req.signedCookies.userID)
      .select('created_at', 'portrait_link', 'title', 'amount', 'cost_per_ounce', 'description', 'requested', 'verified', 'user_id')
      .join('users', 'users.id', 'listings.user_id')
      .then(function(listings) {
        knex('users')
          .where('id', req.signedCookies.userID)
          .select('first_name', 'last_name', 'portrait_link', 'email', 'address_1', 'address_2', 'city', 'state', 'zip_code', 'id')
          .then(function(user) {
            res.render('profile', {
              title: 'Milk Exchange',
              listings: listings,
              user: user[0]
            });
          })
      });
  } else {
    res.redirect('/signup');
  }
});

router.post('/profile/:id', function(req, res, next) {
  knex('users')
    .where('id', req.params.id).first()
    .returning('id')
    .update({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      portrait_link: req.body.portrait_link,
      address_1: req.body.address_1,
      address_2: req.body.address_2,
      city: req.body.city,
      state: req.body.state,
      zip_code: req.body.zip_code
    })
    .then(function(profile_id) {
      res.redirect('/users/profile/');
    });
})

router.get('/admin', function(req, res, next) {
  res.render('admin');
})

router.get('/admin/alllistings', function(req, res, next) {
  knex('listings')
    .join('ratings', 'reciever_id', 'listings.user_id')
    .join('users', 'users.id', 'listings.user_id')
    .then(function(listings) {
      console.log(listings);
      res.render('adminlisting', {
        title: 'Milk Drop',
        listings: listings
      });
    });
})

router.post('/admin/listings/:id/delete', function(req, res, next) {
  knex('listings').where('id', req.params.id).del()
    .then(function(response) {
      res.redirect('/users/admin/alllistings');
    })
})

router.get('/admin/allusers', function(req, res, next) {
  knex('ratings')
    .join('users', 'users.id', 'reciever_id')
    .then(function(users) {
      res.render('adminusers', {
        title: 'Milk Drop - All Users',
        users: users
      });
    });
})

router.post('/admin/:id/delete', function(req, res, next) {
  knex('users').where('users.id', req.params.id).del()
    .then(function() {
      res.redirect('/users/admin/allusers');
    })
})

module.exports = router;
