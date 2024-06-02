// selecting elements
let cells = document.querySelectorAll('.grid-item')
let playerBoard = document.querySelector('.player')
let winner = document.querySelector('.won')

// player X starts the game
let currentPlayer = 'X'
playerBoard.innerHTML = `<h2>Current Player: ${currentPlayer}</h2>`

// state to prevent player moves after game finishes
let blockGame = false

// setting cells and attaching move function
cells.forEach((cell)=>{
  cell.addEventListener('click', function(){playerMove(cell)})
  cell.innerHTML = ""
})

// called after every player move to switch to other player
function playerSwap(){
  if(currentPlayer==='X'){currentPlayer='O'}else{currentPlayer='X'}
}

// player move function, gets called when cells are clicked. alerts if the game is already finished or if the player clicked on a cell that is already filled/marked.
// on every move, check functions are getting called to check if the current player won the game.
function playerMove(cell){
  if (!blockGame) {
    if(cell.innerHTML !== ""){
      alert('Cell is already filled !')
    }
    else {
      cell.innerHTML = currentPlayer
      verticalCheck()
      horizontalCheck()
      diagonalCheck()
      drawCheck()
      playerSwap()
      playerBoard.innerHTML = `<h2>Current Player: ${currentPlayer}</h2>`
    }
  }
  else{
    alert('RESET THE GAME')
  }
}

// gets called when clicked to reset game. Required for starting a new game
function resetGame(){
  cells.forEach((cell)=>{
    cell.innerHTML = ""
  })
  currentPlayer = 'X'
  winner.innerHTML = ""
  playerBoard.innerHTML = `<h2>Current Player: ${currentPlayer}</h2>`
  blockGame = false
}

/*
win conditions:
  [0,3,6], [1,4,7], [2,5,8] V
  [0,1,2], [3,4,5], [6,7,8] H
  [0,4,8], [2,4,6],
*/

// loops vertically on cells and checks win conditions for current player
function verticalCheck(){
  for (let index = 0; index < 3; index++) {
    if(cells[index].innerHTML === currentPlayer && cells[index+3].innerHTML === currentPlayer && cells[index+6].innerHTML === currentPlayer){
      winner.innerHTML = `<h2>Player ${currentPlayer} won !<br>Reset the game...</h2>`
      blockGame = true
      return;
    }
  }
}

// loops horizontally on cells and checks win conditions for current player
function horizontalCheck(){
  for (let index = 0; index < 9; index+=3) {
    if(cells[index].innerHTML === currentPlayer && cells[index+1].innerHTML === currentPlayer && cells[index+2].innerHTML === currentPlayer){
      winner.innerHTML = `<h2>Player ${currentPlayer} won !<br>Reset the game...</h2>`
      blockGame = true
      return;
    }
  }
}

// loops diagonally on cells and checks win conditions for current player
function diagonalCheck(){
  let x = 0
  for (let index = 0; index < 2; index++) {
    if(cells[0+x].innerHTML === currentPlayer && cells[4].innerHTML === currentPlayer && cells[8-x].innerHTML === currentPlayer){
      winner.innerHTML = `<h2>Player ${currentPlayer} won !<br>Reset the game...</h2>`
      blockGame = true
      return;
    }
    x += 2
  }
}

// loops on all cells and checks if all all of them are filled/marked and no body won.
function drawCheck(){
  let usedCellCount = 0
  cells.forEach((cell)=>{
    if(cell.innerHTML !==""){
      usedCellCount++
    }
  })
  if(usedCellCount>=9){
    winner.innerHTML = `<h2>Tie !<br>Reset the game...</h2>`
    blockGame = true
    return;
  }
}