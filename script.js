document.addEventListener('DOMContentLoaded', () => {
    let perso = document.getElementById('perso')
    let spritePerso = document.getElementById('spritePerso')


    let currentRoom = 1
    loadRoom(currentRoom)
    function loadRoom(arg) {
        document.getElementById('mapCSSLINK').href = 'Maps/map' + arg + '.css'

        fetch('Maps/map' + arg + '.txt').then(response => response.text()).then((data) => {
            document.getElementById('buildingDIV').innerHTML = data
        })
    }
    function getTpPos(arg) {
        fetch('MapsPositionsSpawn/'  + currentRoom + 'to' + arg + '.txt').then(response => response.text()).then((data) => {
            currentRoom = arg
            perso.style.left = data.split('/')[0]
            perso.style.top = data.split('/')[1]
        })
    }

    perso.style.left = (pxToSvw(window.innerWidth / 2) - 15) + 'svw'
    perso.style.top = (pxToSvw(window.innerHeight / 2)) + 'svw'
    spritePerso.style.backgroundPositionX = '-2svw'

    let moveDistance = 0.2
    let zPressed = false, qPressed = false, sPressed = false, dPressed = false
    let currentPersoSprite = 2

    document.addEventListener('keydown', (e) => {
        if (e.key == "z") {
            if (!zPressed && !sPressed && !qPressed && !dPressed) {
                zPressed = true
                moveUp()
                spriteMoveUp()
            }
        } else if (e.key == 's') {
            if (!zPressed && !sPressed && !qPressed && !dPressed) {
                sPressed = true
                moveDown()
                spriteMoveDown()
            }
        } else if (e.key == 'q') {
            if (!zPressed && !sPressed && !qPressed && !dPressed) {
                qPressed = true
                moveLeft()
                spriteMoveLeft()
            }
        } else if (e.key == 'd') {
            if (!zPressed && !sPressed && !qPressed && !dPressed) {
                dPressed = true
                moveRight()
                spriteMoveRight()
            }
        }
    })
    document.addEventListener('keyup', (e) => {
        if (e.key == "z") {
            zPressed = false
        } else if (e.key == 's') {
            sPressed = false
        } else if (e.key == 'q') {
            qPressed = false
        } else if (e.key == 'd') {
            dPressed = false
        }
    })

    function moveUp() {
        if (!isWalkable(0, -moveDistance)) { zPressed == false; return }
        if (isNewRoom(0, -moveDistance)) { return }
        perso.style.top = (Number(perso.style.top.replace('svw', '')) - moveDistance) + 'svw'
        if (zPressed) { setTimeout(moveUp, 10) }
    }
    function moveDown() {
        if (!isWalkable(0, moveDistance)) { zPressed == false; return }
        if (isNewRoom(0, moveDistance)) { return }
        perso.style.top = (Number(perso.style.top.replace('svw', '')) + moveDistance) + 'svw'
        if (sPressed) { setTimeout(moveDown, 10) }
    }
    function moveLeft() {
        if (!isWalkable(-moveDistance, 0)) { zPressed == false; return }
        if (isNewRoom(-moveDistance, 0)) { return }
        perso.style.left = (Number(perso.style.left.replace('svw', '')) - moveDistance) + 'svw'
        if (qPressed) { setTimeout(moveLeft, 10) }
    }
    function moveRight() {
        if (!isWalkable(moveDistance, 0)) { zPressed == false; return }
        if (isNewRoom(moveDistance, 0)) { return }
        perso.style.left = (Number(perso.style.left.replace('svw', '')) + moveDistance) + 'svw'
        if (dPressed) { setTimeout(moveRight, 10) }
    }

    function spriteMoveUp() {
        if (currentPersoSprite == 6) {
            currentPersoSprite = 10
            spritePerso.style.backgroundPositionX = '-10svw'
        } else {
            currentPersoSprite = 6
            spritePerso.style.backgroundPositionX = '-6svw'
        }
        if (zPressed) { setTimeout(spriteMoveUp, 200) } else { spritePerso.style.backgroundPositionX = '-8svw' }
    }
    function spriteMoveDown() {
        if (currentPersoSprite == 0) {
            currentPersoSprite = 4
            spritePerso.style.backgroundPositionX = '-4svw'
        } else {
            currentPersoSprite = 0
            spritePerso.style.backgroundPositionX = '0svw'
        }
        if (sPressed) { setTimeout(spriteMoveDown, 200) } else { spritePerso.style.backgroundPositionX = '-2svw' }
    }
    function spriteMoveLeft() {
        if (currentPersoSprite == 12) {
            currentPersoSprite = 14
            spritePerso.style.backgroundPositionX = '-14.1svw'
        } else {
            currentPersoSprite = 12
            spritePerso.style.backgroundPositionX = '-12svw'
        }
        if (qPressed) { setTimeout(spriteMoveLeft, 200) } else { spritePerso.style.backgroundPositionX = '-12svw' }
    }
    function spriteMoveRight() {
        if (currentPersoSprite == 16) {
            currentPersoSprite = 18
            spritePerso.style.backgroundPositionX = '-18svw'
        } else {
            currentPersoSprite = 16
            spritePerso.style.backgroundPositionX = '-16.2svw'
        }
        if (dPressed) { setTimeout(spriteMoveRight, 200) } else { spritePerso.style.backgroundPositionX = '-16.2svw' }
    }

    function isWalkable(changeX, changeY) {
        let x = document.getElementById('perso').getBoundingClientRect().x + svwToPx(changeX)
        let y = document.getElementById('perso').getBoundingClientRect().y + svwToPx(changeY)

        if (pxToSvw(x) < 15.5 || pxToSvw(x) > 84 || pxToSvw(y) < 2.8 || pxToSvw(y) > 45) { return false }

        let arr = document.getElementsByClassName('notWalkable')
        for (let i = 0; i < arr.length; i++) {
            let boundingRect = arr[i].getBoundingClientRect()
            if (x < boundingRect.right && x > boundingRect.left && y < boundingRect.bottom && y > boundingRect.top) {
                return false
            }
        }
        return true
    }
    function isNewRoom(changeX, changeY) {
        let x = document.getElementById('perso').getBoundingClientRect().x + svwToPx(changeX)
        let y = document.getElementById('perso').getBoundingClientRect().y + svwToPx(changeY)

        let arr = document.getElementsByClassName('tpAble')
        for (let i = 0; i < arr.length; i++) {
            let boundingRect = arr[i].getBoundingClientRect()
            if (x < boundingRect.right && x > boundingRect.left && y < boundingRect.bottom && y > boundingRect.top) {
                loadRoom(arr[i].id.replace('to', ''))
                getTpPos(arr[i].id.replace('to', ''))
                return true
            }
        }
        return false
    }

    function pxToSvw(arg) { return arg * (100 / Number(window.getComputedStyle(document.body)['width'].replace('px', ''))) }
    function svwToPx(arg) { return arg * (Number(window.getComputedStyle(document.body)['width'].replace('px', '') / 100)) }

})