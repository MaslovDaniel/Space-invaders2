'use strict'

function createAliens(board = gBoard) {
    for (var i = 0; i < COUNT_ALIENS_ROW; i++) {
        for (var j = board[0].length - COUNT_ALIENS_COL; j < board[0].length; j++) {
            board[i][j].gameElement = ALIEN
        }
    }
}

function isAliensAtLeftEdge(board = gBoard, fromI, toI) {
    for (var i = fromI; i <= toI; i++) {
        if (board[i][1].gameElement === ALIEN)
         return true
    }
}

function isAliensAtRightEdge(board = gBoard, iStart, iEnd) {
    for (var i = iStart; i <= iEnd; i++) {
        if (board[i][board[0].length - 1].gameElement === ALIEN) return true
    }
}

function isRowClean(board = gBoard, row) {
    for (var j = 0; j < board.length; j++) {
        if (board[row][j].gameElement === ALIEN) return false
    }
    return true
}

function moveAllAliensLeft(board = gBoard, iStart, iEnd) {
    if (gGame.isGameOver || gGame.isFreezeMode) return
    for (var i = iStart; i >= iEnd; i--) {
        // run only the rows where have aliens,can run throw the hall gboard if dont work
        for (var j = 0; j < board[0].length; j++) {
            var pos = { i, j }
            if (board[i][j].gameElement !== ALIEN) continue; // to catch only the alien 
            if (gBoard[pos.i][pos.j - 1].gameElement === HERO) {
                  gGame.isGameOver = false
                gameDone()

            } 
            // delete alien from where he was becase display dont exist the innerHTML will be ''
            updateCell(pos)
            updateCell({ i: i, j: j - 1 }, ALIEN, ALIEN) // update alien in his next cell
        }
    }
    return
}

function moveAllAliensRight(board = gBoard, iStart, iEnd) {
    if (gGame.isGameOver || gGame.isFreezeMode) return
    for (var i = iStart; i >= iEnd; i--) {
        for (var j = board[0].length - 1; j >= 0; j--) {
            var pos = { i, j }
            if (board[i][j].gameElement !== ALIEN) continue
            if (gBoard[pos.i][pos.j + 1].gameElement === HERO) {
                gGame.isGameOver = false
                gameDone()
            } 
            updateCell(pos)
            updateCell({ i: i, j: j + 1 }, ALIEN, ALIEN)
        }
    }
    return
}

function moveAllAliensDown(board = gBoard, iStart, iEnd) {
    if (gGame.isGameOver || gGame.isFreezeMode) return
    for (var i = iStart; i >= iEnd; i--) {
        for (var j = 0; j < board[0].length; j++) {
            var pos = { i, j }
            if (board[i][j].gameElement !== ALIEN) continue
            if (board[pos.i + 1][pos.j].gameElement === HERO) {
                gGame.isGameOver = false
                gameDone()
            } 
            updateCell(pos)
            updateCell({ i: i + 1, j: j }, ALIEN, ALIEN)
        }
    }

    if (isRowClean(board, gIdxRowTop))
        gIdxRowBottom++
    return
}

function moveBoardAliensRight(board = gBoard) {
    gIntervalAliens = setInterval(() => {
        moveAllAliensRight(board, gIdxRowBottom, gIdxRowTop);

        if (isAliensAtRightEdge(board, gIdxRowTop, gIdxRowBottom)) {
            clearInterval(gIntervalAliens);gIdxRowBottom
            setTimeout(() => {
                moveAllAliensDown(board, gIdxRowBottom, gIdxRowTop)
                moveBoardAlienLeft()
            }, ALIEN_SPEED)
        }
    }, ALIEN_SPEED)
}

function moveBoardAlienLeft(board = gBoard) {
    if(gIntervalAliens)
        clearInterval(gIntervalAliens)
    gCandysInterval = setInterval(addAndRemoveCandy, 5000)
    gIntervalAliens = setInterval(() => {
        moveAllAliensLeft(board, gIdxRowBottom, gIdxRowTop);

        if (isAliensAtLeftEdge(board, gIdxRowTop, gIdxRowBottom)) {
            clearInterval(gIntervalAliens);
            setTimeout(() => {
                moveAllAliensDown(board, gIdxRowBottom, gIdxRowTop)
                moveBoardAliensRight()
            }, ALIEN_SPEED)
        }
    }, ALIEN_SPEED)
}


  
 
