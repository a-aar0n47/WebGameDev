let canvas;
let canvasWidth = 360;
let canvasHeight = 576;
let context;

//doodler
let doodlerWidth = 46;
let doodlerHeight = 46;
let doodlerX = (canvasWidth / 2) - (doodlerWidth / 2);
let doodlerY = (canvasHeight * (7/8)) - doodlerHeight;
let doodlerRightImg;
let doodlerLeftImg;

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
}