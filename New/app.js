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
    
    //Variables to determine castling
    var kingWhiteMoved = false;
    var kingBlackMoved = false;
    var rookA1Moved = false;
    var rookA8Moved = false;
    var rookH1Moved = false;
    var rookH8Moved = false;

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
    //The parameter "p" represents the piece that is sent to the function
    // which is the new location
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
            var color;

            

            //If the piece is white
            if(whitePieces.includes(oldLoc.text())){
                //if you're not clicking on a piece of the same color
                if(!whitePieces.includes(p.text())){
                    //PIECES
                    //|---------------------KING--------------------|
                    //if the piece is a king
                    if(oldLoc.text() === kingWhite){
                        if(Math.abs(oldIndex[0] - newIndex[0]) <= 1 &&
                            Math.abs(oldIndex[1] - newIndex[1]) <= 1){
                                kingWhiteMoved = true;
                                return true;
                        }
                        //if they try to castle kingside
                        if(oldLoc.attr("id") === "74" &&
                            p.attr("id") === "76" &&
                            !kingWhiteMoved && !rookA8Moved){
                            $("#77").html("");
                            $("#75").html("♖");
                            kingWhiteMoved = true;
                            rookA8Moved = true;
                            return true;
                        }
                        //if they try to castle queenside
                        if(oldLoc.attr("id") === "74" &&
                            p.attr("id") === "72" &&
                            !kingWhiteMoved && !rookA1Moved){
                            $("#70").html("");
                            $("#73").html("♖");
                            kingWhiteMoved = true;
                            rookA1Moved = true;
                            return true;
                        }
                    }
                    //|---------------------END---------------------|

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
                    if(oldLoc.text() === rookWhite){
                        //if the new position is in a straight line
                        var positionsVert = [];
                        var positionsHori = [];
                        if(newIndex[0] == oldIndex[0]){
                            //loop through each grid item
                            $(".grid-container").children().each(function(){
                                var id = $(this).attr("id");
                                //if the id is in the same lane and the 
                                //  new position is horizontal of the rook's 
                                //  original position
                                if(id.substring(0,1) === (oldIndex[0] + "")){
                                    positionsHori.push($(this).text());
                                }
                            });
                            //loop through positionsVert in the WEST direction
                            //  to see if the new index is not a valid position 
                            for(var i = oldIndex[1]-1; i >= 0; i--){
                                if(positionsHori[i] !== "" && newIndex[1] < i){
                                    return false;
                                }
                            }
                            //loop through positionsVert in the East direction
                            //  to see if the new index is not a valid position 
                            for(var i = oldIndex[1]+1; i < 8; i++){
                                if(positionsHori[i] !== "" && newIndex[1] > i){
                                    return false;
                                }
                            }
                            if(oldLoc.attr("id") === "70"){
                                rookA1Moved = true;
                            }else{
                                rookA8Moved = true;
                            }
                            return true;
                        }else if(newIndex[1] == oldIndex[1]){
                            //loop through each grid item
                            $(".grid-container").children().each(function(){
                                var id = $(this).attr("id");
                                //if the id is in the same lane and the 
                                //  new position is vertical of the rook's 
                                //  original position
                                if(id.substring(1) === (oldIndex[1] + "")){
                                    positionsVert.push($(this).text());
                                }
                            });
                            //loop through positionsVert in the NORTH direction
                            //  to see if the new index is not a valid position 
                            for(var i = oldIndex[0]-1; i >= 0; i--){
                                if(positionsVert[i] !== "" && newIndex[0] < i){
                                    return false;
                                }
                            }
                            //loop through positionsVert in the SOUTH direction
                            //  to see if the new index is not a valid position 
                            for(var i = oldIndex[0]+1; i < 8; i++){
                                if(positionsVert[i] !== "" && newIndex[0] > i){
                                    return false;
                                }
                            }
                            if(oldLoc.attr("id") === "70"){
                                rookA1Moved = true;
                            }else{
                                rookA8Moved = true;
                            }
                            return true;
                        }
                    }
                    //|---------------------END---------------------|

                    //|--------------------BISHOP-------------------|
                    //if the piece is a bishop
                    if(oldLoc.text() === bishopWhite){
                        var positionsNW = [];
                        var positionsNE = [];
                        var positionsSW = [];
                        var positionsSE = [];
                        //if the new position is not diagonal of the original
                        //  position, return false
                        if(!(oldIndex[0] - newIndex[0] == oldIndex[1] - newIndex[1]
                            && oldIndex[0] - newIndex[0] > 0) &&
                           !(oldIndex[0] - newIndex[0] == oldIndex[1] - newIndex[1]
                            && oldIndex[0] - newIndex[0] < 0) &&
                           !(oldIndex[0] - newIndex[0] == -1 * (oldIndex[1] - newIndex[1])
                           && oldIndex[0] - newIndex[0] > 0) &&
                           !(oldIndex[0] - newIndex[0] == -1 * (oldIndex[1] - newIndex[1])
                           && oldIndex[0] - newIndex[0] < 0)){
                               return false;
                           }
                        //loop through each grid item and add them to their
                        //  respective arrays depending on their location 
                        //  relative to the original position
                        $(".grid-container").children().each(function(){
                            var id = $(this).attr("id");
                            var x = parseInt(id.substring(0,1));
                            var y = parseInt(id.substring(1));
                            //if the id is to the NW of the original position
                            if(oldIndex[0] - x == oldIndex[1] - y && oldIndex[0] - x > 0){
                                positionsNW.push($(this).text());
                            }
                            //if the id is to the SE of the original position
                            if(oldIndex[0] - x == oldIndex[1] - y && oldIndex[0] - x < 0){
                                positionsSE.push($(this).text());
                            }
                            //if the id is to the NE of the original position
                            if(oldIndex[0] - x == -1 * (oldIndex[1] - y)
                            && oldIndex[0] - x > 0){
                                positionsNE.push($(this).text());
                            }
                            //if the id is to the SW of the original position
                            if(oldIndex[0] - x == -1 * (oldIndex[1] - y)
                            && oldIndex[0] - x < 0){
                                positionsSW.push($(this).text());
                            }
                        });

                        //if the new position is to the NORTHWEST
                        //  of the original position
                        if(oldIndex[0] - newIndex[0] == oldIndex[1] - newIndex[1]
                            && oldIndex[0] - newIndex[0] > 0){
                            //loop through positionsNW to determine if the new
                            //  location is valid
                            for(var i=positionsNW.length-1, j=oldIndex[0]-1, k=oldIndex[1]-1; i>=0; i--,j--,k--){
                                if(positionsNW[i] !== "" && newIndex[0] < j && newIndex[1] < k){
                                    return false;
                                }
                            }
                        }
                        //if the new position is to the SOUTHEAST
                        //  of the original position
                        if(oldIndex[0] - newIndex[0] == oldIndex[1] - newIndex[1]
                            && oldIndex[0] - newIndex[0] < 0){
                            //loop through positionsSE to determine if the new
                            //  location is valid
                            for(var i=0, j=oldIndex[0]+1, k=oldIndex[1]+1; i<positionsSE.length; i++,j++,k++){
                                if(positionsSE[i] !== "" && newIndex[0] > j && newIndex[1] > k){
                                    return false;
                                }
                            }
                        }
                        //if the new position is to the NORTHEAST
                        //  of the original position
                        if(oldIndex[0] - newIndex[0] == -1 * (oldIndex[1] - newIndex[1])
                            && oldIndex[0] - newIndex[0] > 0){
                            //loop through positionsNE to determine if the new
                            //  location is valid
                            for(var i=positionsNE.length-1, j=oldIndex[0]-1, k=oldIndex[1]+1; i>=0; i--,j--,k++){
                                if(positionsNE[i] !== "" && newIndex[0] < j && newIndex[1] > k){
                                    return false;
                                }
                            }
                        }
                        //if the new position is to the SOUTHWEST
                        //  of the original position
                        if(oldIndex[0] - newIndex[0] == -1 * (oldIndex[1] - newIndex[1])
                            && oldIndex[0] - newIndex[0] < 0){
                            //loop through positionsSW to determine if the new
                            //  location is valid
                            for(var i=0, j=oldIndex[0]+1, k=oldIndex[1]-1; i<positionsSW.length; i++,j++,k--){
                                if(positionsSW[i] !== "" && newIndex[0] > j && newIndex[1] < k){
                                    return false;
                                }
                            }
                        }
                        return true;
                    }
                    //|---------------------END---------------------|

                    //|--------------------QUEEN--------------------|
                    //if the piece is a queen
                    if(oldLoc.text() === queenWhite){
                        var positionsVert = [];
                        var positionsHori = [];
                        var positionsNW = [];
                        var positionsNE = [];
                        var positionsSW = [];
                        var positionsSE = [];
                        //if the new position is not diagonal,horizontal,or vertical of the original
                        //  position, return false
                        if(!(oldIndex[0] - newIndex[0] == oldIndex[1] - newIndex[1]
                            && oldIndex[0] - newIndex[0] > 0) &&
                           !(oldIndex[0] - newIndex[0] == oldIndex[1] - newIndex[1]
                            && oldIndex[0] - newIndex[0] < 0) &&
                           !(oldIndex[0] - newIndex[0] == -1 * (oldIndex[1] - newIndex[1])
                           && oldIndex[0] - newIndex[0] > 0) &&
                           !(oldIndex[0] - newIndex[0] == -1 * (oldIndex[1] - newIndex[1])
                           && oldIndex[0] - newIndex[0] < 0) && 
                           !(oldIndex[0] == newIndex[0]) &&
                           !(oldIndex[1] == newIndex[1])){
                               return false;
                           }
                        //loop through each grid item and add them to their
                        //  respective arrays
                        $(".grid-container").children().each(function(){
                            var id = $(this).attr("id");
                            //if the id is in the same lane and the 
                            //  new position is horizontal of the queen's 
                            //  original position
                            if(id.substring(0,1) === (oldIndex[0] + "")){
                                positionsHori.push($(this).text());
                            }
                            //if the id is in the same lane and the 
                            //  new position is vertical of the queen's 
                            //  original position
                            if(id.substring(1) === (oldIndex[1] + "")){
                                positionsVert.push($(this).text());
                            }
                            var id = $(this).attr("id");
                            var x = parseInt(id.substring(0,1));
                            var y = parseInt(id.substring(1));
                            //if the id is to the NW of the original position
                            if(oldIndex[0] - x == oldIndex[1] - y && oldIndex[0] - x > 0){
                                positionsNW.push($(this).text());
                            }
                            //if the id is to the SE of the original position
                            if(oldIndex[0] - x == oldIndex[1] - y && oldIndex[0] - x < 0){
                                positionsSE.push($(this).text());
                            }
                            //if the id is to the NE of the original position
                            if(oldIndex[0] - x == -1 * (oldIndex[1] - y)
                            && oldIndex[0] - x > 0){
                                positionsNE.push($(this).text());
                            }
                            //if the id is to the SW of the original position
                            if(oldIndex[0] - x == -1 * (oldIndex[1] - y)
                            && oldIndex[0] - x < 0){
                                positionsSW.push($(this).text());
                            }
                        });
                            //loop through positionsVert in the WEST direction
                            //  to see if the new index is not a valid position 
                            for(var i = oldIndex[1]-1; i >= 0; i--){
                                if(positionsHori[i] !== "" && newIndex[1] < i && newIndex[0] == oldIndex[0]){
                                    return false;
                                }
                            }
                            //loop through positionsVert in the East direction
                            //  to see if the new index is not a valid position 
                            for(var i = oldIndex[1]+1; i < 8; i++){
                                if(positionsHori[i] !== "" && newIndex[1] > i && newIndex[0] == oldIndex[0]){
                                    return false;
                                }
                            }
                            //loop through positionsVert in the NORTH direction
                            //  to see if the new index is not a valid position 
                            for(var i = oldIndex[0]-1; i >= 0; i--){
                                if(positionsVert[i] !== "" && newIndex[0] < i && newIndex[1] == oldIndex[1]){
                                    return false;
                                }
                            }
                            //loop through positionsVert in the SOUTH direction
                            //  to see if the new index is not a valid position 
                            for(var i = oldIndex[0]+1; i < 8; i++){
                                if(positionsVert[i] !== "" && newIndex[0] > i && newIndex[1] == oldIndex[1]){
                                    return false;
                                }
                            }
                            //if the new position is to the NORTHWEST
                        //  of the original position
                        if(oldIndex[0] - newIndex[0] == oldIndex[1] - newIndex[1]
                            && oldIndex[0] - newIndex[0] > 0){
                            //loop through positionsNW to determine if the new
                            //  location is valid
                            for(var i=positionsNW.length-1, j=oldIndex[0]-1, k=oldIndex[1]-1; i>=0; i--,j--,k--){
                                if(positionsNW[i] !== "" && newIndex[0] < j && newIndex[1] < k){
                                    return false;
                                }
                            }
                        }
                        //if the new position is to the SOUTHEAST
                        //  of the original position
                        if(oldIndex[0] - newIndex[0] == oldIndex[1] - newIndex[1]
                            && oldIndex[0] - newIndex[0] < 0){
                            //loop through positionsSE to determine if the new
                            //  location is valid
                            for(var i=0, j=oldIndex[0]+1, k=oldIndex[1]+1; i<positionsSE.length; i++,j++,k++){
                                if(positionsSE[i] !== "" && newIndex[0] > j && newIndex[1] > k){
                                    return false;
                                }
                            }
                        }
                        //if the new position is to the NORTHEAST
                        //  of the original position
                        if(oldIndex[0] - newIndex[0] == -1 * (oldIndex[1] - newIndex[1])
                            && oldIndex[0] - newIndex[0] > 0){
                            //loop through positionsNE to determine if the new
                            //  location is valid
                            for(var i=positionsNE.length-1, j=oldIndex[0]-1, k=oldIndex[1]+1; i>=0; i--,j--,k++){
                                if(positionsNE[i] !== "" && newIndex[0] < j && newIndex[1] > k){
                                    return false;
                                }
                            }
                        }
                        //if the new position is to the SOUTHWEST
                        //  of the original position
                        if(oldIndex[0] - newIndex[0] == -1 * (oldIndex[1] - newIndex[1])
                            && oldIndex[0] - newIndex[0] < 0){
                            //loop through positionsSW to determine if the new
                            //  location is valid
                            for(var i=0, j=oldIndex[0]+1, k=oldIndex[1]-1; i<positionsSW.length; i++,j++,k--){
                                if(positionsSW[i] !== "" && newIndex[0] > j && newIndex[1] < k){
                                    return false;
                                }
                            }
                        }
                            return true;
                    }
                    //|---------------------END---------------------|
                }
            }
            
            //if the piece is black
            else{
                //if you're not clicking on a piece of the same color
                if(blackPieces.includes(p.text())){
                    return false;
                }
                if(!blackPieces.includes(p.text())){

                    //PIECES
                    //|---------------------KING--------------------|
                    //if the piece is a king
                    if(oldLoc.text() === kingBlack){
                        if(Math.abs(oldIndex[0] - newIndex[0]) <= 1 &&
                            Math.abs(oldIndex[1] - newIndex[1]) <= 1){
                                kingBlackMoved = true;
                                return true;
                        }
                        //if they try to castle kingside
                        if(oldLoc.attr("id") === "04" &&
                            p.attr("id") === "06" &&
                            !kingBlackMoved && !rookH8Moved){
                            $("#07").html("");
                            $("#05").html("♜");
                            kingBlackMoved = true;
                            rookH8Moved = true;
                            return true;
                        }
                        //if they try to castle queenside
                        if(oldLoc.attr("id") === "04" &&
                            p.attr("id") === "02" &&
                            !kingBlackMoved && !rookH1Moved){
                            $("#00").html("");
                            $("#03").html("♜");
                            kingBlackMoved = true;
                            rookH1Moved = true;
                            return true;
                        }
                    }
                    //|---------------------END---------------------|

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
                    

                    //|---------------------ROOK--------------------|
                    //If the piece is a rook
                    if(oldLoc.text() == rookBlack){
                        //if the new position is in a straight line
                        var positionsVert = [];
                        var positionsHori = [];
                        
                        if(newIndex[0] == oldIndex[0]){
                            //loop through each grid item
                            $(".grid-container").children().each(function(){
                                var id = $(this).attr("id");
                                //if the id is in the same lane and the 
                                //  new position is horizontal of the rook's 
                                //  original position
                                if(id.substring(0,1) === (oldIndex[0] + "")){
                                    positionsHori.push($(this).text());
                                }
                            });
                            //loop through positionsVert in the WEST direction
                            //  to see if the new index is not a valid position 
                            for(var i = oldIndex[1]-1; i >= 0; i--){
                                if(positionsHori[i] !== "" && newIndex[1] < i){
                                    return false;
                                }
                            }
                            //loop through positionsVert in the East direction
                            //  to see if the new index is not a valid position 
                            for(var i = oldIndex[1]+1; i < 8; i++){
                                if(positionsHori[i] !== "" && newIndex[1] > i){
                                    return false;
                                }
                            }
                            if(oldLoc.attr("id") === "00"){
                                rookH1Moved = true;
                            }else{
                                rookH8Moved = true;
                            }
                            return true;
                        }else if(newIndex[1] == oldIndex[1]){
                            //loop through each grid item
                            $(".grid-container").children().each(function(){
                                var id = $(this).attr("id");
                                //if the id is in the same lane and the 
                                //  new position is vertical of the rook's 
                                //  original position
                                if(id.substring(1) === (oldIndex[1] + "")){
                                    positionsVert.push($(this).text());
                                }
                            });
                            //loop through positionsVert in the NORTH direction
                            //  to see if the new index is not a valid position 
                            for(var i = oldIndex[0]-1; i >= 0; i--){
                                if(positionsVert[i] !== "" && newIndex[0] < i){
                                    return false;
                                }
                            }
                            //loop through positionsVert in the SOUTH direction
                            //  to see if the new index is not a valid position 
                            for(var i = oldIndex[0]+1; i < 8; i++){
                                if(positionsVert[i] !== "" && newIndex[0] > i){
                                    return false;
                                }
                            }
                            if(oldLoc.attr("id") === "00"){
                                rookH1Moved = true;
                            }else{
                                rookH8Moved = true;
                            }
                            return true;
                        }
                    }
                    //|---------------------END---------------------|

                    //|--------------------BISHOP-------------------|
                    //if the piece is a bishop
                    if(oldLoc.text() === bishopBlack){
                        var positionsNW = [];
                        var positionsNE = [];
                        var positionsSW = [];
                        var positionsSE = [];
                        //if the new position is not diagonal of the original
                        //  position, return false
                        if(!(oldIndex[0] - newIndex[0] == oldIndex[1] - newIndex[1]
                            && oldIndex[0] - newIndex[0] > 0) &&
                           !(oldIndex[0] - newIndex[0] == oldIndex[1] - newIndex[1]
                            && oldIndex[0] - newIndex[0] < 0) &&
                           !(oldIndex[0] - newIndex[0] == -1 * (oldIndex[1] - newIndex[1])
                           && oldIndex[0] - newIndex[0] > 0) &&
                           !(oldIndex[0] - newIndex[0] == -1 * (oldIndex[1] - newIndex[1])
                           && oldIndex[0] - newIndex[0] < 0)){
                               return false;
                           }
                        //loop through each grid item and add them to their
                        //  respective arrays depending on their location 
                        //  relative to the original position
                        $(".grid-container").children().each(function(){
                            var id = $(this).attr("id");
                            var x = parseInt(id.substring(0,1));
                            var y = parseInt(id.substring(1));
                            //if the id is to the NW of the original position
                            if(oldIndex[0] - x == oldIndex[1] - y && oldIndex[0] - x > 0){
                                positionsNW.push($(this).text());
                            }
                            //if the id is to the SE of the original position
                            if(oldIndex[0] - x == oldIndex[1] - y && oldIndex[0] - x < 0){
                                positionsSE.push($(this).text());
                            }
                            //if the id is to the NE of the original position
                            if(oldIndex[0] - x == -1 * (oldIndex[1] - y)
                            && oldIndex[0] - x > 0){
                                positionsNE.push($(this).text());
                            }
                            //if the id is to the SW of the original position
                            if(oldIndex[0] - x == -1 * (oldIndex[1] - y)
                            && oldIndex[0] - x < 0){
                                positionsSW.push($(this).text());
                            }
                        });

                        //if the new position is to the NORTHWEST
                        //  of the original position
                        if(oldIndex[0] - newIndex[0] == oldIndex[1] - newIndex[1]
                            && oldIndex[0] - newIndex[0] > 0){
                            //loop through positionsNW to determine if the new
                            //  location is valid
                            for(var i=positionsNW.length-1, j=oldIndex[0]-1, k=oldIndex[1]-1; i>=0; i--,j--,k--){
                                if(positionsNW[i] !== "" && newIndex[0] < j && newIndex[1] < k){
                                    return false;
                                }
                            }
                        }
                        //if the new position is to the SOUTHEAST
                        //  of the original position
                        if(oldIndex[0] - newIndex[0] == oldIndex[1] - newIndex[1]
                            && oldIndex[0] - newIndex[0] < 0){
                            //loop through positionsSE to determine if the new
                            //  location is valid
                            for(var i=0, j=oldIndex[0]+1, k=oldIndex[1]+1; i<positionsSE.length; i++,j++,k++){
                                if(positionsSE[i] !== "" && newIndex[0] > j && newIndex[1] > k){
                                    return false;
                                }
                            }
                        }
                        //if the new position is to the NORTHEAST
                        //  of the original position
                        if(oldIndex[0] - newIndex[0] == -1 * (oldIndex[1] - newIndex[1])
                            && oldIndex[0] - newIndex[0] > 0){
                            //loop through positionsNE to determine if the new
                            //  location is valid
                            for(var i=positionsNE.length-1, j=oldIndex[0]-1, k=oldIndex[1]+1; i>=0; i--,j--,k++){
                                if(positionsNE[i] !== "" && newIndex[0] < j && newIndex[1] > k){
                                    return false;
                                }
                            }
                        }
                        //if the new position is to the SOUTHWEST
                        //  of the original position
                        if(oldIndex[0] - newIndex[0] == -1 * (oldIndex[1] - newIndex[1])
                            && oldIndex[0] - newIndex[0] < 0){
                            //loop through positionsSW to determine if the new
                            //  location is valid
                            for(var i=0, j=oldIndex[0]+1, k=oldIndex[1]-1; i<positionsSW.length; i++,j++,k--){
                                if(positionsSW[i] !== "" && newIndex[0] > j && newIndex[1] < k){
                                    return false;
                                }
                            }
                        }
                        return true;
                    }
                    //|---------------------END---------------------|

                    //|--------------------QUEEN--------------------|
                    //if the piece is a queen
                    if(oldLoc.text() === queenBlack){
                        var positionsVert = [];
                        var positionsHori = [];
                        var positionsNW = [];
                        var positionsNE = [];
                        var positionsSW = [];
                        var positionsSE = [];
                        //if the new position is not diagonal,horizontal,or vertical of the original
                        //  position, return false
                        if(!(oldIndex[0] - newIndex[0] == oldIndex[1] - newIndex[1]
                            && oldIndex[0] - newIndex[0] > 0) &&
                           !(oldIndex[0] - newIndex[0] == oldIndex[1] - newIndex[1]
                            && oldIndex[0] - newIndex[0] < 0) &&
                           !(oldIndex[0] - newIndex[0] == -1 * (oldIndex[1] - newIndex[1])
                           && oldIndex[0] - newIndex[0] > 0) &&
                           !(oldIndex[0] - newIndex[0] == -1 * (oldIndex[1] - newIndex[1])
                           && oldIndex[0] - newIndex[0] < 0) && 
                           !(oldIndex[0] == newIndex[0]) &&
                           !(oldIndex[1] == newIndex[1])){
                               return false;
                           }
                        //loop through each grid item and add them to their
                        //  respective arrays
                        $(".grid-container").children().each(function(){
                            var id = $(this).attr("id");
                            //if the id is in the same lane and the 
                            //  new position is horizontal of the queen's 
                            //  original position
                            if(id.substring(0,1) === (oldIndex[0] + "")){
                                positionsHori.push($(this).text());
                            }
                            //if the id is in the same lane and the 
                            //  new position is vertical of the queen's 
                            //  original position
                            if(id.substring(1) === (oldIndex[1] + "")){
                                positionsVert.push($(this).text());
                            }
                            var id = $(this).attr("id");
                            var x = parseInt(id.substring(0,1));
                            var y = parseInt(id.substring(1));
                            //if the id is to the NW of the original position
                            if(oldIndex[0] - x == oldIndex[1] - y && oldIndex[0] - x > 0){
                                positionsNW.push($(this).text());
                            }
                            //if the id is to the SE of the original position
                            if(oldIndex[0] - x == oldIndex[1] - y && oldIndex[0] - x < 0){
                                positionsSE.push($(this).text());
                            }
                            //if the id is to the NE of the original position
                            if(oldIndex[0] - x == -1 * (oldIndex[1] - y)
                            && oldIndex[0] - x > 0){
                                positionsNE.push($(this).text());
                            }
                            //if the id is to the SW of the original position
                            if(oldIndex[0] - x == -1 * (oldIndex[1] - y)
                            && oldIndex[0] - x < 0){
                                positionsSW.push($(this).text());
                            }
                        });
                            //loop through positionsVert in the WEST direction
                            //  to see if the new index is not a valid position 
                            for(var i = oldIndex[1]-1; i >= 0; i--){
                                if(positionsHori[i] !== "" && newIndex[1] < i && newIndex[0] == oldIndex[0]){
                                    return false;
                                }
                            }
                            //loop through positionsVert in the East direction
                            //  to see if the new index is not a valid position 
                            for(var i = oldIndex[1]+1; i < 8; i++){
                                if(positionsHori[i] !== "" && newIndex[1] > i && newIndex[0] == oldIndex[0]){
                                    return false;
                                }
                            }
                            //loop through positionsVert in the NORTH direction
                            //  to see if the new index is not a valid position 
                            for(var i = oldIndex[0]-1; i >= 0; i--){
                                if(positionsVert[i] !== "" && newIndex[0] < i && newIndex[1] == oldIndex[1]){
                                    return false;
                                }
                            }
                            //loop through positionsVert in the SOUTH direction
                            //  to see if the new index is not a valid position 
                            for(var i = oldIndex[0]+1; i < 8; i++){
                                if(positionsVert[i] !== "" && newIndex[0] > i && newIndex[1] == oldIndex[1]){
                                    return false;
                                }
                            }
                            //if the new position is to the NORTHWEST
                        //  of the original position
                        if(oldIndex[0] - newIndex[0] == oldIndex[1] - newIndex[1]
                            && oldIndex[0] - newIndex[0] > 0){
                            //loop through positionsNW to determine if the new
                            //  location is valid
                            for(var i=positionsNW.length-1, j=oldIndex[0]-1, k=oldIndex[1]-1; i>=0; i--,j--,k--){
                                if(positionsNW[i] !== "" && newIndex[0] < j && newIndex[1] < k){
                                    return false;
                                }
                            }
                        }
                        //if the new position is to the SOUTHEAST
                        //  of the original position
                        if(oldIndex[0] - newIndex[0] == oldIndex[1] - newIndex[1]
                            && oldIndex[0] - newIndex[0] < 0){
                            //loop through positionsSE to determine if the new
                            //  location is valid
                            for(var i=0, j=oldIndex[0]+1, k=oldIndex[1]+1; i<positionsSE.length; i++,j++,k++){
                                if(positionsSE[i] !== "" && newIndex[0] > j && newIndex[1] > k){
                                    return false;
                                }
                            }
                        }
                        //if the new position is to the NORTHEAST
                        //  of the original position
                        if(oldIndex[0] - newIndex[0] == -1 * (oldIndex[1] - newIndex[1])
                            && oldIndex[0] - newIndex[0] > 0){
                            //loop through positionsNE to determine if the new
                            //  location is valid
                            for(var i=positionsNE.length-1, j=oldIndex[0]-1, k=oldIndex[1]+1; i>=0; i--,j--,k++){
                                if(positionsNE[i] !== "" && newIndex[0] < j && newIndex[1] > k){
                                    return false;
                                }
                            }
                        }
                        //if the new position is to the SOUTHWEST
                        //  of the original position
                        if(oldIndex[0] - newIndex[0] == -1 * (oldIndex[1] - newIndex[1])
                            && oldIndex[0] - newIndex[0] < 0){
                            //loop through positionsSW to determine if the new
                            //  location is valid
                            for(var i=0, j=oldIndex[0]+1, k=oldIndex[1]-1; i<positionsSW.length; i++,j++,k--){
                                if(positionsSW[i] !== "" && newIndex[0] > j && newIndex[1] < k){
                                    return false;
                                }
                            }
                        }
                            return true;
                    }
                    //|---------------------END---------------------|
            }
        }
        
        return false;
    }
});

