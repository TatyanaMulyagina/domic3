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
  updateList();
};// end start

function openElementList(el){
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

function updateList(){
  $.ajax({
    type:"post",
    url:"/courses/getCourses",
    success:function(result){
      json = eval(result);
      if( json.length != 0){
        json.map(function(value,index){
          addUl('#content div',function(){
            $("#content ul:last").text( new Date( value[0].beginAt).getFullYear());
            jQuery.each(value,function(el,crs){
              addLi('#content div ul:last',function(){
                $("#content ul li:last").attr('id',crs.id);
                $("#content ul li:last a").attr('href','/');
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

/*
// формируем нужный вид даты yyyy-mm-dd
function formDate(date,func){
  newDate = new Date(date);
  y = newDate.getFullYear();
  m = newDate.getMonth();
  d = newDate.getDate();
  if(m < 8){
    res =  y +"-0"+ (m+1)  +"-"+ d;
  }
  else{
    res = y +"-"+ (m+1) +"-"+ d;
  }
  func(res);
}// end furmDate
*/

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