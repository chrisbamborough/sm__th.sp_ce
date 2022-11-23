function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  orbitControl();

  background(255);
  translate(-width / 2, -height / 2, 0);

  for (let i = 0; i < 100; i += 1) {
    push();
    //triangles
    translate(0, 100, 0);
    triangle(
    0, sin( i + frameCount _ 0.1) _ 10, i,
    60, 60, i,
    -60, 60, i);
    pop();
  }

  noLoop();
}

function keyTyped() {
  if (key === "s") {
    saveCanvas("lines_sketch", "png");
  }
}
