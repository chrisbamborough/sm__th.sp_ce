let dim;
let radius;
let h;

function setup() {
  createCanvas(640, 800);
  dim = width / 2;

  colorMode(HSB, 360, 100, 100);
  noStroke();
  ellipseMode(RADIUS);
}

function draw() {

  background(255);
  radius = dim;

  for (let r = radius; r > 0; --r) {

    h = map(r, 0, radius, 0, 360);
    let x = width/2;
    let y = height/2;

    fill(h, 90, 90);
    ellipse(x, y, r, r);
    h = (h + 1) % 360;
  }
}

function mouseClicked() {
  save('myCanvas.png');
}