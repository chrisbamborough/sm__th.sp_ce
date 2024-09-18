let xres = 8;
let yres = 10;
let xstep;
let ystep;
let xshift;
let yshift;

let shiftVal = [];
let ranCol = [];
let ranSize = [];

function setup() {
  createCanvas(640, 800);

  // calculate step in each direction
  xstep = width / xres;
  ystep = height / yres;

  // set up an array of random numbers for xshift / yshift
  for (let i = 0; i < xres; i++) {
    shiftVal[i] = [];
    ranCol[i] = [];
    ranSize[i] = [];

    for (let j = 0; j < yres; j++) {
      shiftVal[i][j] = [random(-xstep, xstep) / 5, random(-ystep, ystep) / 5];
      ranCol[i][j] = [random(0,255),random(0,255),random(0,255)];
      ranSize[i][j] = random(xstep / 2, xstep);
    }
  }
}

function draw() {

  // translate to be the center of the first grid - ellipse mode center
  translate(width / xres / 2, height / yres / 2);

  background(255);
  noStroke();

  for (let i = 0; i < xres; i++) {
    for (let j = 0; j < yres; j++) {

      xshift = shiftVal[i][j][0];
      yshift = shiftVal[i][j][1];

      fill(ranCol[i][j][0], ranCol[i][j][1], ranCol[i][j][2]);

      ellipse(xstep * i + xshift, ystep * j + yshift, ranSize[i][j]);
    }
  }
}

function mousePressed() {
  save('myCanvas.png');
}