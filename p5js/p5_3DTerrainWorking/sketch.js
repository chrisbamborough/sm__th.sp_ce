let scl = 100;
let w = 10;
let h = 10;
let rows, cols;

let flying = 0;
// create an array for the terrain
let terrain = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  cols = 10;
  rows = 10;
}

function draw() {
  //translate(width, height, 0);

  orbitControl();

  flying -= 0.05;

  let yoff = flying;
  // loop through to populate array
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    terrain[y] = []; // create nested array
    for (let x = 0; x < cols; x++) {
      terrain[y][x] = map(noise(xoff, yoff), 0, 1, -50, 50);
      xoff += 0.1;
    }
    yoff += 0.1;
  }

  //background(0);
  stroke(0);
  noFill();

  //translate(0, height / 4);
  rotateX(PI / 1.8);

  for (let i = 0; i < rows - 1; i++) {
    //beginShape(TRIANGLE_STRIP);
    push();
    for (let j = 0; j < cols; j++) {
      push();
      translate(j * scl, i * scl, terrain[j][i]);
      normalMaterial();
      sphere(10);
      pop();
    }
    //endShape();
    pop();
  }
}
