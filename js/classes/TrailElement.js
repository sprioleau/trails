export default class TrailElement {
  constructor({ x, y }) {
    this.x = x;
    this.y = y;
    this.shape = "circle";
    this.size = 5;
    this.maxSize = 100;
    this.opacity = 1;
    this.frames = 0;
    this.frameRate = 3;
    this.lineWidth = 1;
    this.hue = Math.random() * 50 + 100;
    this.hueIncrement = 10;
    this.shouldRemove = false; 
  }

  update() {
    this.frames++;
    if (this.frames % this.frameRate !== 0) return;
    
    this.size++
    this.opacity = 1 - this.size / this.maxSize;
    this.hue += this.hueIncrement;
  }
}