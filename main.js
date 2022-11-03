// import positions from './seed.json' assert { type: "json" };
import positions from './positions.js';
import {posWins} from './positions.js';


let canvas = document.getElementById('canvas03');
let ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 600;

var player = true;
var gameGrid = []
var gridForCheck = Array(9).fill({player: '', value:''})
let moves = 0
let posWin = []
let gameFinish = false
//TODO Verificar si la voy a usar la variable o no
let currentPlayer = ''

const resetVariables = () => {
  player = true;
  gameGrid = []
  gridForCheck = Array(9).fill({player: '', value:''})
  moves = 0
  posWin = []
  gameFinish = false
}

/**
 * It draws a grid on the canvas
 * @param ctx - The context of the canvas.
 */
const drawGrid = (ctx) => {
  resetVariables();
  ctx.beginPath();
  ctx.moveTo(200, 0);
  ctx.lineTo(200, 600);
  ctx.moveTo(400, 0);
  ctx.lineTo(400, 600);
  ctx.moveTo(0, 200);
  ctx.lineTo(600, 200);
  ctx.moveTo(0, 400);
  ctx.lineTo(600, 400);
  ctx.strokeStyle = "black";
  ctx.lineWidth = 5;
  ctx.stroke();
}

canvas.addEventListener('click', function(e) {
  if (!gameFinish) {
    let posX = getNewPosition(e.offsetX, player)
    let posY = getNewPosition(e.offsetY, player)
    
    player = saveMove(posX, posY, player)
    checkGame()
  }
}, false);

/**
 * It takes in the x and y coordinates of the click, and the player, and then
 * checks if the position is already taken. If it is, it returns the player, and if
 * it isn't, it draws the X or O, and returns the player
 * @param posX - the x position of the mouse click
 * @param posY - the y position of the mouse click
 * @param player - the player who's turn it is
 * @returns the drawXorO function.
 */
const saveMove = (posX, posY, player) => {
  let key = `${posX}${posY}`
  let key02 = `${posX + 50}${posY + 50}`
  let key03 = `${posX - 50}${posY - 50}`

  if (gameGrid[key] !== undefined || gameGrid[key02] !== undefined || gameGrid[key03] !== undefined) {
    let message = document.getElementById("message");
    message.classList.remove('hidden');
    setTimeout(() => { message.classList.add('hidden'); }, 500);
    return player
  } else {
    currentPlayer = player ? 'X' : 'O'
    moves++
    gameGrid[key] = {move: moves}
    gridForCheck[positions[key].position] = {
      player: player ? 'one' : 'two',
      value: player ? 'X' : 'O',
    }
    return drawXorO(posX, posY, player);
  }
}

/**
 * It draws an X or an O on the canvas depending on the player
 * @param posX - The x coordinate of the top left corner of the square.
 * @param posY - The y-coordinate of the top left corner of the canvas.
 * @param player - true if the player is drawing an X, false if the player is
 * drawing an O
 */
const drawXorO = (posX, posY, player) => {
  ctx.beginPath();
  
  if (player) {
    ctx.moveTo(posX, posY);
    ctx.lineTo(posX + 100, posY + 100);
    ctx.moveTo(posX, posY + 100);
    ctx.lineTo(posX + 100, posY);
    ctx.strokeStyle = "darkblue";
  } else {
    ctx.arc(posX, posY, 50, 0, 2 * Math.PI);
    ctx.strokeStyle = "brown";
  }

  ctx.lineWidth = 15;
  ctx.stroke();
  return !player
}

/**
 * If the position is less than 200, return 50 or 100, if the position is greater
 * than 400, return 450 or 500, otherwise return 250 or 300
 * @param pos - the current position of the player
 * @param player - true if the player is moving, false if the opponent is moving
 * @returns The new position of the player.
 */
const getNewPosition = (pos, player) => {
  let newPosition = 0
  if (pos < 200) {
    newPosition = player ? 50 : 100
  } else if (pos > 400) {
    newPosition = player ? 450 : 500
  } else {
    newPosition = player ? 250 : 300
  }
  return newPosition;
}

/**
 * Draw the grid on the canvas.
 */
const draw = () => {
  drawGrid(ctx);
}
draw();

/**
 * If the player has won, draw a line between the winning positions. If the game is
 * a draw, display a message
 */
const checkGame = () => {
  if (  checkString(0,1) || checkString(3,1) || checkString(6,1) ||
        checkString(0,3) || checkString(1,3) || checkString(2,3) ||
        checkString(0,4) || checkString(2,2)
  ) {
    gameFinish = true
    ctx.beginPath();
    ctx.moveTo(posWin[0][0],posWin[0][1]);
    ctx.lineTo(posWin[1][0], posWin[1][1]);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "yellow";
    ctx.stroke();
  } else if (moves === 9){
    gameFinish = true
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "100px Arial";
    ctx.textAlign = "center";
    ctx.fillText("DRAW", canvas.width/2, canvas.height/2);
  }
}

/**
 * It checks if the values of the three grid elements in the gridForCheck array are
 * the same and not empty
 * @param num1 - the first number in the gridForCheck array
 * @param inc - the increment to the next number in the gridForCheck array
 * @returns A boolean value
 */
const checkString = (num1, inc) => {
  if (['XXX', 'OOO'].includes(
    `${gridForCheck[num1].value}${gridForCheck[num1 + inc].value}${gridForCheck[num1+inc+inc].value}`) 
    &&
      ![gridForCheck[num1].value, gridForCheck[num1 + inc].value, gridForCheck[num1 + inc+inc].value].includes('')
  ) {
    posWin = posWins[`${num1}${num1+inc+inc}`]
    return true
  } else {
    return false
  }
}




let startButton = document.getElementById('btn-start')

/* Adding an event listener to the start button. When the button is clicked, it
checks if the button says 'Start'. If it does, it removes the hidden class from
the canvas, and changes the text of the button to 'Reload'. If the button says
'Reload', it clears the canvas, changes the text of the button to 'Start', adds
the hidden class to the canvas, and calls the draw function. */
startButton.addEventListener('click', () => {
  if (startButton.innerText == 'Start') {
    canvas.classList.remove('hidden')
    startButton.innerText = 'Reload'
  } else if (startButton.innerText == 'Reload') {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    startButton.innerText = 'Start'
    canvas.classList.add('hidden')
    
    draw()
  }
})