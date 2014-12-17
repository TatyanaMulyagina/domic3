var express = require('express');
var router = express.Router();

router.get('/logout', function(req, res) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res) {
  var data = {message: req.flash('error')};
  res.render('auth/login', data);
});

module.exports = router;
