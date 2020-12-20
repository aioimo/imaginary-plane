function formatComplexNumber(x, y) {
  const positive = y >= 0;

  const roundedX = round(x);
  const roundedY = round(y);

  return positive
    ? `c = ${roundedX} + ${roundedY} i`
    : `c = ${roundedX} - ${-roundedY} i`;
}

function setup() {
  drawAxes();
}

function reset() {
  follower.style.display = 'none';
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  setup();
}

canvas.onmousemove = (e) => {
  reset();
  const { x, y } = canvasToCartesian(e.offsetX, e.offsetY);

  const mouseX = Math.max(e.x - 300, 50);
  const mouseY = Math.max(e.y - 100, 100);

  follower.style.display = 'block';
  follower.style.left = mouseX + 'px';
  follower.style.top = mouseY + 'px';
  follower.innerText = formatComplexNumber(x, y);

  const orbit = getOrbit(x, y);
  drawOrbit(orbit);
};

canvas.onmouseleave = (e) => {
  reset();
};

setup();
