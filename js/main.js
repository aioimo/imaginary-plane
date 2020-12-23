function setup() {
  drawAxes();
}

function reset() {
  follower.style.display = 'none';
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  setup();
}

let isHoldingMouse = false;

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
    info.style.display = 'block';
    info.innerText = formatDivergesInfo(diverges);
  } else {
    info.style.display = 'none';
  }

  drawOrbit(orbit, diverges);
};

const translatePlane = (e) => {
  const newCenterX = centerX - e.movementX / 200;
  const newCenterY = centerY + e.movementY / 200;
  reassignConfig(rangeX, newCenterX, newCenterY);
  reset();
};

// Listeners
//
body.onmouseup = (e) => {
  isHoldingMouse = false;
};

canvas.onmousedown = (e) => {
  reset();
  isHoldingMouse = true;
};

canvas.onmousemove = (e) => {
  if (isHoldingMouse) {
    translatePlane(e);
  } else {
    handleOrbit(e);
  }
};

canvas.onmouseleave = () => {
  reset();
};

canvas.onwheel = (e) => {
  const newRangeX = Math.max(1, Math.min((rangeX += e.wheelDeltaY / 240), 9));
  reassignConfig(newRangeX);
  reset();
};

slider.oninput = (e) => {
  const rangeX = e.target.value / 10;
  reassignConfig(rangeX);
  reset();
};

setup();
