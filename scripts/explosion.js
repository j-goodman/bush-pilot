let Explosion = function (x, y) {
    this.pos = {
        x: x,
        y: y,
    }
    this.frame = 0
}

Explosion.prototype.move = function () {
    if (!(game.time % 4)) {
        this.frame += 1
    }
    this.pos.y += game.plane.speed * .65 + (3 * this.frame)
    if (this.frame < 8) {
        ctx.drawImage(images.explosion,
            0 + (images.explosion.width / 8 * this.frame),
            0,
            (images.explosion.width / 8),
            images.explosion.height,
            this.pos.x - 90,
            this.pos.y - 180,
            (images.explosion.width / 8), // * .75,
            images.explosion.height, // * .75
        )
    }
}

Rocket.prototype.explode = function () {
    game.objects.push(new Explosion (this.pos.x, this.pos.y))
}
