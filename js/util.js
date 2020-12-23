function round(n, places = 3) {
  return Math.round(n * 10 ** places) / 10 ** places;
}

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
