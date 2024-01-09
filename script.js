const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info>p");
const newGameBtn = document.querySelector(".new-game");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    // Empty on UI
    boxes.forEach((box,index)=>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        
        // initialize box with css properties
        box.classList = `box box${index+1}`
    });
    newGameBtn.classList.remove("active-btn");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";  
    }
    else{
        currentPlayer = "X"
    }
    // UI update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let ans = "";
    // all 3 boxes should be non=empty and exactly same in value
    winningPositions.forEach((position) => {
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
            && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {

                // check if winner is X
                if(gameGrid[position[0]] === "X")
                    ans = "X";
                else
                    ans = "O";

                // Disable pointer events
                boxes.forEach(box => box.style.pointerEvents = "none")
                                
                // now we know X/O is a winner
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");

            }
    });

    // It means that we have a winner
    if(ans !== ""){
        gameInfo.innerText = `Winner Player - ${ans}`;
        newGameBtn.classList.add("active-btn");
        return; 
    }

    // let's check whether there is tie
    let fillCount = 0;
    gameGrid.forEach(box=>{
        if(box !== "")
            fillCount++;
    });

    // Board is filled, game is TIE
    if(fillCount === 9){
        gameInfo.innerText = "Game Tied";
        newGameBtn.classList.add("active-btn")
    }
    
}

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // turn swap : 
        swapTurn();
        // check if any one is winner
        checkGameOver(); 
    }
}

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index); 
    })
})

newGameBtn.addEventListener("click",initGame)