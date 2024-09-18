let drawMode =1;


function setup() {
  createCanvas(640, 800);
  noFill();
}

function draw() {
  background(255);

  translate(width / 2, height / 2);

  //background lines
  strokeWeight(3);
  overlay();

  // second shape
  let x = map(mouseX, 0, width, -50, 50);
  let y = map(mouseY, 0, height, -50, 50);
  let a = map(mouseX, 0, width, -0.5, 0.5);
  let s = map(mouseY, 0, height, 0.7, 2);

  if(drawMode ==1 ) rotate(a);
  if(drawMode == 2) translate(x,0);

  scale(s);

  strokeWeight(2);
  overlay();
}

function overlay() {
  var w = width - 100;
  var h = height - 100;

  if (drawMode == 1) {
    for (let i = -w / 2; i < w / 2; i += 5) {
      line(i, -h / 2, i, h / 2);
    }
  } else if (drawMode == 2) {
    for (let i = 0; i < w*2; i += 10) {
      ellipse(0, 0, i);
    }
  }
}

function keyPressed() {
  // change draw mode
  if (key == 1) drawMode = 1;
  if (key == 2) drawMode = 2;

  // save sketch
  if (key == 's' || key == 'S') save('myCanvas.png');
}

// function mouseClicked() {
//   save('myCanvas.png');
// }