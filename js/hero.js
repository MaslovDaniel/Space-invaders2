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
        counterFastShoot: 3
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
        case 'n':
            if (gGame.isHitAlien) blowUpNegs(gNextPos.i, gNextPos.j)
            console.log('blow up negs')
            break
        case 'x':
            console.log('fast shoot')
            fastShoot()
            break
    }
}

function moveHero(dir) {
    if (gGame.isGameOver) return
    var nextCol = gHero.pos.j + dir
    var nextCell = gBoard[gHero.pos.i][nextCol]
    if (nextCell.type !== SPACE) return // stay on board
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

function blinkLaser(pos, typeLaser) { // when we use the functoin we give it the next pos according to the hero locatoin
    updateCell(pos) // update laser next positoin - Modal
    if (pos.i === 0) { // if shoot but dont hit an alien 
        clearInterval(gLaserInterval) // to shoot only one laser each time 
        gHero.isShoot = false // if hero miss the target he will be able to shoot again
        return
    }
    var gNextPos = { i: pos.i - 1, j: pos.j }
    if (gBoard[gNextPos.i][gNextPos.j].gameElement === ALIEN) {
        clearInterval(gLaserInterval)
        laserHitsAlien(gNextPos)
        return
    } else if (gBoard[gNextPos.i][gNextPos.j].gameElement === CANDY) {
        clearInterval(gLaserInterval);
        hitCandy(gNextPos)
        return
    }
    pos.i-- // move the laser on the I of the player
    updateCell(pos, typeLaser, typeLaser) // show laser next positoin 
}


function laserHitsAlien(pos) {
    clearInterval(gLaserInterval) // to hit only one alien
    updateCell(pos) // to delete the alien that was hit
    gGame.score += 10
    gGame.aliensCount++
    gHero.isShoot = false
    gGame.isHitAlien = true
    if (gGame.aliensCount === COUNT_ALIENS_COL * COUNT_ALIENS_ROW - 1) {
        gHero.isWin = true
        gameDone()
    }
    document.querySelector('.score').innerText = 'score:' + gGame.score
    return
}

function gameDone() {
    clearInterval(gLaserInterval)
    clearInterval(gCandysInterval)
    gGame.isGameOver = true
    var elWin = document.querySelector('.h2')
    var msg = (gHero.isWin)?  'WOW you just Won the game 🧙‍♂️⚡😊!' : 'You just LOST the game 🧙‍♂️⚡☠️!'
    elWin.innerHTML = msg
    return
}

function restartGame() {
    console.log('Click on restart game')
    var elh2 = document.querySelector('.h2')
    var msg = ''
    elh2.innerHTML = msg
    clearInterval(gLaserInterval)
    init()
}







