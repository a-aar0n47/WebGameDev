let canvas;
let canvasWidth = 360;
let canvasHeight = 576;
let context;

//doodler
let doodlerWidth = 46;
let doodlerHeight = 46;
let doodlerX = (canvasWidth / 2) - (doodlerWidth / 2); //correctly positioning doodler
let doodlerY = (canvasHeight * (7/8)) - doodlerHeight;
let doodlerRightImg;
let doodlerLeftImg;

//game physics
let velocityX = 0;

//platforms
let platformArray = [];
let platformWidth = 60;
let platformHeight = 18;
let platformImg;


let doodler = {
    img: null,
    x: doodlerX,
    y: doodlerY,
    width: doodlerWidth,
    height: doodlerHeight
}


window.onload = function() {
    canvas = document.getElementById("canvas");
    canvas.height = canvasHeight;
    canvas.width = canvasWidth;
    context = canvas.getContext("2d");//used for drawing on canvas

    //loading images and drawing doodler
    doodlerRightImg = new Image();
    doodlerRightImg.src = "/main/doodleJump/images/doodler-right.png";
    doodler.img = doodlerRightImg;

    doodlerRightImg.onload = function() {
        context.drawImage(doodler.img, doodler.x, doodler.y, doodler.width, doodler.height);
    }

    doodlerLeftImg = new Image();
    doodlerLeftImg.src = "/main/doodleJump/images/doodler-left.png"

    platformImg = new Image();
    platformImg.src = "/main/doodleJump/images/platform.png"

    placePlatforms();
    requestAnimationFrame(update);
    document.addEventListener("keydown", moveDoodler);
}


const update = () => {
    requestAnimationFrame(update)
    context.clearRect(0, 0, canvas.width, canvas.height);
    //drawing doodler
    doodler.x += velocityX;

    if (doodler.x > canvasWidth) {//making it appear on different sides if it exceeds canvas width
        doodler.x = 0;
    }
    else if((doodler.x + doodler.width) < 0) {
        doodler.x = canvasWidth
    }
    context.drawImage(doodler.img, doodler.x, doodler.y, doodler.width, doodler.height);

    //drawing platforms
    for (let i = 0; i < platformArray.length; i++) {
        let platform = platformArray[i];
        context.drawImage(platform.img, platform.x, platform.y, platform.width, platform.height);
    }
}


const moveDoodler = (e) => {
    if (e.keyCode === 39 || e.keyCode == 68) {//move right using arrowRight(39) and "d"
        velocityX = 4;
        doodler.img = doodlerRightImg;
    }
    else if(e.keyCode === 37 || e.keyCode === 65) {//move left using arrowLeft and "a"
        velocityX = -4;
        doodler.img = doodlerLeftImg;
    }
}

const placePlatforms = () => {
    platformArray = []

    //starting platforms
    let platform = {
        img: platformImg,
        x: canvasWidth/2,
        y: canvasHeight - 50,
        width: platformWidth,
        height: platformHeight
    }

    platformArray.push(platform);

    platform = {
        img: platformImg,
        x: canvasWidth/2,
        y: canvasHeight - 150,
        width: platformWidth,
        height: platformHeight
    }

    platformArray.push(platform);
}