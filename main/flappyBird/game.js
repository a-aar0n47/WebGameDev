//canvas
let canvas;
let canvasWidth = 360;
let canvasHeight = 640;
let context;

//bird
const birdWidth = 34; //width/height ratio = 408x228 = ratio of 17:12
const birdHeight = 24;
//Positions of bird
const birdX = canvasWidth / 8
const birdY = canvasHeight / 2;
//bird image
let birdImg;

const bird = {
    x: birdX,
    y: birdY,
    width: birdWidth,
    height: birdHeight
}


//pipes
let pipeArray = [];//empty array for pipe storage
const pipeWidth = 64;//width/height ratio = 384/3072 = 1/8
const pipeHeight = 512;
let pipeX = canvasWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;
window.onload = function() {//making sure page has loaded before executing any code
    canvas = document.getElementById("canvas");
    canvas.height = canvasHeight;
    canvas.width = canvasWidth
    context = canvas.getContext("2d");

    //drawing flappy bird
    //context.fillStyle = "green";
    //context.fillRect(bird.x, bird.y, bird.width, bird.height);

    //loading images
    birdImg = new Image();
    birdImg.src = "/main/flappyBird/images/flappybird.png";
    birdImg.onload = function() {
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height)
    }

    topPipeImg = new Image();
    topPipeImg.src = "/main/flappyBird/images/toppipe.png";

    bottomPipeImg = new Image();
    bottomPipeImg.src = "/main/flappyBird/images/bottompipe.png";

    requestAnimationFrame(update);
    setInterval(placePipes, 1500);//every 1.5 seconds

}

let update = () => {
    //main function for redrawing canvas
    requestAnimationFrame(update);
    //clearing previous frame after every update
    context.clearRect(0, 0, canvas.width, canvas.height);

    //bird
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    //pipes

    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
        console.log("Test!")
    }
}
let placePipes = () => {

    let topPipe = {
        img: topPipeImg,
        x: pipeX,
        y: pipeY,
        width: pipeWidth,
        height: pipeWidth,
        passed: false //if flappy bird has passed pipe
    }

    pipeArray.push(topPipe);
}