let Sprite = function (image, frames) {
    this.image = image
    this.frames = frames
    this.frame = 0
}

Sprite.prototype.draw = function (x, y, scale=1) {
    ctx.drawImage(
        this.image,
        0 + (this.image.width / this.frames * this.frame),
        0,
        this.image.width / this.frames,
        this.image.height,
        x - (this.image.width / this.frames / 2),
        y - (this.image.height / 2),
        this.image.width / this.frames * scale,
        this.image.height * scale
    )
}
