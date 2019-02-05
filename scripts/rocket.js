let Rocket = function (x, y) {
    this.pos = {
        x: x,
        y: y,
    }
    this.elevation = 0
    this.speed = Math.floor(Math.random() * 30) + 20
    this.sprite = new Sprite (images.rocket, 13)
}

Rocket.prototype.move = function () {
    if (!(game.time % 5)) {
        this.elevation += 1
        this.sprite.frame = this.elevation
    }
    if (this.elevation === 13) {
        this.elevation += 1
        this.explode()
    } else {
        this.pos.y -= this.speed
        this.sprite.draw(this.pos.x, this.pos.y, 1.5)
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
