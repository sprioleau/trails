const canvas = document.querySelector("canvas");
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

let mouseIsPressed = false,
    trailElements = [];

class TrailElement {
  constructor({ x, y }) {
    this.x = x;
    this.y = y;
    this.radius = 2;
    this.maxRadius = 30;
    this.opacity = 1;
    this.frames = 0;
    this.frameRate = 2;
    this.lineWidth = 1;
    this.hue = 50;
    this.shouldRemove = false; 
  }

  draw() {
    c.save();
    c.globalAlpha = this.opacity;
    c.strokeStyle = `hsl(${this.hue}, 100%, 50%)`
    c.lineWidth = this.lineWidth;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    c.stroke();
    c.restore();
  }

  update() {
    this.draw();

    if (this.frames % this.frameRate === 0) this.radius++;
    if (this.radius > this.maxRadius) this.shouldRemove = true; 

    this.opacity = 1 - this.radius / this.maxRadius;
    this.frames++;
    this.hue += 10;
    this.lineWidth += 0.125;
  }
}

(function animate() {
  c.fillStyle = "hsl(0, 0%, 11%)"
  c.fillRect(0, 0, canvas.width, canvas.height)
  
  trailElements = trailElements.filter(({ shouldRemove }) => !shouldRemove);
  trailElements.forEach((trailElement) => trailElement.update())
  
  requestAnimationFrame(animate);
})()

function handleMousedown() {
  mouseIsPressed = true;
}

function handleMousemove({x, y}) {
  if (!mouseIsPressed) return;
  trailElements.push(new TrailElement({ x, y }))
}

function handleMouseup() {
  mouseIsPressed = false;
}

function handleTouches(e) {
  [...e.touches].forEach((touch) => {
    const { clientX: x, clientY: y } = touch;
    trailElements.push(new TrailElement({ x, y }))
  })
}

function handleResize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}

addEventListener("mousedown", handleMousedown)
addEventListener("mousemove", handleMousemove)
addEventListener("mouseup", handleMouseup)
addEventListener("touchstart", handleTouches) 
addEventListener("touchmove", handleTouches)
addEventListener("resize", handleResize)