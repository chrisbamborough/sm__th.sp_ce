let xres = 40;
let yres = 50;
let maxDistance = 500;


function setup() {
  createCanvas(640, 800);


  noFill();
  strokeWeight(2);
  stroke(100);
  ellipseMode(CENTER);

}

function draw() {

  // translate to be the center of the first grid - ellipse mode center
  translate(width / xres / 2, height / yres / 2);
  background(255);


  let xstep = width / xres;
  let ystep = height / yres;

  for (let i = 0; i < xres; i++) {
    for (let j = 0; j < yres; j++) {

      var diameter = dist(mouseX, mouseY, i * xstep, j * ystep);
      diameter = diameter / maxDistance * 40;


      ellipse(i * xstep, j * ystep, diameter)
    }
  }
}

function mouseClicked() {
  save('myCanvas.png');
}