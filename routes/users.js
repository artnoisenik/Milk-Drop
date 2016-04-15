var express = require('express');
var router = express.Router();
var knex = require('../lib/knex');
var queries = require('../lib');

function authorizedUser(req, res, next) {
  var user_id = req.signedCookies.userID;
  var admin = req.signedCookies.admin;
  if (user_id && !admin) {
    layout = 'loggedinlayout';
    next();
  } else if (user_id && admin) {
    layout = 'adminloggedin';
    next();
  } else {
    res.redirect('/signup');
  }
}

router.post('/request/:id', authorizedUser, function(req, res, next) {
  knex('listings').where({
    id: req.params.id
  }).then(function(listing) {
    knex('transactions').insert({
      supplier_id: listing[0].user_id,
      requester_id: req.signedCookies.userID,
      listing_id: req.params.id,
      ended: false,
      accepted: false
    }).then(function() {
      knex('listings').where('id', req.params.id).update({ requested: true }).then(function() {
        if (listing) {
          if (listing[0].cost_per_ounce == '0') {
            listing[0].cost_per_ounce = 'Free';
            // listing[0].total = 0;
            listing[0].total = 'Free';
          } else {
            listing[0].total = (listing[0].cost_per_ounce * listing[0].amount);
          }
        }
        res.render('request', {
          listing: listing[0],
          name: req.signedCookies.name,
          layout: layout
        });
      });
    });
  });
});

router.get('/accept/:id/:requester_id', authorizedUser, function(req, res, next) {
  knex('transactions').where('listing_id', req.params.id).update({ accepted: true })
  .then(function() {
    knex('transactions').where('listing_id', req.params.id)
    .then(function(transaction){
      knex('notifications').insert({ user_id: transaction[0].requester_id, listing_id: transaction[0].id, message: "Your request has been accepted!", displayed: false})
      .then(function(){
        knex('listings').where('id', req.params.id).update({
          closed: true
        }).then(function() {
          res.redirect('/users/profile');
        });
      })
    });
  });
});

router.get('/reject/:id/:requester_id', authorizedUser, function(req, res, next){
  knex('transactions').where({listing_id: req.params.id})
  .then(function(transaction){
    knex('notifications').insert({ user_id: transaction[0].requester_id, listing_id: transaction[0].id, message: "Your request has been denied!", displayed: false})
    .then(function(){
      knex('transactions').where({listing_id:req.params.id, requester_id: req.params.requester_id}).update({ended: true})
      .then(function(){
        res.redirect('/users/profile');
      });
    });
  });
});

router.get('/clearNotification/:id', authorizedUser, function(req, res, next){
  knex('notifications').where({user_id: req.signedCookies.userID, id: req.params.id}).update({displayed: true}).then(function(){
    res.redirect('/users/profile');
  });
});

router.get('/posting', authorizedUser, function(req, res, next) {
  res.render('newposting', {
    title: 'Milk Drop - Add Posting',
    name: req.signedCookies.name,
    layout: layout
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
      description: req.body.description,
      closed: false
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
              accepted: false,
              ended: false
            })
            .innerJoin('listings', 'transactions.listing_id', 'listings.id')
            .innerJoin('users', 'transactions.requester_id', 'users.id')
            .then(function(transactions) {
              knex('notifications').where({ user_id: req.signedCookies.userID, displayed: false })
              .then(function(notifications){
                res.render('profile', {
                  title: 'Milk Drop',
                  name: req.signedCookies.name,
                  layout: layout,
                  listings: listings,
                  user: user[0],
                  transactions: transactions,
                  notifications: notifications
                });
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
    layout: layout
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
        layout: layout,
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
        layout: layout,
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

router.get('/profile/:id/delete', authorizedUser, function(req, res, next){
  if(req.signedCookies.userID === req.params.id){
    queries.deleteProfile(req.params.id).then(function(){
      res.clearCookie('userID');
      res.clearCookie('admin');
      res.clearCookie('name');
      res.redirect('/signup');
    })
  }
});


router.get('/adminusers/:id/delete', function(req, res, next) {
  knex('users').where('users.id', req.params.id).del()
    .then(function() {
      res.redirect('/users/admin/allusers');
    });
});

module.exports = router;
