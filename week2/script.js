const gameCanvas = document.getElementById("gameCanvas");
const c = gameCanvas.getContext('2d');
const score = document.getElementById("score");
//call keypush every time a key is pressed
document.addEventListener("keydown", keyPush);

//start game interval, 10 times per second.
setInterval(gameFuntion, 100);

let gameStarted = false;

//position variables
let xPos = 0;
let yPos = 0;
let foodXPos = 5;
let foodYPos = 5;

//snake array and size
let trailArray = [];
let size = 3;

//define the grid
const gridSize = 50;
const tileCount = 10;

//speed variables 
let xSpeed = 0;
let ySpeed = 0;

function gameFuntion () {
    xPos += xSpeed;
    yPos += ySpeed;

    //wall colisions
    if (xPos < 0 || xPos > 9 || yPos < 0 || yPos > 9) {
        restart();
    }

    //fill background
    c.fillStyle = "black";
    c.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

    //draw player
    c.fillStyle = "pink";
    for (let i = 0; i < trailArray.length; i++) {
        c.fillRect(trailArray[i].x * gridSize, trailArray[i].y * gridSize, gridSize - 2, gridSize - 2);

        //make sure snake doesn't step on its own tail
            if (gameStarted && trailArray[i].x == xPos && trailArray[i].y == yPos) 
                restart();
    }

    //add new "block"
    trailArray.push({x: xPos, y: yPos});

    while(trailArray.length > size) {
        trailArray.shift();
    }

    //eat piece of food
    if (foodXPos == xPos && foodYPos == yPos) {
        size++;
        score.innerHTML = "Score: " + (size - 3);

        foodXPos = Math.floor(Math.random() * tileCount);
        foodYPos = Math.floor(Math.random() * tileCount);
        console.log(foodXPos + " " + foodYPos);
    }

    //draw food
    c.fillStyle = "blue";
    c.fillRect(foodXPos * gridSize, foodYPos * gridSize, gridSize - 2, gridSize - 2);
}

function keyPush (event) {
    if (gameStarted == false)
        gameStarted = true;

    switch (event.keyCode) {
        case 37: //left
            xSpeed = -1;
            ySpeed = 0;
            break;
        case 38: //up
            xSpeed = 0;
            ySpeed = -1;
            break;
        case 39: //right
            xSpeed = 1;
            ySpeed = 0;
            break;
        case 40: //down
            xSpeed = 0;
            ySpeed = 1;
            break;
    }
}

function restart () {
    location.reload();
}