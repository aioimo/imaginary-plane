// Basic Utils
//

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

function connectPoints(x1, y1, x2, y2, color = 'black') {
  const { x: startX, y: startY } = cartesianToCanvas(x1, y1);
  const { x: endX, y: endY } = cartesianToCanvas(x2, y2);

  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.strokeStyle = color;
  ctx.stroke();
}

// Coordinate system
//

function drawYAxis() {
  connectPoints(0, maxY, 0, minY);
}

function drawXAxis() {
  connectPoints(minX, 0, maxX, 0);
}

function drawVerticalTick(cartesianX, cartesianY, val, length = TICK_LENGTH) {
  const { x, y } = cartesianToCanvas(cartesianX, cartesianY);
  ctx.beginPath();
  ctx.moveTo(x, y - length);
  ctx.lineTo(x, y + length);
  ctx.stroke();
  if (val) {
    ctx.font = '18px serif';
    ctx.fillStyle = 'black';
    ctx.fillText(`${val.toFixed(1)}`, x - 13, y + 30);
  }
}

function drawHorizontalTick(cartesianX, cartesianY, val, length = TICK_LENGTH) {
  const { x, y } = cartesianToCanvas(cartesianX, cartesianY);
  ctx.beginPath();
  ctx.moveTo(x - length, y);
  ctx.lineTo(x + length, y);
  ctx.stroke();
  if (val) {
    ctx.font = '18px serif';
    ctx.fillStyle = 'black';
    ctx.fillText(`${val.toFixed(1)}i`, x + 15, y + 4);
  }
}

function drawXTicks() {
  const start = Math.floor(minX) + 1;
  const end = Math.floor(maxX);

  for (let x = start; x <= end; x += 0.5) {
    if (x % 1 === 0) {
      drawVerticalTick(x, 0, x);
    } else {
      drawVerticalTick(x, 0, x, TICK_LENGTH / 2);
    }
  }
}

function drawYTicks() {
  const start = Math.floor(minY) + 1;
  const end = Math.floor(maxY);

  for (let y = start; y <= end; y += 0.5) {
    if (y % 1 === 0) {
      drawHorizontalTick(0, y, y);
    } else {
      drawHorizontalTick(0, y, y, TICK_LENGTH / 2);
    }
  }
}

function drawAxes() {
  drawYAxis();
  drawXAxis();
  drawXTicks();
  drawYTicks();
}

// Orbit
//

function drawOrbit(orbit) {
  for (let i = 0; i < orbit.length - 1; i++) {
    const start = orbit[i];
    const end = orbit[i + 1];

    drawPoint(start.x, start.y);
    connectPoints(start.x, start.y, end.x, end.y, 'blue');
    drawPoint(end.x, end.y);
  }
}
