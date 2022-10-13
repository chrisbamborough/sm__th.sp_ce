let radius;
let h;

let xres = 8;
let yres = 10;
let xstep;
let ystep;



function setup() {
  createCanvas(640, 800);


  colorMode(HSB, 360, 100, 100);
  noStroke();
  ellipseMode(RADIUS);

  xstep = width / xres;
  ystep = height / yres;
}

function draw() {

  // translate to be the center of the first grid - ellipse mode center
  translate(width / xres / 2, height / yres / 2);

  background(255);
  radius = xstep / 2;

  for (let i = 0; i < xres; i++) {
    for (let j = 0; j < yres; j++) {

      for (let r = radius; r > 0; --r) {

        let noiseVal = noise(xstep * i, ystep * j);

        h = map(r, 0, radius, 360/noiseVal, 360/(noiseVal*r));

        fill(h, 90, 90);
        ellipse(xstep * i, ystep * j, r, r);
        h = (h + 1) % 360;
      }
    }
  }
}

function mouseClicked() {
  save('myCanvas.png');
}