clicks = 0;

$("document").ready(function(){
    start();
})// end document ready

function start(){
    updateList();
};// end start

function openElementList(el){
    console.log("openElement");
    $.ajax({
        type:"post",
        url:"/courses/openMaterial",
        data:{
            curID:$(el).attr("id")
        },
        success:function(result){
            console.log("Result");
        }
    });
};// end openElementList

function updateList(){
    materialId = window.location.href.split('/').filter(function(s){return (s.length > 0)}).reverse()[0]
    previousPath = window.location.href + '/'
    console.log( materialId )
    console.log( previousPath )
    $.ajax({
        type:"post",
        url:"/courses/getMaterial",
        data:{
            materialId: materialId
        },
        success:function(result){
          json = eval(result);
          $('#content div').text(json.mainMat);
          addUl('#content div',function(){
            $("#content ul:last").text( 'Материалы' );
            jQuery.each(json.mat, function(el, mtrl){
              addLi('#content div ul:last', function(){
                //$("#content ul li:last").attr('id',mtrl.id);
                $("#content ul li:last a").attr('href', previousPath + mtrl.id);
                $("#content ul li:last a").text(mtrl.name);
              });
            })// end jQuery
          });
        },
        error:function(){},
        completed:function(){}
    });// end $.ajax
};// end updateList

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