var express = require('express');
var router = express.Router();
var db = require('../models');

//router.param('idTest', /^[0-9]+$/);
//router.param('idGroup', /^\d+$/);
///test/:idTest/:idGroup/edit/
//req.params.idTest
//req.params.idGroup

//список групп
router.get('/groups', function (req, res) {
    db.TestGroup.findAll().success(function (groups) {
        res.render('testEdit/test', {groups: groups})
    });
})

//добавить группу
router.post('/groups/add', function (req, res) {
    //console.log(req.body.inputname)
    db.TestGroup.create({name: req.body.inputname}).success(function (testgroup) {
        res.redirect('/test/groups');
    });
})

//удаление группы
router.get('/groups/:idTestGroup', function (req, res) {
    db.TestGroup.find(req.params.idTestGroup).success(function (group) {
        group.destroy({}).success(function () {
            res.send("OK");
        })
    })
})

//изменение названия группы
router.post('/groups/:idTestGroup/questions/editGroupQues', function (req, res) {
    db.TestGroup.find(req.params.idTestGroup).success(function (group) {
        group.updateAttributes({
            name: req.body.inputname
        }).success(function () {
            res.redirect('/test/groups/' + req.params.idTestGroup + '/questions')
        })
    })
})
//изменение формулировки вопроса(пока так)
//не реализовано
router.post('/groups/:idTestGroup/questions/:idQuestion/edit', function (req, res) {
    db.TestQuestion.find(req.params.idQuestion).success(function (question) {
        question.updateAttributes({
            text:req.body.inputname
        }).success(function () {
            res.redirect('/test/groups/' + req.params.idTestGroup + '/questions/'+req.params.idQuestion+'/edit')
        })
    })

})

//редактирование вопроса(не реализовано)
router.get('/groups/:idTestGroup/questions/:idQuestion/edit', function (req, res) {
    db.TestGroup.find(req.params.idTestGroup).success(function (group) {
        db.TestQuestion.find(req.params.idQuestion).success(function (question) {
            console.log("GHBFDBJHJ" + JSON.stringify(question))
            res.render('testEdit/modal_changeQuestion', {group:group,question: question})
        })
     })
})

//Отображение вопросов группы
router.get('/groups/:idTestGroup/questions', function (req, res) {
    db.TestGroup.find(req.params.idTestGroup).success(function (group) {
        group.getTestQuestions().success(function (question) {
            res.render('testEdit/list_Questions', {group: group, question: question})
        })
    })
})

//не реализовано удаление вопросов(checkbox)
router.get('/testedit/:idTestGroup/questions/del/:idQuestion', function (req, res) {
    db.TestQuestion.find(req.params.idTestGroup).success(function (question) {
        question.destroy({}).success(function () {
            res.send("OK");
        })
    })

})

//создание вопросов(одновыборный, многовыборный)
//не реализован открытый
router.post('/groups/:idTestGroup/questions', function (req, res) {
    db.TestQuestion.create(
        {
            text: req.body.inputtext,
            type: req.body.AnswerType
        }).success(function (items) {
            db.TestGroup.find(req.params.idTestGroup).success(function (group) {
                group.addTestQuestion(items).success(function (question) {
                    if (req.body.AnswerType == "OneChoice") {
                        var answers = req.body.inputTestAnswerOneChoice.map(function (el, i) {
                            return {
                                answer: el,
                                isCorrect: i == req.body.inputTestAnswerOneChoiceCorrect,
                                TestQuestionId: question.id
                            }
                        });
                        db.TestAnswerChoice.bulkCreate(answers).success(function (answers) {
                                res.redirect('/test/groups');
                            }
                        )
                    }

                    if (req.body.AnswerType == "ManyChoice") {
                        var answers = req.body.inputTestAnswerManyChoice.map(function (el, ind) {
                            return {
                                answer: el,
                                isCorrect: ind == req.body.inputTestAnswerManyChoiceCorrect.indexOf(ind.toString()) >= 0,
                                TestQuestionId: question.id
                            }
                        });
                        db.TestAnswerChoice.bulkCreate(answers).success(function (answers) {
                                res.redirect('/test/groups');
                            }
                        )
                    }
                })
            })
        })
})

module.exports = router;