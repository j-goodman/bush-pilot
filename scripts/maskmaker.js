// You've met with a terrible fate, haven't you?

window.box = {
    x: null,
    y: null,
    width: null,
    height: null,
}

window.mask = []

let makeMask = sprite => {
    window.sprite = sprite
    sprite.draw(320, 240)
}

let clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

let nextFrame = () => {
    window.mask[sprite.frame] = JSON.parse(JSON.stringify(window.box))
    console.log(JSON.stringify(window.mask))
    clearCanvas()
    sprite.frame += 1
    sprite.frame = sprite.frame >= sprite.frames ? 0 : sprite.frame
    sprite.draw(320, 240)
}

let drawBox = (xOrigin, yOrigin) => {
    window.drawingBox = true
    window.box.x = xOrigin - 320
    window.box.y = yOrigin - 240
}

let finishBox = (x, y) => {
    window.drawingBox = false
    window.box.width = x - window.box.x - 320
    window.box.height = y - window.box.y - 240
    clearCanvas()
    sprite.draw(320, 240)
}

window.addEventListener('load', () => {
    window.canvas = document.getElementsByTagName('canvas')[0]
    window.ctx = canvas.getContext('2d')
    makeMask(new Sprite (document.getElementById('img-plane'), 16))
    document.getElementById('next-frame').addEventListener('click', nextFrame)
    document.getElementById('log-mask').addEventListener('click', () => {
        console.log(JSON.stringify(window.mask))
    })
    canvas.addEventListener('mousedown', event => {
        drawBox(event.offsetX, event.offsetY)
    })
    canvas.addEventListener('mouseup', event => {
        finishBox(event.offsetX, event.offsetY)
    })
    canvas.addEventListener('mousemove', event => {
        clearCanvas()
        ctx.strokeStyle = '#fff'
        sprite.draw(320, 240)
        if (window.drawingBox) {
            ctx.beginPath()
            ctx.strokeRect(window.box.x, window.box.y, (event.offsetX - window.box.x), (event.offsetY - window.box.y))
        } else {
            ctx.beginPath()
            ctx.moveTo(0, event.offsetY)
            ctx.lineTo(canvas.width, event.offsetY)
            ctx.stroke()
            ctx.beginPath()
            ctx.moveTo(event.offsetX, 0)
            ctx.lineTo(event.offsetX, canvas.height)
        }
        ctx.stroke()
    })
})
