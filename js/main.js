function formatComplexNumber(x, y) {
  const positive = y >= 0;
  const roundedX = round(x);
  const roundedY = round(y);
  return positive
    ? `c = ${roundedX} + ${roundedY} i`
    : `c = ${roundedX} - ${-roundedY} i`;
}

function formatDivergesInfo(diverges) {
  return `diverges after ${diverges} iterations`;
}

function setup() {
  drawAxes();
}

function reset() {
  follower.style.display = 'none';
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  setup();
}

let isHoldingMouse = false;

body.onmouseup = (e) => {
  isHoldingMouse = false;
};

canvas.onmousedown = (e) => {
  reset();
  isHoldingMouse = true;
};

const handleOrbit = (e) => {
  reset();
  const { x, y } = canvasToCartesian(e.offsetX, e.offsetY);

  const mouseX = Math.max(e.x - 300, 50);
  const mouseY = Math.max(e.y - 100, 100);

  const { orbit, diverges } = getOrbit(x, y);

  follower.style.display = 'block';
  follower.style.left = mouseX + 'px';
  follower.style.top = mouseY + 'px';

  cValue.innerText = formatComplexNumber(x, y, diverges);

  if (diverges) {
    divergesInfo.style.display = 'block';
    divergesInfo.innerText = formatDivergesInfo(diverges);
  } else {
    divergesInfo.style.display = 'none';
  }

  drawOrbit(orbit, diverges);
};

const translate = (e) => {
  const newCenterX = centerX - e.movementX / 200;
  const newCenterY = centerY + e.movementY / 200;
  reassignConfig(rangeX, newCenterX, newCenterY);
  reset();
};

canvas.onmousemove = (e) => {
  if (isHoldingMouse) {
    translate(e);
  } else {
    handleOrbit(e);
  }
};

canvas.onmouseleave = (e) => {
  reset();
};

rangeXSlider.oninput = (e) => {
  const rangeX = e.target.value / 10;
  reassignConfig(rangeX);
  reset();
};

setup();
