function remove_gr(idTestGroup){
    $.ajax({
        url:"/test/groups/"+ idTestGroup,
        method: 'get'
    }).done(function() {
        $('#select_delgroup').modal('hide')
        $('#groupsTable tr[groupid='+idTestGroup+']').remove();
        $(".modal-backdrop").remove();
        });
}

TestCreator = {

    ChoiceType:function(typequestion){
        console.log(typequestion)
        $("#setType").val(typequestion);
    },

    preEditStudy: function(idTestGroup) {
        $("#EditStudy form").attr("action", "/test/groups/" + idTestGroup +"/questions");
    },

     preEditStudy1: function(idTestGroup,idQuestion) {
         $("#EditStudy1 form").attr("action", "/test/groups/"+idTestGroup+"/questions/"+idQuestion+"/edit");


     }
/*
    delQuestions: function(groupID,questionID){
        $("#groupQuestions tr[testQuestionId='"+questionID+"']").detach();
        $.getJSON('/domic3/TestCreator_delQuestions.json', {groupID: groupID, testQuestionId: questionID}, function (data) {
        });
    }*/

};