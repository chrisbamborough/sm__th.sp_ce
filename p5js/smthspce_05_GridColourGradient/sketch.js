let xres = 40;
let yres = 50;
let xstep;
let ystep;

function setup() {
  createCanvas(640, 800);

  // calculate step in each direction
  xstep = width / xres;
  ystep = height / yres;

  noStroke();
}

function draw() {

  // translate to be the center of the first grid - ellipse mode center
  translate(width / xres / 2, height / yres / 2);

  background(255);


  colorMode(HSB, width, height, 100);

  for (let i = 0; i < xres; i++) {
    for (let j = 0; j < yres; j++) {

      gridX = xstep*i;
      gridY = ystep*i;

      fill(gridX, height - gridY, 100);

      ellipse(gridX, gridY, ystep);
    }
  }
}

function mousePressed() {
  save('myCanvas.png');
}