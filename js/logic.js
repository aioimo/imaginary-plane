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

function square(x, y) {
  return { x: x * x - y * y, y: 2 * x * y };
}

function plus(x, y, a, b) {
  return { x: x + a, y: y + b };
}

function nextTerm(x, y, c) {
  const [x_0, y_0] = c;

  const { x: a, y: b } = square(x, y);
  const { x: nextX, y: nextY } = plus(a, b, x_0, y_0);
  return { nextX, nextY };
}

const precision = 150;
function getOrbit(x_0, y_0) {
  const orbit = [{ x: x_0, y: y_0 }];
  let diverges = undefined;

  const c = [x_0, y_0];
  let x = x_0;
  let y = y_0;

  for (let i = 0; i < precision; i++) {
    const { nextX, nextY } = nextTerm(x, y, c);

    orbit.push({ x: nextX, y: nextY });

    x = nextX;
    y = nextY;

    if (!diverges) {
      if (x ** 2 + y ** 2 > 4) {
        diverges = i;
      }
    }
  }

  return { orbit, diverges };
}
