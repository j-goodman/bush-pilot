let Explosion = function (x, y) {
    this.pos = {
        x: x,
        y: y,
    }
    this.sprite = new Sprite (images.explosion, 8)
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
