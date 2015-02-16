$(function() {
    $( ".connectedSortable" ).sortable({
        connectWith: ".connectedSortable"
    }).disableSelection();


    //disableSelection()
    // Данная конструкция делает текстовые элементы недоступными для select'а,
    // т.е. при выделении курсором текст не будет выделяться.


});
