/* Global Variables */
var symbolTracker = true;
var isGameOver = false;
var winner;

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
            hideMsg();
        }
    });
}


/*** UTILITY FUNCTIONS - supports methods called within window.onload ***/

// Function to mark cell with symbol
function markCell(cell) {
    // Check that the game isn't over & if the cell isn't occupied mark cell
    if(cell.innerHTML == "" && isGameOver != true){
        hideMsg();
        cell.innerHTML = getCurrSymbol();
        cell.style.color = (cell.innerHTML == "X") ? "#4D4DFF" : "#E0E722";
        symbolTracker = !symbolTracker;
    }else{
        displayMsg("Please pick another box or reset the game!")
    }

    // After marking check if game is over
    checkGameStatus();
}

// Function to check if game is over
function checkGameStatus(){
    // check for winner
    checkMatches();

    // check for stalemate
    let isStaleMate = checkStaleMate();

    if(isGameOver || isStaleMate){
        // if winner - congratulate winner
        if(isGameOver == true){
            displayMsg("Winner! Congratulations Player " + winner);
        } 

        // if stalemate - announce stalemate
        if(isStaleMate == true && isGameOver == false){
            displayMsg("Game Over! No winners");
        }
    }
}

/*  REQUIREMENT: 
    This section of code is one that I am most proud of as I successfully used the concept of 
    destructing an array, which I had not learned before this course.
    */
// Function that checks if their are any matches  
function checkMatches(){
    for(index in matches){
    
        let match = matches[index];
        let [first, second, third] = match;

        let cell1 = document.getElementById(first).innerHTML;
        let cell2 = document.getElementById(second).innerHTML;
        let cell3 = document.getElementById(third).innerHTML;     
        
        if((cell1 != "") && (cell1 === cell2) && (cell1 === cell3)){
            isGameOver = true;
            winner = cell1;
            break;
        }
    }
}

// Function to check for stalemate in game
function checkStaleMate(){
    let staleMateFlag = true;
    let gridItems = document.querySelectorAll(".cell");

    gridItems.forEach((cell)=>{
        if(cell.innerHTML == ""){
            staleMateFlag = false;
        }
    });

    return staleMateFlag;
}

// Function to display message for the players turn
function updatePlayerMsg() {
    let playerDiv = document.getElementById("players-turn");
    playerDiv.innerHTML = "Player " + getCurrSymbol() + " turn!";
}


// Function to return the current symbol in the game play
function getCurrSymbol(){
    return (symbolTracker) ? "X" : "O";
}


// Function to display additional messages for game
function displayMsg(message){
    let msg = document.getElementById("message");
    msg.innerHTML = message;
    msg.style.visibility = "visible";
}


// Function to hide additional messages for during the game
function hideMsg(){
    let msg = document.getElementById("message");
    msg.style.visibility = "hidden";
}