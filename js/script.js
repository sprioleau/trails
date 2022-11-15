import Circle from "./classes/Circle.js";
import Square from "./classes/Square.js";
import Star from "./classes/Star.js";

const circle = document.getElementById("circle");
const square = document.getElementById("square");
const star = document.getElementById("star");
const shapes = document.querySelectorAll(".shape");

const canvas = document.querySelector("canvas");
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

let mouseIsPressed = false,
  trailElements = [],
  shape = "circle";

let previousTime = 0;

function animate(timestamp) {
  const deltaTime = timestamp - previousTime;
  previousTime = timestamp;
  c.fillStyle = "hsl(0, 0%, 11%)"
  c.fillRect(0, 0, canvas.width, canvas.height)
  
  trailElements = trailElements.filter(({ shouldRemove }) => !shouldRemove);
  trailElements.forEach((trailElement) => {
    trailElement.draw(c)
    trailElement.update(deltaTime)
  })
  
  requestAnimationFrame(animate);
}

animate(0);

function getTrailElement({x, y}) {
  let newElement;
  if (shape === "circle") newElement = new Circle({ x, y })
  if (shape === "square") newElement = new Square({ x, y })
  if (shape === "star") newElement = new Star({ x, y })
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
  shapes.forEach((shape) => shape.classList.remove("selected"));
  circle.classList.add("selected");
}

function handleSelectSquare() {
  shape = "square";
  shapes.forEach((shape) => shape.classList.remove("selected"));
  square.classList.add("selected");
}

function handleSelectStar() {
  shape = "star";
  shapes.forEach((shape) => shape.classList.remove("selected"));
  star.classList.add("selected");
}

addEventListener("mousedown", handleMousedown)
addEventListener("mousemove", handleMousemove)
addEventListener("mouseup", handleMouseup)
addEventListener("touchstart", handleTouches) 
addEventListener("touchmove", handleTouches)
addEventListener("resize", handleResize)
circle.addEventListener("click", handleSelectCircle)
square.addEventListener("click", handleSelectSquare)
star.addEventListener("click", handleSelectStar)