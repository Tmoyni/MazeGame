let canvas = document.getElementById("mazecanvas");
let context = canvas.getContext("2d");
let currRectX = 425;
let currRectY = 3;
let mazeWidth = 600;
let mazeHeight = 600;
let intervalVar;


function drawMazeAndRectangle(rectX, rectY) {
    makeWhite(0, 0, canvas.width, canvas.height);
    var mazeImg = new Image();
    mazeImg.onload = function () {
        context.drawImage(mazeImg, 0, 0);
        context.beginPath();
        context.arc(403, 590, 7, 0, 2 * Math.PI, false);
        context.closePath();
        context.fillStyle = '#00FF00';
        context.fill();
        
    };
    mazeImg.src = "https://freesvg.org/img/simplemaze.png";
}

canvas.addEventListener("mousemove", function(event) {
    myFunction(event);
  });
  
  function myFunction(e) {
    var x = e.clientX;
    var y = e.clientY;
    console.log(x, y)
  }

function makeWhite(x, y, w, h) {
    context.beginPath();
    context.rect(x, y, w, h);
    context.closePath();
    context.fillStyle = "white";
    context.fill();
}
drawMazeAndRectangle(425, 3);
