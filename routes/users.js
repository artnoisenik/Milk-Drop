var express = require('express');
var router = express.Router();
var knex = require('../lib/knex');
var queries = require('../lib');

function authorizedUser(req, res, next) {
  var user_id = req.signedCookies.userID;
  if (user_id) {
    next();
  } else {
    res.redirect('/signup');
  }
}

router.post('/request/:id', authorizedUser, function(req, res, next) {
  knex('listings').where({
    id: req.params.id
  }).then(function(listing) {
    console.log(listing);
    console.log(req.signedCookies.userID);
    knex('transactions').insert({
      listing_id: req.params.id,
      supplier_id: listing[0].user_id,
      requester_id: req.signedCookies.userID,
      closed: true,
      accepted: false
    }).then(function() {
      res.render('request', {
        listing: listing[0],
        name: req.signedCookies.name,
        layout: 'loggedinlayout'
      });
    });
  });
});

router.get('/accept/:id', authorizedUser, function(req, res, next) {
  knex('transactions').where('listing_id', req.params.id).update({
    accepted: true
  }).then(function() {
    knex('listings').where('id', req.params.id).update({
      closed: true
    }).then(function() {
      res.redirect('/');
    });
  });
});

router.get('/posting', authorizedUser, function(req, res, next) {
  res.render('newposting', {
    title: 'Milk Drop - Add Posting',
    name: req.signedCookies.name,
    layout: 'loggedinlayout'
  });
});

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
      // res.render('newposting', { title: 'Milk Exchange', success: 'Post added' });
      res.redirect('/');
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

router.get('/profile', authorizedUser, function(req, res, next) {
  knex('listings')
    .where('user_id', req.signedCookies.userID)
    .join('users', 'users.id', 'listings.user_id')
    .then(function(listings) {
      knex('users')
        .where('users.id', req.signedCookies.userID)
        .join('ratings', 'reciever_id', 'users.id')
        .then(function(user) {
          knex('transactions').where({
              supplier_id: req.signedCookies.userID,
              accepted: false
            })
            .innerJoin('listings', 'transactions.listing_id', 'listings.id')
            .innerJoin('users', 'transactions.requester_id', 'users.id')
            .then(function(transactions) {
              console.log(transactions);
              res.render('profile', {
                title: 'Milk Drop',
                name: req.signedCookies.name,
                layout: 'loggedinlayout',
                listings: listings,
                user: user[0],
                transactions: transactions
              });
            });
        });
    });
});

router.post('/profile/:id', function(req, res, next) {
  knex('users')
    .where('id', req.params.id).first()
    .returning('id')
    .update({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      phone: req.body.phone,
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

router.get('/admin', authorizedUser, function(req, res, next) {
  res.render('admin', {
    name: req.signedCookies.name,
    layout: 'loggedinlayout'
  });
})

router.get('/admin/alllistings', authorizedUser, function(req, res, next) {
  knex('listings')
    .join('ratings', 'reciever_id', 'listings.user_id')
    .join('users', 'users.id', 'listings.user_id')
    .then(function(listings) {
      console.log(listings);
      res.render('adminlisting', {
        title: 'Milk Drop',
        name: req.signedCookies.name,
        layout: 'loggedinlayout',
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

router.get('/admin/allusers', authorizedUser, function(req, res, next) {
  knex('ratings')
    .join('users', 'users.id', 'reciever_id')
    .orderBy('users.id')
    .then(function(users) {
      res.render('adminusers', {
        title: 'Milk Drop - All Users',
        name: req.signedCookies.name,
        layout: 'loggedinlayout',
        users: users
      });
    });
})

router.post('/adminusers/:id/update', function(req, res, next) {
  knex('users')
    .where('id', req.params.id).first()
    .returning('id')
    .update({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      phone: req.body.phone,
      portrait_link: req.body.portrait_link,
      address_1: req.body.address_1,
      address_2: req.body.address_2,
      city: req.body.city,
      state: req.body.state,
      zip_code: req.body.zip_code,
      admin: req.body.admin
    })
    .then(function(userID) {
      knex('ratings')
        .where('reciever_id', userID[0]).first()
        .update({
          rating: req.body.rating
        }).then(function() {
          res.redirect('/users/admin/allusers');
        })
    });
})

router.get('/adminusers/:id/delete', function(req, res, next) {
  knex('users').where('users.id', req.params.id).del()
    .then(function() {
      res.redirect('/users/admin/allusers');
    })
})

module.exports = router;
