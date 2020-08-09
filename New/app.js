$(document).ready(function(){
    var row = 0; 
    var col = 0;
    //decimal html codes for black pieces 
    var kingBlack = "&#9818;";
    var queenBlack = "&#9819;";
    var bishopBlack = "&#9821;";
    var knightBlack = "&#9822;";
    var rookBlack = "&#9820;";
    var pawnBlack = "&#9823;";

    //decimal html codes for white pieces
    var kingWhite = "&#9812;";
    var queenWhite = "&#9813;";
    var bishopWhite = "&#9815;";
    var knightWhite = "&#9816;";
    var rookWhite = "&#9814;";
    var pawnWhite = "&#9817;";

    //Starting position for the chess pieces
    var blackStart = [
        [rookBlack,knightBlack,bishopBlack,queenBlack,kingBlack,bishopBlack,knightBlack,rookBlack],
        [pawnBlack,pawnBlack,pawnBlack,pawnBlack,pawnBlack,pawnBlack,pawnBlack,pawnBlack]
    ];
    
    var whiteStart = [
        [pawnWhite,pawnWhite,pawnWhite,pawnWhite,pawnWhite,pawnWhite,pawnWhite,pawnWhite],
        [rookWhite,knightWhite,bishopWhite,queenWhite,kingWhite,bishopWhite,knightWhite,rookWhite]
    ];
    
    //for each grid item in the grid container
    var items = document.getElementsByClassName("grid-container").children;
    alert(items);
    /*
    $(".grid-container").each(
       function(){
            $(this).css("color", "red");
       } 
    );  
    $(".grid-item-dark").html(rookBlack);
    $(".grid-item-light").html('&#9812;');
    */
});

