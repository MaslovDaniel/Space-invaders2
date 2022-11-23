'use strict'

function updateCell(pos, gameElement = null, display = '') {
    // update Model
    gBoard[pos.i][pos.j].gameElement = gameElement
  
    // update Dom
    var selectorCell = '.cell-' + pos.i + '-' + pos.j
    document.querySelector(selectorCell).innerHTML = display
  
  }