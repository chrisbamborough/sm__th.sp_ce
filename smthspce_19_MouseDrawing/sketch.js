let c;
let ellipseSize = 50;
var angle = 0;
var angleSpeed = 1;

function setup() {
  createCanvas(640, 800);
  background(255);
  cursor(CROSS);
  strokeWeight(1);

  c = color(181, 157, 0);
  noFill();

}

function draw() {

  let r = map(mouseX, 0, 640, 0, 255);
  let g = map(mouseY, 0, 800, 0, 255);
  c = color(r, g, 0);

  if (mousePressed && mouseButton == LEFT)  {
    push();
    translate(mouseX, mouseY);
    // ellipseSize = angle;
    stroke(c);
    ellipse(0, 0, ellipseSize);
    pop();

    // angle += angleSpeed;
  }


}

function mousePressed() {
  // create a new random line length each new press
  
}

function keyPressed() {
  // save sketch
  if (key == 's' || key == 'S') save('myCanvas.png');
  if (key == 'c') background(255);
}