const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const current = document.getElementById('current');

const width = canvas.width;
const height = canvas.height;
const aspectRatio = width / height;

const centerX = -0.65;
const centerY = 0;
const rangeX = 3.0;
const rangeY = rangeX / aspectRatio;

const minX = centerX - rangeX / 2;
const maxX = centerX + rangeX / 2;
const minY = centerY - rangeY / 2;
const maxY = centerY + rangeY / 2;

const TICK_LENGTH = 10;
const POINT_RADIUS = 2;

function round(n, places = 3) {
  return Math.round(n * 10 ** places) / 10 ** places;
}

function formatComplexNumber(x, y) {
  const positive = y >= 0;

  const roundedX = round(x);
  const roundedY = round(y);

  return positive
    ? `${roundedX} + ${roundedY} i`
    : `${roundedX} - ${-roundedY} i`;
}

function canvasToCartesian(x, y) {
  const cartesianX = minX + x * (rangeX / width);
  const cartesianY = maxY - y * (rangeY / height);
  return { x: cartesianX, y: cartesianY };
}

function cartesianToCanvas(x, y) {
  const canvasX = (x - minX) * (width / rangeX);
  const canvasY = (maxY - y) * (height / rangeY);
  return { x: canvasX, y: canvasY };
}

function setup() {
  drawAxes();
}

function reset() {
  current.innerText = '';
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  setup();
}

function connectPoints(x1, y1, x2, y2) {
  const { x: startX, y: startY } = cartesianToCanvas(x1, y1);
  const { x: endX, y: endY } = cartesianToCanvas(x2, y2);

  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.strokeStyle = 'blue';
  ctx.stroke();
}

function drawYAxis() {
  connectPoints(0, maxY, 0, minY);
}

function drawXAxis() {
  connectPoints(minX, 0, maxX, 0);
}

function drawAxes() {
  drawYAxis();
  drawXAxis();
  drawXTicks();
  drawYTicks();
}

function drawVerticalTick(cartesianX, cartesianY) {
  const { x, y } = cartesianToCanvas(cartesianX, cartesianY);
  ctx.beginPath();
  ctx.moveTo(x, y - TICK_LENGTH);
  ctx.lineTo(x, y + TICK_LENGTH);
  ctx.stroke();
}

function drawHorizontalTick(cartesianX, cartesianY) {
  const { x, y } = cartesianToCanvas(cartesianX, cartesianY);
  ctx.beginPath();
  ctx.moveTo(x - TICK_LENGTH, y);
  ctx.lineTo(x + TICK_LENGTH, y);
  ctx.stroke();
}

function drawXTicks() {
  const start = Math.floor(minX) + 1;
  const end = Math.floor(maxX);

  for (let x = start; x <= end; x++) {
    drawVerticalTick(x, 0);
  }
}

function drawYTicks() {
  const start = Math.floor(minY) + 1;
  const end = Math.floor(maxY);

  for (let y = start; y <= end; y++) {
    drawHorizontalTick(0, y);
  }
}

function drawCircle(canvasX, canvasY, radius) {
  ctx.fillStyle = 'blue';

  ctx.beginPath();
  ctx.arc(canvasX, canvasY, radius, 0, 2 * Math.PI);
  ctx.closePath();

  ctx.fill();
}

function drawPoint(cartesianX, cartesianY) {
  const { x, y } = cartesianToCanvas(cartesianX, cartesianY);
  drawCircle(x, y, POINT_RADIUS);
}

function drawOrbit(orbit) {
  for (let i = 0; i < orbit.length - 1; i++) {
    const start = orbit[i];
    const end = orbit[i + 1];

    drawPoint(start.x, start.y);
    connectPoints(start.x, start.y, end.x, end.y);
    drawPoint(end.x, end.y);
  }
}

canvas.onmousemove = (e) => {
  reset();
  const { x, y } = canvasToCartesian(e.offsetX, e.offsetY);

  current.innerText = formatComplexNumber(x, y);

  const orbit = getOrbit(x, y);
  drawOrbit(orbit);
};

canvas.onmouseleave = (e) => {
  reset();
};

setup();
