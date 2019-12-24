let canvas = document.getElementById("mazecanvas");
let context = canvas.getContext("2d");
let currRectX = 425;
let currRectY = 3;
let mazeWidth = 600;
let mazeHeight = 600;
let intervalVar;

//making a second layer
let imgCanvas = document.getElementById("imgcanvas");
let imgContext = imgCanvas.getContext("2d");

//making a game piece square 
let squareHeight = 10;
let squareWidth = 10;
let squareX = 18;
let squareY = 18;

function drawPaddle() { //draws square
  // makeWhite(squareX-5, squareY-5, 20, 20);
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.beginPath();
  context.rect(squareX, squareY, squareWidth, squareHeight); //first two are position, second two is x/y size
  context.fillStyle = "#0095DD";
  context.fill();
  context.closePath();
}



function drawMazeAndRectangle(rectX, rectY) { //original maze and player piece
    let mazeImg = new Image();
    mazeImg.onload = function () {
        context.drawImage(mazeImg, 0, 0);
        // context.beginPath();
        // context.arc(403, 590, 7, 0, 2 * Math.PI, false); //this makes the goal circle, but I have it erasing the whole board so... :(
        // context.closePath();
        // context.fillStyle = '#00FF00';
        // context.fill();
    };
    drawPaddle()
    mazeImg.src = "assets/simplemaze.png";
    
}

function makeWhite(x, y, w, h) {
    // context.clearRect(0, 0, canvas.width, canvas.height)
    context.beginPath();
    context.rect(x, y, w, h);
    context.closePath();
    context.fillStyle = "white";
    context.fill();
}

canvas.addEventListener("mousemove", function(event){ //mouse control here
  canvas.style.cursor = "none"
  squareX = event.clientX 
  squareY = event.clientY  
  })

function drawImage(){ //second layer code
  let mazeImg = new Image();
    mazeImg.onload = function () {
        imgContext.drawImage(mazeImg, 0, 0);
        // imgContext.beginPath();
        // imgContext.arc(403, 590, 7, 0, 2 * Math.PI, false); 
        // imgContext.closePath();
        // imgContext.fillStyle = '#00FF00';
        // imgContext.fill();
    };
        mazeImg.src = "assets/simplemaze.png";

}

drawImage()
setInterval(drawMazeAndRectangle,1000/60)