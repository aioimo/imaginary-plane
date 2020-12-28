const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const $loading = document.getElementById('loading');
const $nav = document.getElementById('nav');
const body = document.getElementById('graph');
const follower = document.getElementById('follower');
const cValue = document.getElementById('cValue');
const info = document.getElementById('info');

const getFont = () => {
  return window.getComputedStyle(body).getPropertyValue('font-family');
};

// const slider = document.getElementById('slider');

let width = canvas.width;
let height = canvas.height;
let aspectRatio = width / height;

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

function reassignConfig({
  newRangeX = rangeX,
  newCenterX = centerX,
  newCenterY = centerY,
}) {
  width = canvas.width;
  height = canvas.height;
  aspectRatio = width / height;

  centerX = newCenterX;
  centerY = newCenterY;

  rangeX = newRangeX;
  rangeY = rangeX / aspectRatio;
  minX = centerX - rangeX / 2;
  maxX = centerX + rangeX / 2;
  minY = centerY - rangeY / 2;
  maxY = centerY + rangeY / 2;
}
