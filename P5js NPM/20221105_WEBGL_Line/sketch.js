function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  orbitControl();

  background(255);
  translate(-width / 2, -height / 2, 0);

  for (let i = 0; i < 100; i += 1) {
    push();
    //line
    const r = random(0, width);
    const s = random(0, height);
    const t = random(0, width);
    const u = random(0, height);

    line(r, s, 0, t, u, 0);
    pop();
  }

  noLoop();
}

function keyTyped() {
  if (key === "s") {
    saveCanvas("lines_sketch", "png");
  }
}
