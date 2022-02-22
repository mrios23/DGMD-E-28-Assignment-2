var symbolTracker = true;
var isGameOver = false;

// winning combinations
const matches = [
    ["0_0", "1_0", "2_0"],
    ["0_1", "1_1", "2_1"],
    ["0_2", "1_2", "2_2"],
    ["0_0", "1_1", "2_2"],
    ["2_0", "1_1", "0_2"],
    ["0_0", "0_1", "0_2"],
    ["1_0", "1_1", "1_2"],
    ["2_0", "2_1", "2_2"]
]

window.onload = function() {

    const playGameBtn = document.getElementById("play-game-btn");

    playGameBtn.addEventListener("click", () => {

        if(playGameBtn.innerHTML=="Play Game!"){
            // create grid
            let grid = document.getElementById("grid");

            // create 3 columns
            for(let r=0; r<3; r++){
                let col = document.createElement("div");
                col.classList.add("col");
                
                // within each column create 3 cells
                for(let c=0; c<3; c++){

                    // create new cell element, add class, & id attributes
                    let cell = document.createElement("div");
                    cell.classList.add("cell");
                    cell.setAttribute("id", r + "_" + c);

                    // add click event listener to new cell
                    cell.addEventListener("click", (event) =>{
                        markCell(event.target);
                        updatePlayerMsg();
                    });

                    // append cell to column
                    col.appendChild(cell);
                }
                
                // append column to grid
                grid.appendChild(col);

                // update player msg
                updatePlayerMsg();

                // change game button to reset
                playGameBtn.innerHTML = "Reset";
            }
            
        } else{
            /* reset board */
            let gridItems = document.querySelectorAll(".cell");

            gridItems.forEach((cell) => {
                cell.innerHTML = "";
            });
            isGameOver = false;
        }
    });
}

// UTILITY FUNCTIONS - supports methods called within window.onload

// function to mark cell with X or 0
function markCell(cell) {

    // TODO: add check to see if box is already occupied so it doesn't overwrite it
    cell.innerHTML = (symbolTracker) ? "X" : "O";

    // check if game is over
    checkGameStatus();
}

// function to check if game is over
function checkGameStatus(){
    // check the adjoining cells innerHTML contents to see if the symbols match
    checkMatches();

    // check for stalemate
    let isStaleMate = checkStaleMate();

    if(!isGameOver && !isStaleMate){
        // game isn't over
        symbolTracker = !symbolTracker;
        
    }else{
        // game is over
        // if winner - congratulate winner
        if(isGameOver == true){
            let currSymbol = ((symbolTracker) ? "X" : "O");
            alert("Winner! Congratulations Player " + currSymbol);
        } 

        // if stalemate - announce stalemate
        if(isStaleMate == true){
            alert("Game Over! No winners");
        }
    }
}

// function that cheks if the adjoining cells innerText contents to see if the symbols match
function checkMatches(){
    for(index in matches){
    
        let match = matches[index];

        let[first, second, third] = match;

        let cell1 = document.getElementById(first).innerHTML;
        let cell2 = document.getElementById(second).innerHTML;
        let cell3 = document.getElementById(third).innerHTML;     
        
        if((cell1 != "") && (cell1 === cell2) && (cell1 === cell3)){
                isGameOver = true;
                break;
        }
    }
}

function checkStaleMate(){

    let staleMateFlag = true;
    let gridItems = document.querySelectorAll(".cell");

    gridItems.forEach((cell)=>{
        if(cell.innerHTML == "Empty" || cell.innerHTML == ""){
            staleMateFlag = false;
        }
    });

    return staleMateFlag;
}

function updatePlayerMsg() {
    let playerDiv = document.getElementById("players-turn");

    let currSymbol = ((symbolTracker) ? "X" : "O");

    playerDiv.innerHTML = "Player " + currSymbol + " turn.";
}