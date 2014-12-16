clicks = 0;

$("document").ready(function(){
  start();
  /*$("#content ul").on("click","li", function(){
   console.log("li hi" + this);
   li = this;
   clicks++;
   if(clicks == 1){
   setTimeout(function(){
   if(clicks != 1) {
   openElementList(li)
   }
   clicks = 0;
   }, 200);
   }
   })//end $ click*/
})// end document ready

function start(){
  //updateList();
};// end start

/*function openElementList(el){
  console.log("openElement");

  $.ajax({
    type:"post",
    url:"/courses/openCourses",
    data:{
      curID:$(el).attr("id")
    },
    success:function(result){
      console.log("Result");
    }
  });
};// end openElementList
*/
function clickOnRemoveCourse(el){
  console.log("Here click on remove")
  $.ajax({
    type:"post",
    url:"/courses/removeCourse",
    data:{
      courseId : $(el).parent().attr("id")
    },
    success:function(){
      console.log( "success" )
      updateList()
    }
  })
}// clickOnRemoveCourse

function clickOnEditCourse(el){
  console.log("Here click on edit")
  console.log(  )
  $.ajax({
    type:"get",
    url:"/courses/editCourse",
    data:{
      courseId : $(el).parent().attr("id")
    },
    success:function(){
      console.log( "success" )
    }
  })
}// clickOnEditCourse
/*
function updateList(){
  previousPath = window.location.href + '/'
  $.ajax({
    type:"post",
    url:"/courses/getCourses",
    success:function(result){
      json = eval(result);
      $("#content div").empty()// очищение
      $("#content div").text('Курсы')
      if( json.length != 0){
        json.map(function(value,index){
          addUl('#content div',function(){
            $("#content ul:last").text( new Date( value[0].beginAt).getFullYear());
            jQuery.each(value,function(el,crs){
              addLi('#content div ul:last',function(){
                //$("#content ul li:last").attr('id',crs.id);
                //$("#content ul li:last a").attr('href','/courses/' + crs.materialId);
                $("#content ul li:last a").attr('href',previousPath + '1');
                $("#content ul li:last a").text(crs.name);
              });
            })// end jQuery
          });
        });// end map
      }
    },
    error:function(){},
    completed:function(){}
  });// end $.ajax
};// end updateList
*/
/*
function addUl(data,func){
  newul = jades['courses/coursePeriod']();

  if( $(data + ' ul:last').length){
    $(data + ' ul:last').after(newul);
  }
  else{
    $(data).append(newul);
  }
  func();

}// end addUl
*/
/*
function addLi(data,func){
  newli = jades['courses/courseElem']();

  if( $(data + ' li:last').length){
    $(data + ' li:last').after(newli);
  }
  else{
    $(data).append(newli);
  }

  func();
}// end addLi
  */