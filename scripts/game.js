window.images = {}
window.game = {}

let initialize = () => {
    window.canvas = document.getElementById('screen')
    window.ctx = canvas.getContext('2d')

    let fullscreen = document.getElementById('fullscreen')
    fullscreen.onclick = function () {
        if (canvas.mozRequestFullScreen) {
            canvas.mozRequestFullScreen()
        } else if (canvas.webkitRequestFullScreen) {
            canvas.webkitRequestFullScreen()
        }
        canvas.style.width = 'auto'
        canvas.style.height = '100%'
    }
    setupGame()
}

window.addEventListener('load', initialize)

let setupGame = () => {
    images.snow = document.getElementById('img-snow')
    images.rocket = document.getElementById('img-rocket')
    images.explosion = document.getElementById('img-explosion')
    images.backgrounds = {
        snowfields: [
            document.getElementById('img-snowfield-1'),
            document.getElementById('img-snowfield-2'),
            document.getElementById('img-snowfield-3'),
        ],
        woods: [
            document.getElementById('img-woods-1'),
            document.getElementById('img-woods-2'),
            document.getElementById('img-woods-3'),
            document.getElementById('img-woods-4'),
            document.getElementById('img-woods-5'),
        ],
        rocks: [
            document.getElementById('img-rocks-1'),
            document.getElementById('img-rocks-2'),
        ],
        rivers: [
            document.getElementById('img-river-1'),
            document.getElementById('img-river-2'),
        ],
    }
    game.plane = {
        angle: 0, // 0-15
        pos: {
            x: 1700,
            y: 1400,
        },
        leftKeyDown: 0,
        rightKeyDown: 0,
        speed: 120,
        sprite: new Sprite (document.getElementById('img-plane'), 16),
    }
    game.plane.sprite.mask = [
        {"x":-265,"y":-165,"width":532,"height":334},
        {"x":-246,"y":-169,"width":489,"height":336},
        {"x":-175,"y":-170,"width":379,"height":339},
        {"x":-85,"y":-169,"width":214,"height":343},
        {"x":-77,"y":-168,"width":133,"height":336},
        {"x":-83,"y":-169,"width":226,"height":338},
        {"x":-170,"y":-173,"width":393,"height":341},
        {"x":-235,"y":-169,"width":493,"height":338},
        {"x":-266,"y":-170,"width":533,"height":341},
        {"x":-261,"y":-173,"width":494,"height":343},
        {"x":-223,"y":-169,"width":391,"height":336},
        {"x":-142,"y":-171,"width":228,"height":340},
        {"x":-57,"y":-169,"width":131,"height":337},
        {"x":-129,"y":-169,"width":216,"height":337},
        {"x":-202,"y":-169,"width":384,"height":330},
        {"x":-246,"y":-171,"width":492,"height":342}
    ]
    game.objects = []
    game.time = 0
    window.setInterval(gameLoop, 30)
}

let gameLoop = () => {
    drawBackground()
    movePlane()
    fireRockets()
    game.plane.sprite.draw(game.plane.pos.x, game.plane.pos.y, .75)
    game.objects.forEach(object => {
        object.move()
    })
    game.time += 1
}

let keyDown = key => {
    let plane = game.plane
    switch (key.code) {
        case 'ArrowLeft':
            plane.leftKeyDown += 1
            break;
        case 'ArrowRight':
            plane.rightKeyDown += 1
            break;
    }
}

let keyUp = key => {
    let plane = game.plane
    switch (key.code) {
        case 'ArrowLeft':
            plane.leftKeyDown = 0
            break;
        case 'ArrowRight':
            plane.rightKeyDown = 0
            break;
    }
}

window.addEventListener('keydown', keyDown)
window.addEventListener('keyup', keyUp)

let movePlane = () => {
    let plane = game.plane
    if (plane.barrelRoll) {
        if (!(game.time % 3)) {
            plane.angle += plane.rollDirection
            plane.angle = plane.angle === -1 ? 15 : plane.angle
            plane.angle = plane.angle === 16 ? 0 : plane.angle
        }
        if (plane.angle === (plane.rollDirection === 1 ? 1 : 15)) {
            plane.barrelRoll = false
        }
        plane.pos.x += plane.rollDirection * 50
    } else {
        if (plane.angle > 8) {
            plane.pos.x -= (16 - plane.angle) * 24
        } else if (plane.angle < 8) {
            plane.pos.x += plane.angle * 24
        }
        if (!(game.time % 4)) {
            if (plane.leftKeyDown) {
                plane.angle -= 1
                plane.angle = plane.angle === -1 ? 15 : plane.angle
            }
            if (plane.rightKeyDown) {
                plane.angle += 1
                plane.angle = plane.angle === 16 ? 0 : plane.angle
            }
        }
        if (plane.angle > 3 && plane.angle < 13) {
            plane.barrelRoll = true
            plane.rollDirection = plane.angle < 8 ? 1 : -1
        }
    }
    if (plane.pos.x > canvas.width) {
        plane.barrelRoll = true
        plane.rollDirection = -1
    } else if (plane.pos.x < -535) {
        plane.barrelRoll = true
        plane.rollDirection = 1
    }
    plane.sprite.frame = plane.angle
}

let drawBackground = () => {
    let speed = game.plane.speed
    if (!(game.time * speed % 7680)) {
        game.feature = random(images.backgrounds[random([
            'snowfields',
            'snowfields',
            'snowfields',
            'snowfields',
            'snowfields',
            'snowfields',
            'snowfields',
            'snowfields',
            'woods',
            'woods',
            'woods',
            'woods',
            'woods',
            'rivers',
            'rocks',
        ])])
    }
    ctx.drawImage(images.snow, 0, game.time * speed % 3840)
    ctx.drawImage(images.snow, 0, game.time * speed % 3840 - 3840)
    ctx.drawImage(game.feature, 0, game.time * speed % 7680 - (1920 + 3840))
}

let fireRockets = () => {
    if (!((game.time + 1) % 150)) {
        if (random([true, true, false])) {
            fireRocket()
        }
    }
}

let fireRocket = () => {
    game.objects.push(new Rocket (
            random([true, false]) ?
            Math.floor(Math.random() * canvas.width) :
            game.plane.pos.x + 127,
            canvas.height + 50
        )
    )
    if (random([true, true, true, false])) {
        setTimeout(fireRocket, (Math.random() * 1800 + 200))
    }
}
