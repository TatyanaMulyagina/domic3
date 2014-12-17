var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;

var db = require('../models')
var authRoutes = require('../routes/auth')

module.exports.init = function(app, modules, events) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    db.User.find(Number(id), function(err, user) {
      done(err, user);
    });
  });

  passport.use(new LocalStrategy(
    function(email, password, done) {
      db.User.find({ email: email }).success(function(user) {
        if (!user) {
          done(null, false, { message: 'incorrect email' });
        }
        user.validPassword(password, function(err, valid) {
          if (err) {done(null, false, err);}
          if (valid) {
            done(null, user);
          } else {
            done(null, false, { message: 'incorrect password' });
          }
        });
      });
    }
  ));

  app.post('/login',
    passport.authenticate('local',
      { successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
      }
    )
  );

  app.use('/', authRoutes);
};