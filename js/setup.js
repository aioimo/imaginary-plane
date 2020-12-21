const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const body = document.getElementById('body');
const follower = document.getElementById('follower');
const cValue = document.getElementById('cValue');
const divergesInfo = document.getElementById('divergesInfo');
const rangeXSlider = document.getElementById('rangeXSlider');

const width = canvas.width;
const height = canvas.height;
const aspectRatio = width / height;

let centerX = -0.65;
let centerY = 0;

let rangeX = 3.4;

let rangeY = rangeX / aspectRatio;
let minX = centerX - rangeX / 2;
let maxX = centerX + rangeX / 2;
let minY = centerY - rangeY / 2;
let maxY = centerY + rangeY / 2;

const TICK_LENGTH = 10;
const POINT_RADIUS = 1;

function reassignConfig(newRangeX, newCenterX = centerX, newCenterY = centerY) {
  centerX = newCenterX;
  centerY = newCenterY;

  rangeX = newRangeX;
  rangeY = rangeX / aspectRatio;
  minX = centerX - rangeX / 2;
  maxX = centerX + rangeX / 2;
  minY = centerY - rangeY / 2;
  maxY = centerY + rangeY / 2;
}
