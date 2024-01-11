const canvasWrapper = document.querySelector(".main-container");
const canvas = document.getElementById("canvas");
const increase = document.getElementById("increase");
const decrease = document.getElementById("decrease");
const displayBrushSize = document.getElementById("size");
const brushColor = document.getElementById("color");
const resetDrawing = document.getElementById("clear");

function setHeithWidhtCanvas() {
  canvas.width = canvasWrapper.clientWidth;
  canvas.height =
    canvasWrapper.clientHeight - canvasWrapper.children[1].clientHeight;
}
setHeithWidhtCanvas();

const ctx = canvas.getContext("2d");

let size = 10;
let isPressed = false;
brushColor.value = "black";
let color = brushColor.value;
let x = null;
let y = null;

function startDrawing(e) {
  isPressed = true;
  [x, y] = [e.offsetX, e.offsetY];
  e.preventDefault();
}

function stopDrawing() {
  isPressed = false;
  [x, y] = [null, null];
}
function draw(e) {
  if (isPressed) {
    const x2 = e.offsetX;
    const y2 = e.offsetY;

    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);

    [x, y] = [x2, y2];
  }
  e.preventDefault();
}

function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 2;
  ctx.stroke();
}

function updateSizeOnScreen() {
  displayBrushSize.innerText = size;
}

increase.addEventListener("click", () => {
  size += 5;

  if (size > 50) {
    size = 50;
  }

  updateSizeOnScreen();
});

decrease.addEventListener("click", () => {
  size -= 5;

  if (size < 5) {
    size = 5;
  }

  updateSizeOnScreen();
});

brushColor.addEventListener("change", (e) => (color = e.target.value));
resetDrawing.addEventListener("click", () =>
  ctx.clearRect(0, 0, canvas.width, canvas.height)
);

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mousemove", draw);

canvas.addEventListener("pointerdown", startDrawing);
canvas.addEventListener("pointerup", stopDrawing);
canvas.addEventListener("pointermove", draw);

window.addEventListener("resize", setHeithWidhtCanvas);
