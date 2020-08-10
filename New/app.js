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

    //resopnd to user clicks
    var firstClick = true;
    var piece = "";
    var oldLoc;
    //if the user clicked on a dark square
    $(".grid-item-dark").click(function(){
        //if this is the first click
        if(firstClick){
            //if this square is valid
            if($(this).text() !== ""){
                firstClick = false;
                piece = $(this).text();
                oldLoc = $(this);
                //change the border width of selected square
                $(this).css("border-width", "5");
            }
        //if this is their second click
        }else{
            //if the new square is valid
            if($(this).text() === ""){
                $(this).html(piece);
                oldLoc.html("");
                firstClick = true;
                //change border width of old square
                oldLoc.css("border-width", "0");
                oldLoc = $(this);
            //if the new square is not valid
            }else{
                oldLoc.css("border-width", "0");
                firstClick = true;
            }
        }
    }); 

    //if the user clicked on a light square
    $(".grid-item-light").click(function(){
        //if this is the first click
        if(firstClick){
            //if this square is valid
            if($(this).text() !== ""){
                firstClick = false;
                piece = $(this).text();
                oldLoc = $(this);
                //change the border width of selected square
                $(this).css("border-width", "5");
            }
        //if this is their second click
        }else{
            //if the new square is valid
            if($(this).text() === ""){
                $(this).html(piece);
                oldLoc.html("");
                firstClick = true;
                //change border width of old square
                oldLoc.css("border-width", "0");
                oldLoc = $(this);
            //if the new square is not valid
            }else{
                oldLoc.css("border-width", "0");
                firstClick = true;
            }
        }
    }); 
});

