const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const follower = document.getElementById('follower');
const cValue = document.getElementById('cValue');
const divergesInfo = document.getElementById('divergesInfo');

const width = canvas.width;
const height = canvas.height;
const aspectRatio = width / height;

const centerX = -0.65;
const centerY = 0;
const rangeX = 3.4;
const rangeY = rangeX / aspectRatio;

const minX = centerX - rangeX / 2;
const maxX = centerX + rangeX / 2;
const minY = centerY - rangeY / 2;
const maxY = centerY + rangeY / 2;

const TICK_LENGTH = 10;
const POINT_RADIUS = 1;
