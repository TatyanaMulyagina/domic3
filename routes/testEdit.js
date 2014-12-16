var express = require('express');
var router = express.Router();
var db = require('../models');

router.post('/testedit/addgroup', function (req, res) {
    //console.log(req.body.inputname)
    db.TestGroup.create({name: req.body.inputname}).success(function(testgroup){
        res.redirect('/test/:idTest/edit/testedit');
    });
})

//router.param('idTest', /^[0-9]+$/);
//router.param('idGroup', /^\d+$/);
///test/:idTest/:idGroup/edit/
//req.params.idTest
//req.params.idGroup

router.get('/testedit', function (req, res) {
    db.TestGroup.findAll().success(function(groups) {
        res.render('users/test',{groups: groups})
    });
})


router.get('/testedit/del/:id', function (req, res) {
    db.TestGroup.find(req.params.id).success(function(group) {
        group.destroy({}).success(function() {
            res.send("OK");
        })
    })

})

router.get('/testedit/:idGroup/questions', function (req, res) {
        res.render('users/list_Questions')
})


router.post('/testedit/addgroup/:idGroup', function (req, res) {
    db.TestQuestion.create(
        {
          text: req.body.inputtext,
          type: req.body.AnswerType
        }).success(function(items) {
        db.TestGroup.find(req.params.idGroup).success(function(group) {
            group.addTestQuestion(items).success(function(question) {
                if (req.body.AnswerType == "One") {
                    db.TestAnswerChoice.bulkCreate([
                        req.body.inputTestAnswerOneChoice.map(function(el,i) {
                            return {
                                answer: el,
                                correct: i == req.body.inputTestAnswerOneChoiceCorrect
                            }
                        })]).success(function (answers) {

                            db.TestAnswerChoice.findAll({}).success(function(obj){
                                obj.forEach(function(el){
                                    console.log("!!!!!!!!!!!!44444444 "+JSON.stringify(obj))
                                    el.setQuestions([question]).success(function (qw) {
                                    });
                                })
                                console.log("!!!!!!!!!!!!!!!! "+JSON.stringify(obj))
                            })
                            res.redirect('/test/:idTest/edit/testedit');
                        }
                    )
                }
            })
        })
        })
})




module.exports = router;

/*if (req.body.AnswerType == "One") {
 db.TestAnswerChoice.create(
 req.body.inputTestAnswerOneChoice.map(function(el,i) { return {
 answer: el,
 correct: i == req.body.inputTestAnswerOneChoiceCorrect
 }})).success(function (answers) {
 // console.log("answrs " + JSON.stringify(answers));
 //console.log("question " + JSON.stringify(questions));
 //console.error(questions);
 answers.forEach(function(el){el.setQuestion(questions[0], function (q) {
 });
 })
 res.redirect('/test/:idTest/edit/testedit');
 }
 );
 }*/