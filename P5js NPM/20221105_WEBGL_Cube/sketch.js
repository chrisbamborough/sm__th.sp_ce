function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  background(150);
  orbitControl();
  fill(0.1, 100, 100);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  box(200);
}
