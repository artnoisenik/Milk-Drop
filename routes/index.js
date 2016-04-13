var express = require('express');
var router = express.Router();
var knex = require('../lib/knex');
var queries = require('../lib');
var handlebars = require('handlebars');
var bcrypt = require('bcryptjs');
var request = require('request');

router.get('/', function(req, res, next) {
  knex('listings')
    .select('rating', 'listings.id', 'created_at', 'title', 'amount', 'cost_per_ounce', 'description', 'requested', 'portrait_link', 'city', 'verified')
    .join('ratings', 'reciever_id', 'listings.user_id')
    .join('users', 'users.id', 'listings.user_id')
    .then(function(listings) {
      knex('listings')
      .leftJoin('users', 'listings.user_id', 'users.id')
      .select('latitude', 'longitude', 'title', 'description')
      .then(function(listingMapMarkers){
        res.render('index', {
          title: 'Milk Exchange',
          listings: listings,
          user: req.user,
          listingMapMarkers: JSON.stringify(listingMapMarkers)
        });
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

  if (!req.body.Email2) {
    errorArray.push('Please enter a username');
  }
  if (!req.body.Password2) {
    errorArray.push('Please enter a password');
  }
  if (errorArray.length > 0) {
    res.render('signup', {
      errors: errorArray
    });
  } else {
    res.render('completeprofile', {
      user: req.body
    });
  }
});

function getCoords(address) {
  return new Promise(function(resolve, reject) {
    var string = '';
    string += 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDoQkO239JbGI_7BHz7IHA6d-_dLDRsL0c&';
    string += address;
    string += '&sensor=false';
    console.log(string);
    request(string, function(error, response, body) {
      if (error) {
        console.log("Error!  Request failed - " + error);
        reject("Error! Request failed - " + error);
      } else if (!error && response.statusCode === 200) {
        //console.log(body);
        location = JSON.parse(body);
        console.log(location.results[0].geometry.location);
        resolve(location.results[0].geometry.location);
      }
    });
  });
}

router.post('/signupSubmit2', function(req, res, next) {
  var location;
  var address = 'address=' + req.body.Address + ',' + req.body.Address_2 + req.body.City + ',' + req.body.State + req.body.Zip;
  getCoords(address).then(function(location) {
    console.log("LOCATIONS");
    console.log(location);
    knex('users').where({
      email: req.body.Email
    }).first().then(function(user) {
      if (!user) {
        var hash = bcrypt.hashSync(req.body.Password, 10);
        queries.createNewUser(
          req.body.First,
          req.body.Last,
          req.body.Email,
          hash,
          req.body.Phone,
          req.body.PortraitLink,
          req.body.Address,
          req.body.Address_2,
          req.body.City,
          req.body.State,
          req.body.Zip,
          location.lat,
          location.lng
        ).then(function(id) {
          res.clearCookie('userID');
          res.cookie('userID', id[0], { signed: true });
          res.redirect('/');
        });
      } else {
        res.redirect('/signup');
      }
    });
  });
});

router.get('/logout', function(req, res, next) {
  res.clearCookie('userID');
  res.redirect('/signup');
});

router.post('/login', function(req, res, next) {
  var errorArray = [];

  if (!req.body.email) {
    errorArray.push('Please enter a username');
  }
  if (!req.body.password) {
    errorArray.push('Please enter a password');
  }
  if (errorArray.length > 0) {
    res.render('signup', {
      loginErrors: errorArray
    });
  } else {
    knex('users').where({ email: req.body.email }).first().then(function(user) {
      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        res.clearCookie('userID');
        res.cookie('userID', user.id, { signed: true });
        res.redirect('/');
      } else {
        res.redirect('/signup');
      }
    });
  }
});

module.exports = router;
