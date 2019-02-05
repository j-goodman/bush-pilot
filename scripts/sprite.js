let Sprite = function (image, frames) {
    this.image = image
    this.frames = frames
    this.frame = 0
}

Sprite.prototype.draw = function (x, y, scale) {
    ctx.drawImage(
        this.image,
        0 + (this.image.width / this.frames * this.frame),
        0,
        this.image.width / this.frames,
        this.image.height,
        x - this.image.width / this.frames,
        y - this.image.height,
        this.image.width / this.frames * scale,
        this.image.height * scale
    )
}
