var express = require('express');
var router = express.Router();

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
});

router.get('/login', function(req, res) {
  var data = {message: req.flash('error')};
  res.render('auth/login', data);
});

module.exports = router;
