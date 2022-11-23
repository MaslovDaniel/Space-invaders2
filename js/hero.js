'use strict'

function createHero(board) {
    var masterPos = {
        i: board.length - 1,
        j: Math.floor((board[0].length - 1) / 2),
    }

    gHero = {
        pos: masterPos,
        isShoot: false,
        isWin: false,
    }

    board[gHero.pos.i][gHero.pos.j].gameElement = HERO
}

function onKeyDown(ev) {
    switch (ev.key) {
        case 'ArrowLeft':
            moveHero(-1)
            break
        case 'ArrowRight':
            moveHero(1)
            break
        case ' ':
            shoot()
            break
    }

}

function moveHero(dir) {
    if (gGame.isGameOver) return

    var nextCol = gHero.pos.j + dir
    // console.log('nextCol:', nextCol)

    var nextCell = gBoard[gHero.pos.i][nextCol]
    // console.log('nextCell:', nextCell)

    if (nextCell.type !== SPACE) return

    updateCell(gHero.pos) // clear hero from where he was

    gHero.pos.j = nextCol // update model

    updateCell(gHero.pos, HERO, HERO) // update hero on his next location
}

function shoot(speed = SPEED_LASER, typeLaser = SIMPLE_LASER) {
    if (gGame.isGameOver || gHero.isShoot) return

    gHero.isShoot = true
    gNextPos = { i: gHero.pos.i - 1, j: gHero.pos.j }

    gLaserPos = gNextPos

    gLaserInterval = setInterval(() => {

        blinkLaser(gLaserPos, typeLaser)
    }, speed)
}

function blinkLaser(pos, typeLaser) {
    updateCell(pos) // update laser next positoin - Modal

    if (pos.i === 0) { // if shoot but dont hit an alien 
        clearInterval(gLaserInterval)

        gHero.isShoot = false
        return
    }

    var gNextPos = { i: pos.i - 1, j: pos.j }
    if (gBoard[gNextPos.i][gNextPos.j].gameElement === ALIEN) {

        laserHitsAlien(gNextPos)
        return
    }
    pos.i--
    updateCell(pos, typeLaser, typeLaser) // show laser next positoin 
}


function laserHitsAlien(pos) {
    clearInterval(gLaserInterval) // to hit only one alien
    updateCell(pos) // to delete the alien that was hit

    gGame.score += 10
    gGame.aliensCount++
    gHero.isShoot = false
    gGame.isHitAlien = true

    if (gGame.aliensCount === COUNT_ALIENS_COL * COUNT_ALIENS_ROW) {
        console.log('you win')
        gHero.isWin = true
          gameDone() 
    }
    document.querySelector('.score').innerText = 'score:' + gGame.score
    return
}

function gameDone() {
    clearInterval(gLaserInterval)
    gGame.isGameOver = true

    var elModal = document.querySelector('.modal')
    var msgGameDone = gHero.isWin ? 'you won!' : 'you lose!' // bug - make the msg dissapear after clicking restart

    msgGameDone += '<br><button class="restartBtn" onmousedown="restartGame()">restart</button>'
    elModal.innerHTML = msgGameDone
    elModal.style.display = 'block'
    return
}

function restartGame() {
    console.log('Click on restart game')
    clearInterval(gLaserInterval)
    init()
   
  }







