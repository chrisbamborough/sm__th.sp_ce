const gridResX = 10;
const gridResY = 10;
let gridSpaceX;
let gridSpaceY;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  gridSpaceX = width / gridResX;
  gridSpaceY = height / gridResY;
}

function draw() {
  orbitControl();

  background(0);
  //drawLinegrid();
  drawQuadgrid();

  noLoop();
}

function drawLinegrid() {
  stroke(255);
  fill(255);

  for (var x = -width; x < width; x += gridSpaceX) {
    line(x, -height, x, height);
    //text(x, x + 1, 12);
  }
  for (var y = -height; y < height; y += gridSpaceY) {
    line(-width, y, width, y);
    //text(y, 1, y + 12);
  }
}

function drawQuadgrid() {
  translate(-width / 2, -height / 2, 0);

  for (let i = 0; i < gridResX; i += 1) {
    fill(255, 255, 255);
    stroke(0);
    for (let j = 0; j < gridResY; j += 1) {
      beginShape();
      vertex(i * gridSpaceX, j * gridSpaceY, 0);
      vertex(i * gridSpaceX, j * gridSpaceY + gridSpaceY, 0);
      vertex(i * gridSpaceX + gridSpaceX, j * gridSpaceY + gridSpaceY, 0);
      vertex(i * gridSpaceX + gridSpaceX, j * gridSpaceY, 0);
      endShape(CLOSE);
    }
  }
}

function keyTyped() {
  if (key === "s") {
    saveCanvas("lines_sketch", "png");
  }
}
