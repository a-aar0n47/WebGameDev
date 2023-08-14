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
let velocityY = 0;//doodler jump speed
let initialVelocityY = -8;//starting velocity Y
let gravity = 0.4

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
    velocityY = initialVelocityY;

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
    
    velocityY += gravity;
    doodler.y += velocityY

    context.drawImage(doodler.img, doodler.x, doodler.y, doodler.width, doodler.height);
    //drawing platforms
    for (let i = 0; i < platformArray.length; i++) {
        let platform = platformArray[i];
        if (velocityY < 0 && doodler.y < canvasHeight*3/4) {
            platform.y -= initialVelocityY;//slide platform down
        }
        if (detectCollision(doodler, platform) && velocityY >= 0) {
            velocityY = initialVelocityY;//jumping when it hits the platform
        }
        context.drawImage(platform.img, platform.x, platform.y, platform.width, platform.height);
    }

    //clear platforms and add new ones
    while (platformArray.length > 0 && platformArray[0].y >= canvasHeight) {
        platformArray.shift();//removes first element from the array
        newPlatform()
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

    /*
    platform = {
        img: platformImg,
        x: canvasWidth/2,
        y: canvasHeight - 150,
        width: platformWidth,
        height: platformHeight
    }
    platformArray.push(platform);
    */

   //randomized platform generation
   for (let i = 0; i < 6; i++) {
    let randomX = Math.floor(Math.random() * (canvasWidth*(3/4)));//(0-1) * canvasWidth*(3/4)
    let platform = {
        img: platformImg,
        x: randomX,
        y: canvasHeight - 75 * i - 150,
        width: platformWidth,
        height: platformHeight
    }

    platformArray.push(platform);
   }
}

const newPlatform = () => {
    let randomX = Math.floor(Math.random() * (canvasWidth*(3/4)));//(0-1) * canvasWidth*(3/4)
    let platform = {
        img: platformImg,
        x: randomX,
        y: -platformHeight,
        width: platformWidth,
        height: platformHeight
    }

    platformArray.push(platform);
}

const detectCollision = (a, b) => {
    return a.x < b.x + b.width &&//a's top left corner doesn't reach be's top right corner
            a.x + a.width > b.x &&//a's top right corner passes b's top left corner
            a.y < b.y + b.height &&//a's top left corner doesn't reach b's bottom left corner
            a.y + a.height > b.y;//a's bottom left corner passes b's top left corner
}