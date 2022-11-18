// Board
let score = 0;
let blockSize = 25;
let rows = 20;
let cols = 20;
let board;
let context;

// Snake head
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;
let velocityX = 0;
let velocityY = 0;
let snakeBody = [];

// Snake food
let foodX;
let foodY;

window.onload = function () {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");
    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000 / 10);
}

function update() {
    document.getElementById("scoreBoard").innerHTML = "Score: " + score;
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "crimson";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        ++score;
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    for (let i = snakeBody.length - 1; i > 0; --i) {
        snakeBody[i] = snakeBody[i - 1];
    }

    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "cornflowerblue";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    for (let i = 0; i < snakeBody.length; ++i) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    if (snakeX < 0 || snakeX >= cols * blockSize || snakeY < 0 || snakeY >= rows * blockSize) {
        context = null;
        alert("Game Over! Your score: " + score + ".\n");
        restart();
    }

    for (let i = 0; i < snakeBody.length; ++i) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            context = null;
            alert("Game Over! Your score: " + score + ".");
            restart();
        }
    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityY = 0;
        velocityX = 1;
    } else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityY = 0;
        velocityX = -1;
    }
}

function placeFood() {
    let foodPlace = false;
    if (snakeBody.length == rows * cols) {
        foodPlace == true;
        winner();
    }
    while (foodPlace == false) {
        foodPlace = true;
        foodX = Math.floor(Math.random() * cols) * blockSize;
        foodY = Math.floor(Math.random() * rows) * blockSize;
        for (let i = 0; i < snakeBody.length; ++i) {
            if (foodX == snakeBody[i][0] && foodY == snakeBody[i][1]) {
                foodPlace = false;
            }
        }
    }
}

function winner() {
    alert("Congratulations you finished the game!");
    restart();
}

function restart() {
    let btn = document.createElement("button");
    btn.className = "resetBtn";
    btn.innerHTML = "Restart Game!";
    document.getElementById("resetDiv").appendChild(btn);
    btn.onclick = function () {
        window.location.reload();
    }
}
