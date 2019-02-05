let Explosion = function (x, y) {
    this.pos = {
        x: x,
        y: y,
    }
    this.sprite = new Sprite (images.explosion, 8)
    this.sprite.mask = [
        {"x":-50,"y":-72,"width":105,"height":147},
        {"x":-122,"y":-135,"width":260,"height":260},
        {"x":-148,"y":-156,"width":302,"height":303},
        {"x":-170,"y":-177,"width":332,"height":340},
        {"x":-181,"y":-181,"width":359,"height":362},
        {"x":-118,"y":-132,"width":263,"height":267},
        {"x":-104,"y":-97,"width":213,"height":188},
        {"x":-53,"y":-57,"width":100,"height":94}
    ]
}

Explosion.prototype.move = function () {
    if (!(game.time % 4)) {
        this.sprite.frame += 1
    }
    this.pos.y += game.plane.speed * .65 + (3 * this.sprite.frame)
    if (this.sprite.frame < 8) {
        this.sprite.draw(this.pos.x, this.pos.y, 2)
    }
}
