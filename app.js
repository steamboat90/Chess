
var player = "W";

var columns = ["a", "b", "c", "d", "e", "f", "g", "h"];

var board = [["R-W", "N-W", "B-W", "Q-W", "K-W", "B-W", "N-W", "R-W"],
            ["P-W", "P-W", "P-W", "P-W", "P-W", "P-W", "P-W", "P-W"], 
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", ""],
            ["P-B", "P-B", "P-B", "P-B", "P-B", "P-B", "P-B", "P-B"],
            ["R-B", "N-B", "B-B", "Q-B", "K-B", "B-B", "N-B", "R-B"]]

            

function addClickHandler(col, row){

    //This gets the letter associated with each column, adds it to the row associated with the column
    //  and responds to clicks from the user. 
    document.getElementById(columns[col] + row).onclick = function(){
        alert(columns[col] + row);

        //Display the possible moves of the piece that the user has clicked on
        var piece = board[row-1][col];

        //Calculate possible moves of each variant of chess piece
        if(piece.includes("P")){
            //If the move is valid

        }
    }
}

function fillBoard(){
    for(var i = 0; i < 8; i++){
        for(var j = 0; j < 8; j++){
            document.getElementById(columns[i] + (j + 1)).innerHTML = board[j][i];
        }
    }
}

function switchPlayer(){
    if(player === "W"){
        player = "B"; 
    } else {
        player === "W";
    }
}

for(var i = 0; i < 8; i++){
    for(var j = 1; j <= 8; j++){
        addClickHandler(i, j);
    }
}
fillBoard();