import TrailElement from "./TrailElement.js";

export default class Circle extends TrailElement { 
  constructor({x, y}) {
    super({x, y});
  }

  draw(c) {
    c.lineWidth = this.lineWidth;
    c.strokeStyle = `hsl(${this.hue}, 100%, 60%)`;
    
    c.save();
    c.globalAlpha = this.opacity;
    c.beginPath();
    c.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    c.stroke();
    c.restore();
  }

  update() {
    super.update();
    if (this.size > this.maxSize) return this.shouldRemove = true;
  }
}