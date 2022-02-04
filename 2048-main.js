let board = new Array();
let score = 0;
let isRepeat = new Array();

$(document).ready(function () {
    newgame();
})

function newgame() {
    init();
    addNumber();
    addNumber();
}

function init() {
    for (let i = 0; i < 4; i++) {
        board[i] = new Array();
        isRepeat[i] = new Array();
        for (let j = 0; j < 4; j++) {
            board[i][j] = 0;
            isRepeat[i][j] = false;
        }
    }
    score = 0;
    changeNumberBoard();
}

function changeNumberBoard() {
    $(".numberCell").remove();
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            $("section").append(`<div class="numberCell" id=numbercell-${i}-${j}></div>`);
            let numberCell = $(`#numbercell-${i}-${j}`);

            if (board[i][j] == 0) {
                numberCell.css("width", "0px");
                numberCell.css("height", "0px");
                numberCell.css("top", 70 + i * 120);
                numberCell.css("left", 70 + j * 120);
            }
            else {
                numberCell.css("width", "100px");
                numberCell.css("height", "100px");
                numberCell.css("top", 20 + i * 120);
                numberCell.css("left", 20 + j * 120);
                numberCell.css("background-color", getNumberCellBackgroundColor(board[i][j]));
                numberCell.css("color", getNumberColor(board[i][j]));
                numberCell.text(board[i][j]);
                if (board[i][j] >= 1024) {
                    numberCell.css("font-size", "30px");
                }
                isRepeat[i][j] = false;
            }
        }
    }
    $("#score").text(score);
}

function addNumber() {
    if (noSpace(board)) {
        return false;
    }
    else {
        let ranx = parseInt(Math.floor(Math.random() * 4));
        let rany = parseInt(Math.floor(Math.random() * 4));
        while (true) {
            if (board[ranx][rany] == 0) {
                break;
            }
            else {
                ranx = parseInt(Math.floor(Math.random() * 4));
                rany = parseInt(Math.floor(Math.random() * 4));
            }
        }
        let randomNumber = Math.random() < 0.5 ? 2 : 4;
        board[ranx][rany] = randomNumber;
        showAnimation(ranx, rany, randomNumber);
    }
}

$(document).keydown(function (event) {
    switch (event.keyCode) {
        case 37:
            if (canMoveLeft(board)) {
                moveLeft();
                addNumber();
                setTimeout(() => { isGameOver(board); }, 666);
            }
            break;
        case 38:
            if (canMoveUp(board)) {
                moveUp();
                addNumber();
                setTimeout(() => { isGameOver(board); }, 666);
            }
            break;
        case 39:
            if (canMoveRight(board)) {
                moveRight();
                addNumber();
                setTimeout(() => { isGameOver(board); }, 666);
            }
            break;
        case 40:
            if (canMoveDown(board)) {
                moveDown();
                addNumber();
                setTimeout(() => { isGameOver(board); }, 666);
            }
            break;
        default:
            break;
    }
})

function moveLeft() {
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                for (let k = 0; k < j; k++) {
                    if (board[i][k] == 0 && !isBlockLeft(i, j, k, board)) {
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        showAnimation2(i, j, i, k);
                        continue;
                    }
                    else if (board[i][k] == board[i][j] && !isBlockLeft(i, j, k, board) && !isRepeat[i][k]) {
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        showAnimation2(i, j, i, k);
                        score += board[i][k];
                        isRepeat[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(() => { changeNumberBoard() }, 200);
}

function moveUp() {
    for (let i = 1; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                for (let k = 0; k < i; k++) {
                    if (board[k][j] == 0 && !isBlockUp(i, j, k, board)) {
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        showAnimation2(i, j, k, j);
                        continue;
                    }
                    else if (board[k][j] == board[i][j] && !isBlockUp(i, j, k, board) && !isRepeat[k][j]) {
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        showAnimation2(i, j, k, j);
                        score += board[k][j];
                        isRepeat[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(() => { changeNumberBoard() }, 200);
}

function moveRight() {
    for (let i = 0; i < 4; i++) {
        for (let j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                for (let k = 3; k > j; k--) {
                    if (board[i][k] == 0 && !isBlockRight(i, j, k, board)) {
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        showAnimation2(i, j, i, k);
                        continue;
                    }
                    else if (board[i][k] == board[i][j] && !isBlockRight(i, j, k, board) && !isRepeat[i][k]) {
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        showAnimation2(i, j, i, k);
                        score += board[i][k];
                        isRepeat[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(() => { changeNumberBoard() }, 200);
}

function moveDown() {
    for (let i = 2; i >= 0; i--) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                for (let k = 3; k > i; k--) {
                    if (board[k][j] == 0 && !isBlockDown(i, j, k, board)) {
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        showAnimation2(i, j, k, j);
                        continue;
                    }
                    else if (board[k][j] == board[i][j] && !isBlockDown(i, j, k, board) && !isRepeat[k][j]) {
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        showAnimation2(i, j, k, j);
                        score += board[k][j];
                        isRepeat[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(() => { changeNumberBoard() }, 200);
}