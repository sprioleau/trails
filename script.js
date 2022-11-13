const circle = document.getElementById("circle");
const square = document.getElementById("square");

const canvas = document.querySelector("canvas");
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

let mouseIsPressed = false,
  trailElements = [],
  shape = "circle";

class TrailElement {
  constructor({ x, y, shape = "circle" }) {
    this.x = x;
    this.y = y;
    this.shape = shape;
    this.size = 5;
    this.maxSize = 100;
    this.opacity = 1;
    this.angle = 0;
    this.frames = 0;
    this.frameRate = 2;
    this.lineWidth = 1;
    this.hue = Math.random() * 50 + 100;
    this.shouldRemove = false; 
  }

  draw() {
    c.lineWidth = this.lineWidth;
    c.strokeStyle = `hsl(${this.hue}, 100%, 60%)`;
    
    c.save();
    c.globalAlpha = this.opacity;
    
    if (this.shape === "square") {
      c.translate(this.x, this.y)
      c.rotate(this.angle * Math.PI / 180);
      c.translate(-(this.x), -(this.y))
      c.strokeRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    } else if (this.shape === "circle") {
      c.beginPath();
      c.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      c.stroke();
    }

    c.restore();
  }

  update() {
    if (this.frames % this.frameRate === 0) {
      this.size++
      this.opacity = 1 - this.size / this.maxSize;
      this.hue += 10;
      this.angle += 5;
    };

    if (this.size > this.maxSize) return this.shouldRemove = true;

    this.frames++;
  }
}

(function animate() {
  c.fillStyle = "hsl(0, 0%, 11%)"
  c.fillRect(0, 0, canvas.width, canvas.height)
  
  trailElements = trailElements.filter(({ shouldRemove }) => !shouldRemove);
  trailElements.forEach((trailElement) => {
    trailElement.draw()
    trailElement.update()
  })
  
  requestAnimationFrame(animate);
})()

function handleMousedown() {
  mouseIsPressed = true;
}

function handleMousemove({x, y}) {
  if (!mouseIsPressed) return;
  trailElements.push(new TrailElement({ x, y, shape }))
}

function handleMouseup() {
  mouseIsPressed = false;
}

function handleTouches(e) {
  [...e.touches].forEach((touch) => {
    const { clientX: x, clientY: y } = touch;
    trailElements.push(new TrailElement({ x, y, shape }))
  })
}

function handleResize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}

function handleSelectCircle() {
  shape = "circle";
}

function handleSelectSquare() {
  shape = "square";
}

addEventListener("mousedown", handleMousedown)
addEventListener("mousemove", handleMousemove)
addEventListener("mouseup", handleMouseup)
addEventListener("touchstart", handleTouches) 
addEventListener("touchmove", handleTouches)
addEventListener("resize", handleResize)
circle.addEventListener("click", handleSelectCircle)
square.addEventListener("click", handleSelectSquare)