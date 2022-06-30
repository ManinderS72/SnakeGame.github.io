const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

class snakePortion {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let speed = 10;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;

let headX = 5;
let headY = 5;
const snakeParts = [];
let tailLength = 2;

let foodX = 2;
let foodY = 2;

let inputsXvel = 0;
let inputsYvel = 0;

let xVel = 0;
let yVel = 0;

let score = 0;


// GAME LOOP 
function drawGame() {
  xVel = inputsXvel;
  yVel = inputsYvel;

  ChangeSnakeCoordinates();
  let result = isGameOver();
  if (result) {
    return;
  }

  clearScreen();

  checkAppleCollision();
  drawFood();
  drawSnake();

  drawScore();

  if (score > 4) {
    speed = 11;
  }
  if (score > 8) {
    speed = 13;
  }

  if(score >12){
      speed = 15;
  }

  if(score > 15){
      speed = 17;
  }

  setTimeout(drawGame, 1000 / speed);
}

function isGameOver() {
  let gameOver = false;

  if (yVel === 0 && xVel === 0) {
    return false;
  }

  // WALLS 
  if (headX < 0) {
    gameOver = true;
  } else if (headX === tileCount) {
    gameOver = true;
  } else if (headY < 0) {
    gameOver = true;
  } else if (headY === tileCount) {
    gameOver = true;
  }

  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    if (part.x === headX && part.y === headY) {
      gameOver = true;
      break;
    }
  }

  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "30px Helvetica";

    if (gameOver) {
      ctx.fillStyle = "white";
      ctx.font = "30px Helvetica";


      ctx.fillText("Game Over! TRY Again :) ", canvas.width / 13.5, canvas.height / 2);
    }

    ctx.fillText("Game Over! TRY Again :)", canvas.width / 13.5, canvas.height / 2);
  }

  return gameOver;
}

function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "10px Helvetica";
  ctx.fillText("Score " + score, canvas.width - 50, 10);
}

function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  ctx.fillStyle = "blue";
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }

  snakeParts.push(new snakePortion(headX, headY)); //put an item at the end of the list next to the head
  while (snakeParts.length > tailLength) {
    snakeParts.shift(); // remove the further item from the snake parts if have more than our tail size.
  }

  ctx.fillStyle = "red";
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function ChangeSnakeCoordinates() {
  headX = headX + xVel;
  headY = headY + yVel;
}

function drawFood() {
  ctx.fillStyle = "yellow";
  ctx.fillRect(foodX * tileCount, foodY * tileCount, tileSize, tileSize);
}

function checkAppleCollision() {
  if (foodX === headX && foodY == headY) {
    foodX = Math.floor(Math.random() * tileCount);
    foodY = Math.floor(Math.random() * tileCount);
    tailLength++;
    score++;
   
  }
}

document.body.addEventListener("keydown", keyDown);

function keyDown(event) {
  // if we click UP key 
  if (event.keyCode == 38 ) {
    
    if (inputsYvel == 1) return;
    inputsYvel = -1;
    inputsXvel = 0;
  }

  // if we click DOWN key
  if (event.keyCode == 40) {
  
    if (inputsYvel == -1) return;
    inputsYvel = 1;
    inputsXvel = 0;
  }

  //if we click LEFT key
  if (event.keyCode == 37) {
   
    if (inputsXvel == 1) return;
    inputsYvel = 0;
    inputsXvel = -1;
  }

  //if we click RIGHT key
  if (event.keyCode == 39) {
   
    if (inputsXvel == -1) return;
    inputsYvel = 0;
    inputsXvel = 1;
  }
}

drawGame();