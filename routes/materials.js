var express = require('express');
var router = express.Router();
var db = require('../models');

router.get('/textmaterial', function(req, res) {

    res.render('materials/textMaterials/textMaterial');
});


router.get('/textMaterial/:id', function(req, res) {
    db.TextMaterial.findAll({where:{id:req.params.id}, limit: 1 }).success(function(TextMat2) {
        console.log(TextMat2)
        res.render('materials/textMaterials/texMaterialEditor',{TextMat: TextMat2 }) ;
   })


});
router.post('/textMaterial/:id', function(req, res) {
    db.TextMaterial.find(req.params.id).success(function(TextMat2) {


        TextMat2.updateAttributes({
            Name:req.body.InputName,
            source:req.body.InputText,
            compiled:req.body.InputText,

        }).success(function() { res.redirect('/materials/textMaterial/'+req.params.id);});


    })


});


router.get('/materials_list', function(req, res) {
    db.TextMaterial.findAll().success(function(TextMat2) {
        console.log(TextMat2[0].Name)
        res.render('materials/textMaterials/textMaterialList',{TextMat: TextMat2 }) ;
    })


});
router.get('/textmaterial_create', function(req, res) {


    res.render('materials/textMaterials/textMaterialCreator');
});

router.post('/textmaterial_create', function(req, res) {
    console.log(req.body)
    db.TextMaterial.create({Name:req.body.InputName, source:req.body.InputText, compiled: req.body.InputText}).success(function(text) {
        // you can now access the newly created task via the variable task
        res.redirect('/materials/materials_list');
    })

});

module.exports = router;
