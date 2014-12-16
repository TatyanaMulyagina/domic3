var express = require('express');
var router = express.Router();
var jade = require('jade');
var fs = require('fs');
var path = require('path');

var db = require('../models');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get(/\/_views\/([^.]+)\.jade/, function(req,res) {
  var filename = path.join(__dirname, '../views', req.params[0] + '.jade');

  fs.readFile(filename, function(err, data) {
    var options = {filename: filename};
    if (err) throw err;

    res.set('Content-Type', 'text/javascript');
    res.send("(function() {" + jade.compileClient(data, options) +
      "if (!window.jades) window.jades = {};" +
      "window.jades['"+req.params[0]+"'] = template;" +
      "})();");
  });
});

module.exports = router;
