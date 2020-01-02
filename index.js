let canvas = document.getElementById("mazecanvas");
let context = canvas.getContext("2d");
let currRectX = 425;
let currRectY = 3;
let mazeWidth = 600;
let mazeHeight = 600;
let intervalVar = setInterval(drawMazeAndRectangle,1000/60);

function getScores(){
  return fetch('http://localhost:3000/api/v1/scores')
    .then(function (response) {return response.json() })
    .then(function (scores) {
      let table = document.getElementById("scoretable")
      scores.forEach(function (score){
        let scoreTr = document.createElement("tr")
        let nameTd = document.createElement("td")
        let scoreTd = document.createElement("td")
        table.appendChild(scoreTr)
        nameTd.innerText = `${score.player}`
        scoreTd.innerText = `${score.score}`
        scoreTr.appendChild(nameTd)
        scoreTr.appendChild(scoreTd)
      })
      sortTableClick()
    })
}
getScores()

// Sort Table
const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;
const comparer = (idx, asc) => (a, b) => ((v1, v2) => 
    v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
    )(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));

document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
    const table = th.closest('table');
    Array.from(table.querySelectorAll('tr:nth-child(n+2)'))
        .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
        .forEach(tr => table.appendChild(tr) );
})));

function sortTableClick() {
    let tableHead = document.getElementsByTagName( 'th' )[1]
    tableHead.click()
    tableHead.click()

};


// function sortList(ul){
//     var newUl = ul.cloneNode(false);

//     // Add all lis to an array
//     var lis = [];
//     for(var i = ul.childNodes.length; i--;){
//         if(ul.childNodes[i].nodeName === 'LI')
//             lis.push(ul.childNodes[i]);
//     }
//     console.log(lis[0])
//     // Sort the lis in descending order
//     lis.sort(function(a, b){
//        return parseInt(b.childNodes[0].data , 10) - 
//               parseInt(a.childNodes[0].data , 10);
//     });

//     // Add them into the ul in order
//     for(var i = 0; i < lis.length; i++)
//         newUl.appendChild(lis[i]);
//     ul.parentNode.replaceChild(newUl, ul);
// }

//making a second layer
let imgCanvas = document.getElementById("imgcanvas");
let imgContext = imgCanvas.getContext("2d");
//making a game piece square 
let squareHeight = 10;
let squareWidth = 10;
let squareX = 285;
let squareY = 0;
// score/timer
let scoreNum = 0
let scoreCounter = document.getElementById("score")
let hax = 0 //cheat detection

// warnings
let wallWarning = document.getElementById("warn")
let wallBreak = document.getElementById("wallbreak")

//draws gameplay avatar/game piece/ etc
function drawPaddle() { 
    // context.clearRect(0, 0, canvas.width, canvas.height)
    // makeWhite(0, 0, canvas.width, canvas.height) //maybe make this work? might help our errors.
  context.beginPath();
  context.rect(squareX, squareY, squareWidth, squareHeight); //first two are position, second two is x/y size
  context.fillStyle = "#0095DD";
  context.fill();
  context.closePath();
}

//creating score counter
let scoreHolder = document.createElement("div")
scoreCounter.appendChild(scoreHolder)


function drawMazeAndRectangle(rectX, rectY) { //original maze and player piece
    let mazeImg = new Image();
    mazeImg.onload = function (){ 
        context.drawImage(mazeImg, 0, 0);
        context.beginPath();
        context.arc(403, 590, 7, 0, 2 * Math.PI, false); //this makes the goal circle, but I have it erasing the whole board so... :        // context.closePath();
        context.fillStyle = '#00FF00';
        context.fill(); 
    }
    scoreNum += 1
    scoreHolder.innerText = `Seconds: ${(scoreNum/60).toFixed(2)}` //updates our score here. currently in seconds. (stretch goal, countdown time meter?)
    mazeImg.crossOrigin = "Anonymous";
    mazeImg.src = "https://cors-anywhere.herokuapp.com/https://freesvg.org/img/simplemaze.png"
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

  function drawImage(){ //second layer code
  let mazeImg = new Image();
  // mazeImg.crossOrigin = "Anonymous";
    mazeImg.onload = function () {
        makeWhite(0, 0, canvas.width, canvas.height)
        imgContext.drawImage(mazeImg, 0, 0);
        imgContext.beginPath();
        imgContext.arc(403, 590, 7, 0, 2 * Math.PI, false); 
        imgContext.closePath();
        imgContext.fillStyle = '#00FF00';
        imgContext.fill();
    };
        mazeImg.crossOrigin = "Anonymous";
        mazeImg.src = "https://cors-anywhere.herokuapp.com/https://freesvg.org/img/simplemaze.png"
        ;
}

// can move code

function canMoveTo(squareX, squareY) {
  let imgData = context.getImageData(squareX, squareY, squareWidth, squareHeight);
  let data = imgData.data;
  let canMove = 1; // 1 means: the rectangle can move
  if (squareX >= 0 && squareX <= mazeWidth - 15 && squareY >= 0 && squareY <= mazeHeight - 15) { // check whether the rectangle would move inside the bounds of the canvas
      for (var i = 0; i < 4 * 10 * 10; i += 4) { // look at all pixels
          if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 0) { // black
              canMove = 0; // 0 means: the rectangle can't move
              wallWarning.innerText = "WALL HIT 2x PENALITY TIME" // wall touch warning
              scoreNum += 9 // speeds up timer to penailize walls
              break;
          }
          else if (data[i] === 0 && data[i + 1] === 255 && data[i + 2] === 0) { // lime: #00FF00
              canMove = 2; // 2 is win condition, hitting green
              break;
          }
      }
  }
  else {
      canMove = 1;
  }
  return canMove;
}

canvas.addEventListener("mousemove", function(event){ //mouse control here
    movingAllowed = canMoveTo(event.clientX -5 , event.clientY-30);
    let xSpeed = Math.abs((event.clientX -5) - squareX) //OOB checking
    let ySpeed = Math.abs((event.clientY-30) - squareY)
    console.log(hax)
    canvas.style.cursor = "crosshair"
        if (movingAllowed === 1){
            squareX = event.clientX - 5 
            squareY = event.clientY - 30 // have to reposition the y value now that we moved 
            wallWarning.innerText = " " 
        }
        else if (movingAllowed === 2) { // 2 meants it hit a green section (aka the end)
            clearInterval(intervalVar); // somehow this works? gotta investigate.
            scoreHolder.innerText = `HURRAY YOU WON! YOUR TIME WAS: ${(scoreNum/60).toFixed(2)}`
              let form = document.getElementById("myForm")
                  form.style.display = "block"
              let scoretime = document.getElementById("scoretime")
                    if (hax >= 20) {
                    scoretime.placeholder = `TRY AGAIN`
                    } else {
                    scoretime.placeholder = `${((scoreNum/60)+hax).toFixed(2)}` //1 second penality per wall break
                    }
        }
        else if (movingAllowed=== 0 && (xSpeed >28 || ySpeed >28)){
         console.log("ya cheated ya dingus")
         hax += 1
         wallBreak.innerText = `Wall Break Warning! ${20 - hax} lives left!` //wallbreak warning
            if (hax > 20){
                wallBreak.innerText = 'Try again! :('
            }
        // window.alert("TRY AGAIN YOU FILTHY CHEATER")
        }
    })


document.addEventListener("submit", function(e){
    e.preventDefault()
    scoreTime = e.target[0].placeholder
    name = e.target[1].value
   
    fetch('http://localhost:3000/api/v1/scores', {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      body: JSON.stringify({player: name, score: scoreTime})
    })
    .then(response => console.log(response))
    .then(getScores)
    document.getElementById("myForm").style.display = "none";
})

//
    
drawImage()

//gabe score is around 100 seconds

/* old anti-hax code
else if (movingAllowed === 2) { // 2 meants it hit a green section (aka the end)
        clearInterval(intervalVar); // somehow this works? gotta investigate.
        scoreHolder.innerText = `HURRAY YOU WON! YOUR TIME WAS: ${(scoreNum/60).toFixed(2)}`
          let form = document.getElementById("myForm")
              form.style.display = "block"
          let scoretime = document.getElementById("scoretime")
                if (hax >= 20) {
                scoretime.placeholder = `TRY AGAIN LOSER`
                } else {
                scoretime.placeholder = `${(scoreNum/60).toFixed(2)}`
                }
*/