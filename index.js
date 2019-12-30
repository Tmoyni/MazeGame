let canvas = document.getElementById("mazecanvas");
let context = canvas.getContext("2d");
let currRectX = 425;
let currRectY = 3;
let mazeWidth = 600;
let mazeHeight = 600;
let intervalVar;

function getMaze1(){
  return fetch()
}

function getScores(){
  return fetch('http://localhost:3000/api/v1/scores')
    .then(function (response) {return response.json() })
    .then(function (scores) {
      let ul = document.getElementById("scores")
      scores.forEach(function (score){
        let scoreLi = document.createElement("li")
        scoreLi.innerText = `
        Name: ${score.player} - Score: ${score.score}
        `
        ul.appendChild(scoreLi)
        console.log(scoreLi)
      })
    })
}
getScores()

//making a second layer
let imgCanvas = document.getElementById("imgcanvas");
let imgContext = imgCanvas.getContext("2d");

//making a game piece square 
let squareHeight = 10;
let squareWidth = 10;
let squareX = 18;
let squareY = 18;

function drawPaddle() { //draws square

  context.clearRect(0, 0, canvas.width, canvas.height)
  context.beginPath();
  context.rect(squareX, squareY, squareWidth, squareHeight); //first two are position, second two is x/y size
  context.fillStyle = "#0095DD";
  context.fill();
  context.closePath();
  
}



function drawMazeAndRectangle(rectX, rectY) { //original maze and player piece
    let mazeImg = new Image();
    // mazeImg.crossOrigin = "Anonymous";
    mazeImg.onload = function () {
        // context.drawImage(mazeImg, 0, 0);
        // context.beginPath();
        // context.arc(403, 590, 7, 0, 2 * Math.PI, false); //this makes the goal circle, but I have it erasing the whole board so... :(
        // context.closePath();
        // context.fillStyle = '#00FF00';
        // context.fill();

    }
    mazeImg.src = "http://localhost:3000/app/assets/simplemaze.png"
    // canMoveTo(squareX, squareY)
    drawPaddle()
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
  // mazeImg.crossOrigin = "Anonymous";
    mazeImg.onload = function () {
        imgContext.drawImage(mazeImg, 0, 0);
        imgContext.beginPath();
        imgContext.arc(403, 590, 7, 0, 2 * Math.PI, false); 
        imgContext.closePath();
        imgContext.fillStyle = '#00FF00';
        imgContext.fill();
    };
        mazeImg.src = "assets/simplemaze.png";

}



// can move code
// function canMoveTo(squareX, squareY) {
// //   var imgData = context.getImageData(squareX, squareY, 10, 10);
//   var data = imgData.data;
//   var canMove = 1; // 1 means: the rectangle can move
//   if (squareX >= 0 && squareX <= mazeWidth - 15 && squareY >= 0 && squareY <= mazeHeight - 15) { // check whether the rectangle would move inside the bounds of the canvas
//       for (var i = 0; i < 4 * 15 * 15; i += 4) { // look at all pixels
//           if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 0) { // black
//               canMove = 0; // 0 means: the rectangle can't move
//               break;
//           }
//           else if (data[i] === 0 && data[i + 1] === 255 && data[i + 2] === 0) { // lime: #00FF00
//               canMove = 2; // 2 means: the end point is reached
//               break;
//           }
//       }
//   }
//   else {
//       canMove = 0;
//   }
//   console.log(canMove)
//   return canMove;

  
// }
drawImage()
setInterval(drawMazeAndRectangle,1000/60)

/*
Access to image at from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https.
*/