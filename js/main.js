'use strict'

const SPACE = 'SPACE'
const FLOOR = 'FLOOR'

const HERO = '🧙‍♂️'
const ALIEN = '🍄'

const SIMPLE_LASER = '🔥'
var SPEED_LASER = 25
var gLaserInterval

var COUNT_ALIENS_ROW = 3
var COUNT_ALIENS_COL = 8
var BOARD_SIZE = 14

var gGame
var gBoard
var gHero
var gLaserPos
var gNextPos

function init() {
    gGame = { isGameOver: false, aliensCount: 0, score: 0, isHitAlien: false, }
    gBoard = createBoard()
    // console.log('gBoard:', gBoard)
    createAliens(gBoard)
    createHero(gBoard)
    renderBoard(gBoard)

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
            if (currCell === FLOOR) cellClass += ' floor'

            strHTML += `\t<td class="cell ${cellClass}">\n`
            if (currCell.gameElement === ALIEN) strHTML += ALIEN
            if (currCell.gameElement === HERO) strHTML += HERO

            strHTML += '\t</td>\n'
        }
        strHTML += '</tr>\n'
    }

    // console.log('strHTML:', strHTML)
    document.querySelector('tbody.board').innerHTML = strHTML;
}

// function handleKey(ev) {
//     switch (ev.key) {
//         case 'ArrowLeft':
//             moveHero(-1)
//             break
//         case 'ArrowRight':
//             moveHero(1)
//             break
//         case ' ':
//             shoot()
//             break
//     }

// }