var symbolTracker = true;
var isGameOver = false;

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
                    cell.innerHTML = "Empty";

                    // add click event listener to new cell
                    cell.addEventListener("click", (event) =>{
                        markCell(event.target);
                    });

                    // append cell to column
                    row.appendChild(cell);
                }
                
                // append column to grid
                grid.appendChild(row);

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
        }
    });
}

    // function to mark cell with X or 0
    function markCell(cell) {
        let id = cell.id;
        console.log("you clicked this specific grid item " + id);

        // TODO: add check to see if box is already occupied so it doesn't overwrite it
        cell.innerHTML = (symbolTracker) ? "X" : "O";

        // check if game is over
        checkGameStatus();
    }

    // function to check if game is over
    function checkGameStatus(){
        // check the adjoining cells innerHTML contents to see if the symbols match
        checkMatches();

        // if game isn't over
        if(!isGameOver){
            // if game isn't over change symbol
            symbolTracker = !symbolTracker;
            console.log(isGameOver);
        }else{
            alert("Game over!")
        }
    }

    function checkMatches(){
        // check the adjoining cells innerHTML contents to see if the symbols match
    }