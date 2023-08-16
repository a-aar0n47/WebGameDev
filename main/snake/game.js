
//canvas
const blockSize = 25;
let rows = 20;
let cols = 20;
let canvas;
let context; 

//snake head
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let velocityX = 0;
let velocityY = 0;

let snakeBody = [];

//food
let foodX;
let foodY;


let score = 0;
let gameOver = false;
let gameOverMsg = "Game Over: Press 'Space' to restart";

window.onload = () => {
    canvas = document.getElementById("canvas");
    canvas.height = rows * blockSize;
    canvas.width = cols * blockSize;
    context = canvas.getContext("2d"); //used for drawing on the canvas

    placeFood();
    document.addEventListener("keyup", changeDirection);
    // update();
    setInterval(update, 1000/10); //100 milliseconds
}

const update = () => {
    if (gameOver) {
        return;
    }

    context.fillStyle="black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle="red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        score += 1;
    }

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle="lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //game over conditions
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver = true;
        //alert("Game Over");
        context.fillStyle = "red";
        context.font = '22.5px "Poppins"';
        context.fillText(gameOverMsg, 75, 195);
        document.addEventListener("keyup", restartGame);
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            context.fillStyle = "red";
            context.font = '22.5px "Poppins"';
            context.fillText(gameOverMsg, 75, 195);
            document.addEventListener("keyup", restartGame)
        }
    }
    context.fillStyle = "white";
    context.font = "23px 'Roboto'";
    context.fillText(score, 15, 20);
}

const changeDirection = (e) => {
    if (e.keyCode === 38 && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.keyCode === 40 && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.keyCode === 37 && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.keyCode === 39 && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}


const placeFood = () =>{
    //(0-1) * cols -> (0-19.9999) -> (0-19) * 25
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

const restartGame = (e) => {
    if (e.keyCode === 32) {
        location.reload();
    }
}