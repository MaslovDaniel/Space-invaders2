'use strict'

function updateCell(pos, gameElement = null, display = '') {
  // update Model
  gBoard[pos.i][pos.j].gameElement = gameElement
  // update Dom
  var selectorCell = '.cell-' + pos.i + '-' + pos.j
  document.querySelector(selectorCell).innerHTML = display
}

function geRandomEmptyCellFirstRow(board = gBoard, row = 0) {
  var emptyCoords = []
  for (var j = 0; j < board[0].length; j++) {
    var currCell = board[row][j]
    if (currCell.gameElement === null && currCell.type === SPACE) {
      var coord = { i: row, j: j }
      emptyCoords.push(coord);
    } else {
      continue
    }
  }
  return emptyCoords[getRandomInt(0, emptyCoords.length)];
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}




