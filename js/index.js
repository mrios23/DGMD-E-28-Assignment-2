var symbolTracker = true;
var isGameOver = false;

// define all winning combinations
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
                let row = document.createElement("div");
                row.classList.add("row");
                
                // within each column create 3 cells
                for(let c=0; c<3; c++){

                    // create new cell element, add class, & id attributes
                    let cell = document.createElement("div");
                    cell.classList.add("cell");
                    cell.setAttribute("id", r + "_" + c)
                    
                    // debug info
                    // cell.innerHTML = "Empty";
                    cell.innerHTML = cell.id;

                    // add click event listener to new cell
                    cell.addEventListener("click", (event) =>{
                        markCell(event.target);
                        updatePlayerMsg();
                    });

                    // append cell to column
                    row.appendChild(cell);
                }
                
                // append column to grid
                grid.appendChild(row);

                // update player msg
                updatePlayerMsg();

                // change game button to reset
                playGameBtn.innerHTML = "Reset";
            }
            
        } else{
            /* reset board
                    get all elements with cell class
                    set each cell element's inner text to empty */
            let gridItems = document.querySelectorAll(".cell");

            gridItems.forEach((cell) => {
                cell.innerHTML = "Empty";
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

        if(!isGameOver){
            // if game isn't over change symbol
            symbolTracker = !symbolTracker;
            console.log("The game isn't over! isGameOver returns " + isGameOver);
        }else{
            // game is over
            alert("Congrats! The game is over!");
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
            
            if((cell1 != "Empty") && (cell1 === cell2) && (cell1 === cell3)){
                    isGameOver = true;
                    
                    break;
            }
        }
    }

    function updatePlayerMsg() {
        let playerDiv = document.getElementById("players-turn");

        let currSymbol = ((symbolTracker) ? "X" : "O");

        playerDiv.innerHTML = "Player " + currSymbol + " turn.";
    }