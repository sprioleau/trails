import TrailElement from "./TrailElement.js";

export default class Square extends TrailElement { 
  constructor({x, y}) {
    super({x, y});
    this.angle = 0;
    this.angleIncrement = 5;
  }

  draw(c) {
    c.lineWidth = this.lineWidth;
    c.strokeStyle = `hsl(${this.hue}, 100%, 60%)`;

    c.save();
    c.globalAlpha = this.opacity;
    c.translate(this.x, this.y)
    c.rotate(this.angle * Math.PI / 180);
    c.translate(-(this.x), -(this.y))
    c.strokeRect(this.x - this.size * 0.5, this.y - this.size * 0.5, this.size, this.size);
    c.restore();
  }

  update(deltaTime) {
    super.update(deltaTime);

    if (this.frameTimer <= this.timeInterval) {
      this.angle += this.angleIncrement;
      this.frameTimer += this.deltaTime;
    } else {
      this.frameTimer = 0;
    }
    
    if (this.size > this.maxSize) return this.shouldRemove = true;
  }
}