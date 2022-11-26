'use strict'

const SPACE = 'SPACE'
const HERO = '🧙‍♂️'
const ALIEN = '🍄'
const CANDY = '🥕'
const SIMPLE_LASER = '🔥'
const FAST_LASER = '🍃'

var SPEED_LASER = 25
var SPEED_FAST_LASER = 15
var ALIEN_SPEED = 500
var COUNT_ALIENS_ROW = 3
var COUNT_ALIENS_COL = 8
var BOARD_SIZE = 14

var gGame
var gBoard
var gHero
var gAlienLaser
var gLaserPos
var gNextPos
var gIdxRowBottom
var gIdxRowTop
var gCandysInterval
var gRocketsTriggerInterval
var gLaserInterval
var gIntervalAliens

function init() {
    gGame = { isGameOver: true, aliensCount: 0, score: 0, isHitAlien: false, isFreezeMode: false }
    gAlienLaser = { isShoot: false, isHitHero: false }
    gBoard = createBoard()
    createAliens(gBoard)
    createHero(gBoard)
    moveBoardAlienLeft()
    renderBoard(gBoard)
    gIdxRowTop = 0
    gIdxRowBottom = gIdxRowTop + COUNT_ALIENS_ROW - 1
}

function startGame() {
    gGame.isGameOver = false
}

function createMat(ROWS, COLS) {
    var mat = [];
    for (var i = 0; i < ROWS; i++) {
        var row = [];
        for (var j = 0; j < COLS; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}

function createBoard() {
    var board = createMat(BOARD_SIZE, BOARD_SIZE);
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var cell = { type: SPACE, gameElement: null };
            board[i][j] = cell;
        }
    }
    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n'

        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j]
            var cellClass = 'cell-' + i + '-' + j
            strHTML += `\t<td class="cell ${cellClass}">\n`
            if (currCell.gameElement === ALIEN) strHTML += ALIEN
            if (currCell.gameElement === HERO) strHTML += HERO

            strHTML += '\t</td>\n'
        }
        strHTML += '</tr>\n'
    }

    document.querySelector('tbody.board').innerHTML = strHTML;
}

function freezeMode(elBtn) {
    var msg = (gGame.isFreezeMode) ? 'freeze mode' : 'exit freeze'
    elBtn.innerText = msg
    gGame.isFreezeMode = !gGame.isFreezeMode
}

function fastShoot() {
    if (gHero.isShoot || gGame.isGameOver || gHero.counterFastShoot === 0)
        return

    shoot(SPEED_FAST_LASER, FAST_LASER)
    //Model
    gHero.counterFastShoot--
    //DOM
    var elSuperMode = document.querySelector('.fast-shoot')
    elSuperMode.innerHTML = 'Fast shoots left:' + gHero.counterFastShoot

}

function blowUpNegs(cellI, cellJ) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= gBoard[i].length) continue
            updateCell({ i, j }) // because display is falsy/empty the negs will dissapear 
            gGame.aliensCount++
            gGame.score += 10
            if (isAliensOnBoard === false) { // need to check if win each time we use this special skill because we can't just write gGame.aliensCount++
                gHero.isWin = true
                gameDone()
            }
        }
    }
}

function addAndRemoveCandy(board = gBoard) {
    if (gGame.isFreezeMode) return
    var coord = geRandomEmptyCellFirstRow()
    updateCell(coord, CANDY, CANDY)
    setTimeout(() => {
        clearInterval(gCandysInterval)
        updateCell(coord)
    }, 7500)
}

function hitCandy(pos) {
    updateCell(pos)
    gGame.isFreezeMode = true
    gHero.isShoot = false
    gGame.score += 50
    document.querySelector('.score').innerText = 'score:' + gGame.score
    setTimeout(() => {
        gGame.isFreezeMode = false
    }, 5000)
}

function isAliensOnBoard(board = gBoard,) {
    for (var i = 0; i < 14; i++) {
        for (var j = 0; j < 14; j++) {
            if (board[i][j].gameElement === ALIEN) return true
        }
    }
    return false
}







