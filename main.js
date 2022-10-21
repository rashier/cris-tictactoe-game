let canvas = document.getElementById('canvas03');
let ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 600;

let player = true;
let 

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
  
  saveMove(posX, posY)
  drawXorO(posX, posY, player)
  player = !player;
}, false);

const saveMove = () => {
  return false
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
    ctx.strokeStyle = "blue";
  } else {
    ctx.arc(posX, posY, 50, 0, 2 * Math.PI);
    ctx.strokeStyle = "red";
  }

  ctx.lineWidth = 15;
  ctx.stroke();
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

