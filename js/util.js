function round(n, places = 3) {
  return Math.round(n * 10 ** places) / 10 ** places;
}
