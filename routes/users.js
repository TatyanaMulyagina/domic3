var express = require('express');
var router = express.Router();

router.get('/create', function(req, res) {
  var data = {};
  res.render('users/create', data);
});

router.put('/create', function(req, res) {

});

module.exports = router;
