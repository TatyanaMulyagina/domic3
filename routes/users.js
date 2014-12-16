var express = require('express');
var router = express.Router();
var db = require('../models');
router.get('/create', function(req, res) {
  var data = {};
  res.render('users/create', data);
});
router.get('/', function(req, res) {
  db.User.findAll().success(function(data2) {
    res.render('users/list',{Data: data2}) ;
  })


});

router.post('/create', function(req, res) {
  db.User.create({Name:req.body.InputName, lastname:req.body.InputLastName, middlename: req.body.InputMiddleName,email:req.body.InputEmail,password:req.body.InputPassword}).success(function(text) {
    // you can now access the newly created task via the variable task
    res.redirect('/users/');
  })
});

router.get('/del/:id', function(req, res) {
  db.User.find(req.params.id).success(function(user) {



   user.destroy().success(function() {
      // now i'm gone :)
      res.redirect('/users/');
    })

  })
});
router.get('/user/:id', function(req, res) {
    db.User.findAll({where:{id:req.params.id}, limit: 1 }).success(function(user1) {
        console.log(user1)
        res.render('users/edit',{User: user1}) ;
    })
});
router.post('/user/:id', function(req, res) {
    db.User.find(req.params.id).success(function(user) {


        user.updateAttributes({
            Name:req.body.InputName,
            lastname:req.body.InputLastName,
            middlename: req.body.InputMiddleName,
            email:req.body.InputEmail,
            password:req.body.InputPassword

        }).success(function() { res.redirect('/users/user'+req.params.id);});


    })
});
module.exports = router;
