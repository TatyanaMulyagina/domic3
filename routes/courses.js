var express = require('express');
var router = express.Router();

var db = require('../models');
//----------------------------- Function --------------------------
// формируем нужный вид даты yyyy-mm-dd
function formDate(date,func){
  newDate = new Date(date);
  y = newDate.getFullYear();
  m = newDate.getMonth();
  d = newDate.getDate();
  if(m < 8){
    res =  y +"-0"+ (m+1)
    if(d < 9){
      res += "-0"+d;
    }
    else{
      res += "-"+d;
    }
  }
  else{
    res = y +"-"+ (m+1);
    if(d < 9){
      res += "-0"+d;
    }
    else{
      res += "-"+d;
    }
  }
  func(res)
}// end formDate
//----------------------------- Courses ---------------------------

router.get("/",function(req,res){
  console.log('Here get /');
  curPath = req._parsedOriginalUrl.href;
  if(curPath.charAt(curPath.length-1) != '/'){
    curPath += '/';
  }
  console.log(curPath)
  db.Course.findAll({ order: [ ['beginAt','DESC'] ] }).success(function(courses){
    response = []
    year = 0
    courses.forEach( function(el) {
      if( year != el.beginAt.getFullYear() ) {
        year = el.beginAt.getFullYear()
        temp = [];
        temp.push( el )
        response.push( temp )
      }
      else {
        response[response.length-1].push(el)
      }
    })
    console.log(JSON.stringify(response));
    res.render('courses/courses',{data: response, curPath: curPath});
  });

});

router.get("/something",function(req,res){
  console.log('Here get something');
  res.render('courses/popupWindow');
});

router.get("/create",function(req,res){
  console.log('Here get /courses/createCourse');
  res.render('courses/createCourse');
});

router.get("/:courseId/edit",function(req,res){
  console.log("Here get editCourse !!!!!!!!!!!!!!");
  console.log(req.params.courseId)

  db.Course.find(req.params.courseId).success(function(course){
   console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFF"+JSON.stringify(course));
   formDate(course.beginAt,function(result){
     beginAt = result;
     formDate(course.endAt,function(result){
       endAt = result;
       res.render( "courses/editCourse",{data:course, endAt: endAt, beginAt: beginAt} )
     })
   })
  })
})// end get /editCourse

//----------------------------- Courses(javascript) ---------------------------

router.post("/:courseId/edit",function(req,res){
  console.log("Here post /:courseId/edit")
  db.Course.find(req.params.courseId).success(function(course){
    console.log("good " + JSON.stringify(course))
    course.updateAttributes({
      name:req.body.name,
      beginAt: new Date(req.body.beginAt),
      endAt:new Date(req.body.endAt)
    }).success(function(){
      res.redirect("/courses/");
    })
  })// find
})// post /:courseId/edit
/*
router.post("/getCourses",function(req,res){
  console.log("Here post /getCourses");
  db.Course.findAll({ order: [ ['beginAt','DESC'] ] }).success(function(courses){
    response = []
    courses.forEach( function(el) {
      if( response[el.beginAt.getFullYear()] == null ) {
        temp = [];
        temp.push( el )
        response.push( temp )
      }
      else {
        response[el.beginAt.getFullYear()].push(el)
      }
    })
    console.log(JSON.stringify(response));
    res.send(response);
  });
});// end getCourses
*/
router.post("/openCourse",function(req,res){
    console.log("Here post /courses/openCourse");
    db.Course.find({id:req.body.curID}).success(function(course){
        console.log("take course");
        console.log(JSON.stringify(course));
        res.render("courses/materials");
        res.send({});
    });
}); // end openCourses

router.post("/getDataForCourse",function(req,res){
    console.log("Here post /getDataForCourse");
    db.Course.find(req.body.courseId).success(function(course){
        console.log("Find done");
        console.log(JSON.stringify(course));
        res.send({course: course});
    });
});// end getCourses

router.post("/add",function(req,res){
  console.log("Here post add course");
  db.Course.create({
    name: req.body.name,
    beginAt: new Date(req.body.beginAt),
    endAt: new Date(req.body.endAt)
  }).success( function(course){
    console.log( "you have a new course!  "+JSON.stringify( course ) )
    res.redirect("/courses");
  })
}); // end add course

router.post("/:courseId/remove",function(req,res){
  console.log("Here post /courses/removeCourse")
  console.log(req.params.courseId)
  db.Course.find(req.params.courseId).success(function(course){
    course.destroy({}).success(function(){
      console.log("Remove course success");
      res.redirect("/courses")
    })
  })// find
});// end removeCourse

//----------------------------- Materials ---------------------------

router.get(/^\/([0-9]+\/*)+$/, function(req,res){
    console.log("Here get in somewhere");
    curPath = req._parsedOriginalUrl.href;
    if(curPath.charAt(curPath.length-1) != '/'){
      curPath += '/';
    }
    parentName = "Папаня"
    parentDescription = "Это тестовое описание курса или материала. Здесь может быть ваша реклама!!!!!"
    db.Material.findAll({}).success(function(mats){
      console.log("mats"+JSON.stringify(mats));
      res.render("courses/materials", {mats:mats, curPath:curPath, parentName:parentName, parentDescription:parentDescription});
    })
});// in material

//----------------------------- Materials(javascript) ---------------------------

router.post("/getMaterial",function(req,res){
    console.log("Here post getMaterial in somewhere");
    db.Material.find(req.body.materialId).success(function(material){
        console.log("Find done " + req.body.materialId);
        console.log(JSON.stringify(material));
        material.getOtherMaterial().success(function(materials){
          res.send({mat:materials,mainMat:material.name });
        });
    });
});// end getMaterial

router.post("/openMaterial",function(req,res){
    console.log("Here post openMaterial in somewhere");
    db.Material.find(req.body.curID).success(function(material){
        console.log("take material");
        console.log(JSON.stringify(material));
        res.render("courses/materials");
        res.send({});
    });
}); // end openMaterial

module.exports = router;
