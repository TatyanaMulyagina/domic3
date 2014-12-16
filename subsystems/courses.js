/**
 * Created by student on 30.09.2014.
 */
var coursesRoutes = require('../routes/courses')
    , db = require('../models');

module.exports.name = 'courses';
module.exports.require = ['users'];
module.exports.init = function(app, modules, events) {
    // dev configuration
    if (app.get('env') === 'development') {
        db.Course.destroy({}, {truncate: true}).success(function(err) {
            db.Course.create({
                name: "Test course 1",
                beginAt: new Date('01 May 2011'),
                endAt: new Date('01 May 2012')
            });
            db.Course.create({
              name: "Test course 1.5",
              beginAt: new Date('05 May 2011'),
              endAt: new Date('01 May 2012')
            });
            db.Course.create({
                name: "Test course 2",
                beginAt: new Date('01 May 2012'),
                endAt: new Date('01 May 2013')
            }).success( function(course){
                db.Material.create({
                  name: "Test material 1 in 2",
                  description: "description zorg",
                  type: "folder"
                }).success( function(material){
                  console.log("hi"+JSON.stringify(material))

                  course.setMaterial([material]).success(function(){
                    console.log("WHAT?")
                  })

                  db.Material.create({
                    name: "Test material 1 in 1 in 2",
                    description: "description narf",
                    type: "folder"
                  }).success(function(mat){
                    console.log("again HI"+JSON.stringify(mat));
                    material.setOtherMaterial([mat]);
                  })
                })// end success material


            });

    })
  }// end if
    app.use('/courses', coursesRoutes);
};