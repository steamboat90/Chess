$(document).ready(function(){
    var row = 0; 
    var col = 0;
    //decimal html codes for black pieces 
    var kingBlackDeci = "&#9818;";
    var queenBlackDeci = "&#9819;";
    var bishopBlackDeci = "&#9821;";
    var knightBlackDeci = "&#9822;";
    var rookBlackDeci = "&#9820;";
    var pawnBlackDeci = "&#9823;";

    //decimal html codes for white pieces
    var kingWhiteDeci = "&#9812;";
    var queenWhiteDeci = "&#9813;";
    var bishopWhiteDeci = "&#9815;";
    var knightWhiteDeci = "&#9816;";
    var rookWhiteDeci = "&#9814;";
    var pawnWhiteDeci = "&#9817;";

    //Symbols for black pieces 
    var kingBlack = "♚";
    var queenBlack = "♛";
    var bishopBlack = "♝";
    var knightBlack = "♞";
    var rookBlack = "♜";
    var pawnBlack = "♟︎";

    //Symbols for white pieces
    var kingWhite = "♔";
    var queenWhite = "♕";
    var bishopWhite = "♗";
    var knightWhite = "♘";
    var rookWhite = "♖";
    var pawnWhite = "♙";

    //Array of black and white pieces
    var blackPieces = [kingBlack, queenBlack, bishopBlack, knightBlack, rookBlack,
                    pawnBlack];
    var whitePieces = [kingWhite, queenWhite, bishopWhite, knightWhite, rookWhite,
                    pawnWhite];

    //resopnd to user clicks
    var firstClick = true;
    var piece = "";
    var oldLoc;
    //if the user clicked on a dark square
    $(".grid-item-dark").click(function(){
        //if this is the first click
        if(firstClick){
            //if this square is valid
            if(isValid($(this))){
                firstClick = false;
                piece = $(this).text();
                oldLoc = $(this);
                //change the border width of selected square
                $(this).css("border-width", "5");
            }
        //if this is their second click
        }else{
            //if the new square is valid
            if(isValid($(this))){
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
            if(isValid($(this))){
                firstClick = false;
                piece = $(this).text();
                oldLoc = $(this);
                //change the border width of selected square
                $(this).css("border-width", "5");
            }
        //if this is their second click
        }else{
            //if the new square is valid
            if(isValid($(this))){
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
    function isValid(p) {
        //if this is the first click and the piece isn't empty
        if(p.text() !== "" && firstClick){
            return true;
        }
        //if this is the second click and you haven't clicked on
        //  the same piece twice
        else if(p.attr("id") !== oldLoc.attr("id") && !firstClick){
            var oldIndex = [parseInt(oldLoc.attr("id").substring(0,1)),
                            parseInt(oldLoc.attr("id").substring(1))];
            var newIndex = [parseInt(p.attr("id").substring(0,1)), 
                            parseInt(p.attr("id").substring(1))];
            //If the piece is white
            if(whitePieces.includes(oldLoc.text())){
                //if you're not clicking on a piece of the same color
                if(!whitePieces.includes(p.text())){


                    //PIECES
                    //|---------------------PAWN--------------------|
                    //if the piece is a pawn
                    if(oldLoc.text() === pawnWhite){
                        //if it is the pawn's first move and
                        //  they try moving up by either 1 or
                        //  2 spots
                        if(oldIndex[0]==6 && (newIndex[0]==5 || newIndex[0]==4)&&
                            newIndex[1] == oldIndex[1]){
                            return true;
                        }
                        //if the pawn is moving up 1 square
                        // and the square is not occupied
                        else if(newIndex[0] == oldIndex[0] - 1 &&
                                newIndex[1] == oldIndex[1] &&
                                p.text() === ""){ 
                            return true;
                        }
                        //if the pawn is capturing
                        else if(newIndex[0] == oldIndex[0] - 1 &&
                                (newIndex[1] == oldIndex[1] - 1 ||
                                newIndex[1] == oldIndex[1] + 1) &&
                                p.text() !== ""){
                            return true;
                        }
                    }
                    //|---------------------END---------------------|

                    //|-------------------KNIGHT--------------------|
                    //If the piece is a knight
                    if(oldLoc.text() === knightWhite){
                        //If the location is valid
                        //Locations to the North of the knight
                        if(newIndex[0] == oldIndex[0] - 2){
                            if(newIndex[1] == oldIndex[1] + 1 ||
                               newIndex[1] == oldIndex[1] - 1){
                                   return true;
                            }
                        }
                        //Locations to the South of the knight
                        if(newIndex[0] == oldIndex[0] + 2){
                            if(newIndex[1] == oldIndex[1] + 1 ||
                               newIndex[1] == oldIndex[1] - 1){
                                   return true;
                            }
                        }
                        //Locations to the East of the knight
                        if(newIndex[1] == oldIndex[1] + 2){
                            if(newIndex[0] == oldIndex[0] + 1 ||
                               newIndex[0] == oldIndex[0] - 1){
                                   return true;
                            }
                        }
                        //Locations to the West of the knight
                        if(newIndex[1] == oldIndex[1] - 2){
                            if(newIndex[0] == oldIndex[0] + 1 ||
                               newIndex[0] == oldIndex[0] - 1){
                                   return true;
                            }
                        }
                    }
                    //|---------------------END---------------------|

                    //|---------------------ROOK--------------------|
                    //If the piece is a rook
                    if(oldLoc.text() == rookWhite){
                        //if the new position is in a straight line
                        if(newIndex[0] == oldIndex[0]){
                            return true;
                        }else if(newIndex[1] == oldIndex[1]){
                            return true;
                        }
                    }
                    //|---------------------END---------------------|
                }
            }
            
            //if the piece is black
            else{
                //if you're not clicking on a piece of the same color
                if(!blackPieces.includes(p.text())){

                    //PIECES
                    //|---------------------PAWN--------------------|
                    //if the piece is a pawn
                    if(oldLoc.text() === pawnBlack){
                        //if it is the pawn's first move and
                        //  they try moving up by either 1 or
                        //  2 spots
                        if(oldIndex[0]==1 && (newIndex[0]==2 || newIndex[0]==3) &&
                            newIndex[1] == oldIndex[1]){
                            return true;
                        }
                        //if the pawn is moving up 1 square
                        // and the square is not occupied
                        else if(newIndex[0] == oldIndex[0] + 1 &&
                                newIndex[1] == oldIndex[1] &&
                                p.text() === ""){ 
                            return true;
                        }
                        //if the pawn is capturing
                        else if(newIndex[0] == oldIndex[0] + 1 &&
                                (newIndex[1] == oldIndex[1] - 1 ||
                                newIndex[1] == oldIndex[1] + 1) &&
                                p.text() !== ""){
                            return true;
                        }
                    }
                }
                    //|---------------------END---------------------|

                    //|-------------------KNIGHT--------------------|
                    //If the piece is a knight
                    if(oldLoc.text() === knightBlack){
                        //If the location is valid
                        //Locations to the North of the knight
                        if(newIndex[0] == oldIndex[0] - 2){
                            if(newIndex[1] == oldIndex[1] + 1 ||
                               newIndex[1] == oldIndex[1] - 1){
                                   return true;
                            }
                        }
                        //Locations to the South of the knight
                        if(newIndex[0] == oldIndex[0] + 2){
                            if(newIndex[1] == oldIndex[1] + 1 ||
                               newIndex[1] == oldIndex[1] - 1){
                                   return true;
                            }
                        }
                        //Locations to the East of the knight
                        if(newIndex[1] == oldIndex[1] + 2){
                            if(newIndex[0] == oldIndex[0] + 1 ||
                               newIndex[0] == oldIndex[0] - 1){
                                   return true;
                            }
                        }
                        //Locations to the West of the knight
                        if(newIndex[1] == oldIndex[1] - 2){
                            if(newIndex[0] == oldIndex[0] + 1 ||
                               newIndex[0] == oldIndex[0] - 1){
                                   return true;
                            }
                        }
                    }
                    //|---------------------END---------------------|
            }
        }
        
        return false;
    }
});

