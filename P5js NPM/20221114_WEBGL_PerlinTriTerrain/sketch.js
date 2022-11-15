let cols, rows;
let ncells = 10;
let landscape = [];

function setup() {
  createCanvas(400, 400, WEBGL);
  cols = int(width / ncells);
  rows = int(height / ncells);

  let xoff = 0.0;
  for (let x = 0; x < rows; x++) {
    landscape[x] = [];
    let yoff = 0.0;
    for (let y = 0; y < cols; y++) {
      // generate landscape of mapped perlin noise values.
      landscape[x][y] = map(noise(xoff, yoff), 0, 1, -140, 100);
      yoff += 0.1;
    }
    xoff += 0.1;
  }
}

function draw() {
  background(150);

  let locX = mouseX - height / 2;
  let locY = mouseY - width / 2;

  //Light
  ambientLight(60, 60, 60);
  pointLight(255, 255, 255, locX, locY, 100);

  ambientMaterial(70, 130, 230);

  // Normal Material
  //normalMaterial();

  // specularMaterial(250);
  // shininess(50);
  // torus(30, 10, 64, 64);

  // stroke(255);
  // // noFill();
  // fill(255, 25);

  orbitControl();

  rotateX(PI / 3);
  translate(-width / 2, -height / 2);
  for (let y = 0; y < rows; y++) {
    // Create 2d array

    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      vertex(x * ncells, y * ncells, landscape[x][y]);
      vertex(x * ncells, (y + 1) * ncells, landscape[x][y + 1]);
    }
    endShape();
  }
}
