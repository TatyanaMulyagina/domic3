function remove_gr(groupId){
    $.ajax({
        url:"/test/:idTest/edit/testedit/del/"+ groupId,
        method: 'get'
    }).done(function() {
        $('#select_delgroup').modal('hide')
        $('#groupsTable tr[groupid='+groupId+']').remove();
        $(".modal-backdrop").remove();
        });
}

TestCreator = {

    ChoiceType:function(typequestion){
        console.log(typequestion)
        $("#setType").val(typequestion);
    },

    preEditStudy: function(groupID) {
        $("#EditStudy form").attr("action", "/test/:idTest/edit/testedit/addgroup/" + groupID);
    }/*,

    delQuestions: function(groupID,questionID){
        $("#groupQuestions tr[testQuestionId='"+questionID+"']").detach();
        $.getJSON('/domic3/TestCreator_delQuestions.json', {groupID: groupID, testQuestionId: questionID}, function (data) {
        });
    }*/

};