function setup() {
  createCanvas(640, 800);
}

function draw() {
  background(255);
  strokeWeight(50);
  stroke(100);
  ellipseMode(CENTER);
  ellipse(width/2, height/2, width/1.5)

}

function mouseClicked(){
  save('myCanvas.png');
}

