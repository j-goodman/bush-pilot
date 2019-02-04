let Rocket = function (x, y) {
    this.pos = {
        x: x,
        y: y,
    }
    this.elevation = 0
    this.speed = Math.floor(Math.random() * 30) + 20
}

Rocket.prototype.move = function () {
    if (!(game.time % 5)) {
        this.elevation += 1
    }
    if (this.elevation === 13) {
        this.elevation += 1
        this.explode()
    } else {
        this.pos.y -= this.speed
        ctx.drawImage(images.rocket,
            0 + (images.rocket.width / 13 * this.elevation),
            0,
            images.rocket.width / 13,
            images.rocket.height,
            this.pos.x,
            this.pos.y,
            (images.rocket.width / 13), // * .75,
            images.rocket.height, // * .75
        )
    }
}

Rocket.prototype.explode = function () {
    game.objects.push(
        new Explosion (
            this.pos.x,
            this.pos.y,
        )
    )
}
