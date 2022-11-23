'use strict'

function createAliens(board = gBoard) {
    for (var i = 0; i < COUNT_ALIENS_ROW; i++) {
        for (var j = board[0].length - 1 - COUNT_ALIENS_COL; j < board[0].length - 1; j++) {
            board[i][j].gameElement = ALIEN
        }
    }
}