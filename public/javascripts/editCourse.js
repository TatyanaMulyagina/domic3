clicks = 0;

$("document").ready(function(){

})// end document ready

function editCourse(element){
    courseId = window.location.href.split('/').filter(function(s){return (s.length > 0)}).reverse()[0]
    $.ajax({
        type:"post",
        url:"/courses/getDataForCourse",
        data: {
            courseId: courseId
        },
        success:function(result){
            json = eval(result);
            $("#contBody input[name='courseName']").val(json.course.name)
            $("#contBody input[name='beginAt']").val(json.course.beginAt)
            $("#contBody input[name='endAt']").val(json.course.endAt)
            console.log(json);
        },
        error:function(){},
        completed:function(){}
    });
};// end loadData


