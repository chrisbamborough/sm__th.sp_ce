let xres = 80;
let yres = 100;
let xstep;
let ystep;

function setup() {

  //rather than run in setup, probably better to create an array of random values, to use in the draw loop

  createCanvas(640, 800);

  // calculate step in each direction
  xstep = width / xres;
  ystep = height / yres;
}

function draw() {

  // translate to be the center of the first grid - ellipse mode center
  translate(width / xres / 2, height / yres / 2);

  background(255);
  noStroke();
  colorMode(HSB, 360,100,100);

  for (let i = 0; i < xres; i++) {
    for (let j = 0; j < yres; j++) {

      noiseVal = noise(xstep*i, ystep*j);
      // noiseScale = map(noiseVal, 0, 1, ystep, ystep/4);
      noiseHue = map(noiseVal, 0, 1, 0, 125);
      // noiseSat = map(noiseVal, 1, 0, 0, 100);

      fill(noiseHue,100,100);
      ellipse(xstep * i, ystep * j, ystep);
    }
  }
}

function mousePressed() {
  save('myCanvas.png');
}