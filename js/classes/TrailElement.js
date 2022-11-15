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
    this.deltaTime = 0;
    this.frameTimer = 0;
    this.framesPerSecond = 4;
    this.timeInterval = 1000 / this.framesPerSecond;
  }

  update(deltaTime) { 
    this.deltaTime = deltaTime;

    if (this.frameTimer <= this.timeInterval) {
      this.size++
      this.opacity = 1 - this.size / this.maxSize;
      this.hue += this.hueIncrement;
      this.frameTimer += deltaTime;
    } else {
      this.frameTimer = 0;
    }
  }
}