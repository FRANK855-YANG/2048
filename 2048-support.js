function getNumberCellBackgroundColor(number) {
    switch (number) {
        case 0: return "#ccc0b3"; break;
        case 2: return "#eee4de"; break;
        case 4: return "#ede0c8"; break;
        case 8: return "#f2b179"; break;
        case 16: return "#f59563"; break;
        case 32: return "#f67c5f"; break;
        case 64: return "#f65e3b"; break;
        case 128: return "#edcf72"; break;
        case 256: return "#edcc61"; break;
        case 512: return "#9c0"; break;
        case 1024: return "#33b5e5"; break;
        case 2048: return "#09c"; break;
    }

    return "black";
}

function getNumberColor(number) {
    if (number <= 4) {
        return "#776E65";
    }
    else {
        return "white";
    }
}

function noSpace(board) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] == 0) {
                return false;
            }
        }
    }
    return true;
}

function canMoveLeft(board) {
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i][j - 1] == 0 || board[i][j] == board[i][j - 1]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveUp(board) {
    for (let i = 1; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i - 1][j] == 0 || board[i][j] == board[i - 1][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveRight(board) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] != 0) {
                if (board[i][j + 1] == 0 || board[i][j] == board[i][j + 1]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveDown(board) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i + 1][j] == 0 || board[i][j] == board[i + 1][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function isBlockLeft(i, j, k, board) {
    for (let a = k + 1; a < j; a++) {
        if (board[i][a] != 0) {
            return true;
        }
        else {
            return false;
        }
    }
}

function isBlockUp(i, j, k, board) {
    for (let a = k + 1; a < i; a++) {
        if (board[a][j] != 0) {
            return true;
        }
        else {
            return false;
        }
    }
}

function isBlockRight(i, j, k, board) {
    for (let a = j + 1; a < k; a++) {
        if (board[i][a] != 0) {
            return true;
        }
        else {
            return false;
        }
    }
}

function isBlockDown(i, j, k, board) {
    for (let a = i + 1; a < k; a++) {
        if (board[a][j] != 0) {
            return true;
        }
        else {
            return false;
        }
    }
}

function isGameOver(board) {
    if (!canMoveLeft(board) && !canMoveUp(board) && !canMoveRight(board) && !canMoveDown(board) && noSpace(board)) {
        alert("GAME OVER!");
    }
    return true;
}