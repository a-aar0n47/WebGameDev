//canvas
let canvas;
let canvasWidth = 500;
let canvasHeight = 500;
let context;

//players
let playerWidth = 10;
let playerHeight = 50;
let playerVelocityY = 0;

let player1 = {
    x: 10,
    y: canvasHeight / 2,
    width: playerWidth,
    height: playerHeight,
    velocityY: playerVelocityY
}

let player2 = {
    x: canvasWidth - playerWidth - 10,
    y: canvasHeight / 2,
    width: playerWidth,
    height: playerHeight,
    velocityY: playerVelocityY
}

//ball
let ballWidth = 10;
let ballHeight = 10
let ball = {
    x: canvasWidth / 2,
    y: canvasHeight / 2,
    width: ballWidth,
    height: ballHeight,
    velocityX: 1,
    velocityY: 2
}

let player1Score = 0;
let player2Score = 0;

window.onload = function() {
    canvas = document.getElementById("canvas");
    canvas.height = canvasHeight;
    canvas.width = canvasWidth;
    context = canvas.getContext("2d");//used for drawing on the canvas

    //draw initial player1
    context.fillStyle = "white";
    context.fillRect(player1.x, player1.y, player1.width, player1.height);

    requestAnimationFrame(update);
    document.addEventListener("keyup", movePlayer)
}

const update = () => {
    requestAnimationFrame(update);
    context.clearRect(0, 0, canvas.width, canvas.height);

    //player1
    context.fillStyle = "white";
    let nextPlayer1Y = player1.y + player1.velocityY;
    if (!outOfBounds(nextPlayer1Y)) {
        player1.y = nextPlayer1Y;
    }
    context.fillRect(player1.x, player1.y, player1.width, player1.height);

    //player2
    context.fillStyle = "white";
    let nextPlayer2Y = player2.y + player2.velocityY;
    if (!outOfBounds(nextPlayer2Y)) {
        player2.y = nextPlayer2Y;
    }
    context.fillRect(player2.x, player2.y, player2.width, player2.height);

    //ball
    context.fillStyle = "white";
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    context.fillRect(ball.x, ball.y, ball.width, ball.height);

    //if (ball touches top or bottom of canvas)
    if (ball.y <= 0 || (ball.y + ball.height >= canvasHeight)) {
        ball.velocityY *= -1;//reverse direction
    }

    //bounce the ball back
    if (detectCollision(ball, player1)) {
        if (ball.x <= player1.x + player1.width) {
            //left side of ball touches right side of player1
            ball.velocityX *= -1; //flip x position
        }
    }
    else if (detectCollision(ball, player2)) {
        if (ball.x + ballWidth >= player2.x) {
            //right side of ball touches left side of player2
            ball.velocityX *= -1;
        }
    }

    //game over
    if (ball.x < 0) {
        player2Score++;
        resetGame(-1);
    }
    else if(ball.x + ballWidth > canvasWidth) {
        player1Score++;
        resetGame(1)
    }

    //score
    context.font = "45px 'Poppins'";
    context.fillText(player1Score, canvasWidth/5, 45);
    context.fillText(player2Score, canvasWidth*4/5 - 45, 45);

    //dotted line down the middle
    for (let x = 0; x < canvas.height; x += 25) {
        //x = starting y position, draw a square every 25px down
        context.fillRect(canvas.width/2 - 10, x, 5, 5);
    }
}

const outOfBounds = (yPosition) => {
    return (yPosition < 0 || (yPosition + playerHeight) > canvasHeight);
}

const movePlayer = (e) => {
    //player1
    if (e.keyCode === 87) {//"w" key to go up
        player1.velocityY = -3;
    }
    else if (e.keyCode === 83) {//"s" key to go down
        player1.velocityY = 3;
    }

    //player2
    if (e.keyCode === 38) {//"arrowUp" to go up
        player2.velocityY = -3;
    }
    else if (e.keyCode === 40) {//"arrowDown" to go down
        player2.velocityY = 3;
    }
}

const detectCollision = (a, b) => {
    return a.x < b.x + b.width && //a's top left corner doesn't reach b's top left corner
            a.x + a.width > b.x &&//a's top right corner passes b's top left corner
            a.y < b.y + b.height &&//a's top left corner doesn't reach b's bottom left corner
            a.y + a.height > b.y//a's bottom left corner passes b's top left corner
}

const resetGame = (direction) => {
    ball = {
        x: canvasWidth / 2,
        y: canvasHeight / 2,
        width: ballWidth,
        height: ballHeight,
        velocityX: direction,
        velocityY: 2
    }
}