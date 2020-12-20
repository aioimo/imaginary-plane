function square(x, y) {
  return { x: x * x - y * y, y: 2 * x * y };
}

function plus(x, y, a, b) {
  return { x: x + a, y: y + b };
}

const precision = 100;
function getOrbit(x_0, y_0) {
  const terms = [{ x: x_0, y: y_0 }];
  let x = x_0;
  let y = y_0;

  for (let i = 0; i < precision; i++) {
    const { x: a, y: b } = square(x, y);
    const { x: m, y: n } = plus(a, b, x_0, y_0);

    terms.push({ x: m, y: n });

    x = m;
    y = n;

    if (x ** 2 + y ** 2 > 4) {
      break;
    }
  }

  return terms;
}
