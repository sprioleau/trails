import Circle from "./classes/Circle.js";
import Square from "./classes/Square.js";

const circle = document.getElementById("circle");
const square = document.getElementById("square");

const canvas = document.querySelector("canvas");
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

let mouseIsPressed = false,
  trailElements = [],
  shape = "circle";

function animate() {
  c.fillStyle = "hsl(0, 0%, 11%)"
  c.fillRect(0, 0, canvas.width, canvas.height)
  
  trailElements = trailElements.filter(({ shouldRemove }) => !shouldRemove);
  trailElements.forEach((trailElement) => {
    trailElement.draw(c)
    trailElement.update()
  })
  
  requestAnimationFrame(animate);
}

animate();

function getTrailElement({x, y}) {
  let newElement;
  if (shape === "circle") newElement = new Circle({ x, y})
  if (shape === "square") newElement = new Square({ x, y})
  return newElement;
}

function handleMousedown() {
  mouseIsPressed = true;
}

function handleMousemove({x, y}) {
  if (!mouseIsPressed) return;
  trailElements.push(getTrailElement({x, y}))
}

function handleMouseup() {
  mouseIsPressed = false;
}

function handleTouches(e) {
  Array.from(e.touches).forEach((touch) => {
    const { clientX: x, clientY: y } = touch;
    trailElements.push(getTrailElement({x, y}))
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