let xres = 80;
let yres = 100;
let xstep;
let ystep;

var colorsLeft = [];
var colorsRight = [];
var interCol;
var colors = [];

function setup() {
  createCanvas(640, 800);

  colorMode(HSB);

  // calculate step in each direction
  xstep = width / xres;
  ystep = height / yres;

  noStroke();

  // add color values to arrays
  // for (var i = 0; i < yres; i++) {
  //   colorsLeft[i] = color(random(0, 255), random(0, 255), 100);
  //   colorsRight[i] = color(random(160, 190), 100, random(0, 100));
  // }
}

function draw() {

  // translate to be the center of the first grid - ellipse mode center
  translate(width / xres / 2, height / yres / 2);

  background(255);

  for (let i = 0; i < xres; i++) {

    // var col1 = colorsLeft[i];
    // var col2 = colorsRight[i];

    for (let j = 0; j < yres; j++) {

      // var amount = map(i, 0, xres - 1, 0, 1);
      // interCol = lerpColor(col1, col2, amount);
      // fill(interCol);

      // map to position in grid
      colHue = map(i+j, 0, yres, 50, 200);
      colSat = map(i+j, 0, yres, 50, 100);
      fill(colHue, colSat, colSat);

      gridX = xstep * i;
      gridY = ystep * j;

      ellipse(gridX, gridY, ystep);
    }
  }
}

function mousePressed() {
  save('myCanvas.png');
}