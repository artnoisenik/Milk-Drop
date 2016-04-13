var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session')
var bodyParser = require('body-parser');
var handlebars = require('handlebars');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
var routes = require('./routes/index');
var users = require('./routes/users');
var app = express();
var knex = require('./lib/knex');

require('dotenv').load();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SECRET));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('morgan')('combined'));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL + '/login/facebook/return'
  },
  function(accessToken, refreshToken, profile, cb) {
  //   knex('users')
  //   .where('facebook_id', profile.id)
  //   .then(function(user){
  //     res.clearCookie('userID');
  //     res.cookie('userID', user[0].id, {
  //     signed: true
  //   });
  // });
    return cb(null, profile);
  }));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

app.get('/login/facebook',
  passport.authenticate('facebook'));

app.get('/login/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/signup' }),
  function(req, res) {
    knex('users')
    .where('facebook_id', req.user.id)
    .then(function(user){
      res.clearCookie('userID');
      res.cookie('userID', user[0].id, {
      signed: true
    });
    res.redirect('/');
  });
});

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  });


app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
