
//canvas
const cvs = document.getElementById("snake");

const ctx = cvs.getContext("2d");

// create the unit
const box = 32;

// load images

const ground = new Image();
ground.src = "img/suelo.jpg";

const foodImg = new Image();
foodImg.src = "img/food.png";

const snakeHead = new Image();
snakeHead.src = "img/cabeza.png";

const snakeBody = new Image();
snakeBody.src = "img/pngegg.png";

// load audio files

const dead = new Audio();
const eat = new Audio();
const move = new Audio();


dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
move.src = "audio/move.mp3";


// create snake

let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box,
};

// create the food
let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box,
};

// Create the score var
let score = 0;
let highScore = 0;

// get level
let levels = {
  easy: 150,
  medium: 100,
  hard: 70,
};

let level = levels.easy;

if (localStorage.getItem("snakeLevel")) {
  let storedLevel = JSON.parse(localStorage.getItem("snakeLevel"));
  level = levels[storedLevel];
}

// control the snake
document.addEventListener("keydown", direction);

let d;

function direction(event) {
  if (event.keyCode == 37 && d != "RIGHT" && d != "LEFT") {
    move.play();
    d = "LEFT";
  } else if (event.keyCode == 38 && d != "DOWN" && d != "UP") {
    move.play();
    d = "UP";
  } else if (event.keyCode == 39 && d != "LEFT" && d != "RIGHT") {
    move.play();
    d = "RIGHT";
  } else if (event.keyCode == 40 && d != "UP" && d != "DOWN") {
    move.play();
    d = "DOWN";
  }
}

// check collision
function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      return true;
    }
  }
  return false;
}

// draw everything to the canvas

let game = setInterval(draw, level);

function draw() {
    
  ctx.drawImage(ground, 0, 0);
  ctx.fillStyle = "#4E8A5E";
  ctx.fillRect(0, 0, 19 * box, 3 * box);
  ctx.fillRect(0, 0, 1 * box, 19 * box);
  ctx.fillRect(18 * box, 0, 1 * box, 19 * box);
  ctx.fillRect(0, 18 * box, 19 * box, 1 * box);

  for (let i = 0; i < snake.length; i++) {
    if (i == 0) {
      ctx.drawImage(snakeHead, snake[i].x, snake[i].y, box, box);
    } else {
      ctx.drawImage(snakeBody, snake[i].x, snake[i].y, box, box);
    }
  }
  ctx.drawImage(foodImg, food.x, food.y, box, box);

  // old head position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // which direction
  if (d == "LEFT") snakeX -= box;
  if (d == "UP") snakeY -= box;
  if (d == "RIGHT") snakeX += box;
  if (d == "DOWN") snakeY += box;

  // if the snake eats the food
  if (snakeX == food.x && snakeY == food.y) {
    // here we don't remove the tail
    score++;
    
    eat.play();
    if (!localStorage.getItem("snakeHighScore")) {
      localStorage.setItem("snakeHighScore", JSON.stringify(score));
    } else {
      highScore = JSON.parse(localStorage.getItem("snakeHighScore"));
      if (score > highScore) {
        localStorage.setItem("snakeHighScore", JSON.stringify(score));
      }
    }

    if (localStorage.getItem("snakeHighScore" + level)) {
      if (score > localStorage.getItem("snakeHighScore" + level)) {
        localStorage.setItem("snakeHighScore" + level, JSON.stringify(score));
      }
    } else {
      localStorage.setItem("snakeHighScore" + level, JSON.stringify(score));
    }
    // check if the new food position is in the snake array

    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box,
    };
  } else {
    // remove the tail
    snake.pop();
  }

  // add a new head

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  // game over rules

  if (
    snakeX < box ||
    snakeX > 17 * box ||
    snakeY < 3 * box ||
    snakeY > 17 * box ||
    collision(newHead, snake)
  ) {
     
    dead.play();
    clearInterval(game);
      Swal.fire({
          title: `GAME OVER. \n Score ${score}`,
          icon: 'error',
          confirmButtonText : 'Back to menu',
          showCancelButton: true,
          cancelButtonText: 'Restart',
          
      }). then((result) => {
          if(result.value){
                window.location.href = "index.html"
             }
          else{
                window.location.href = "play.html"

          }
      });
   
  }
  snake.unshift(newHead);

  ctx.fillStyle = "white";
  ctx.font = "45px Changa one";
  ctx.fillText(score, 2 * box, 2 * box);
  ctx.fillStyle = "white";
  ctx.font = "30px Changa one";
  ctx.fillText("Score", 4 * box, 2 * box);
  ctx.textAlign = "center";    
}
