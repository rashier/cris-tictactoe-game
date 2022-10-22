// import positions from './seed.json' assert { type: "json" };
import positions from './positions.js';


let canvas = document.getElementById('canvas03');
let ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 600;

var player = true;
var gameGrid = []
var gridForCheck = []
let moves = 0

/**
 * It draws a grid on the canvas
 * @param ctx - The context of the canvas.
 */
const drawGrid = (ctx) => {
  ctx.beginPath();
  ctx.moveTo(200, 0);
  ctx.lineTo(200, 600);
  ctx.moveTo(400, 0);
  ctx.lineTo(400, 600);
  ctx.moveTo(0, 200);
  ctx.lineTo(600, 200);
  ctx.moveTo(0, 400);
  ctx.lineTo(600, 400);
  ctx.lineWidth = 5;
  ctx.stroke();
}

canvas.addEventListener('click', function(e) {
  let posX = getNewPosition(e.offsetX, player)
  let posY = getNewPosition(e.offsetY, player)
  
  player = saveMove(posX, posY, player)
}, false);

/**
 * If the gameGrid object has a key that matches the position of the click, then
 * display a message to the user. Otherwise, add the position to the gameGrid
 * object and draw the X or O
 * @param posX - the x position of the mouse click
 * @param posY - The Y position of the mouse click
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
    moves++
    gameGrid[key] = {move: moves}
    gridForCheck[positions[key].position] = {
      player: player ? 'one' : 'two',
      value: player ? 'X' : 'O',
    }
    console.log(gridForCheck);
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

const checkGame = () => {

}

// 123 +1
// 456
// 789

// 147 +3
// 258
// 369

// 159 +4 
// 357 +2