let xres = 80;
let yres = 100;
let maxDistance = 500;
let distance;
let diameter;
let xpos;
let ypos;


function setup() {
  createCanvas(640, 800);
  ellipseMode(CENTER);
  colorMode(HSB);
  noStroke();
}

function draw() {

  // translate to be the center of the first grid - ellipse mode center
  translate(width / xres / 2, height / yres / 2);
  background(255);


  let xstep = width / xres;
  let ystep = height / yres;

  for (let i = 0; i < xres; i++) {
    for (let j = 0; j < yres; j++) {

      xpos =  i * xstep;
      ypos = j * ystep;

      distanceMouse = dist(mouseX, mouseY, xpos, ypos);
      distancePoint = dist(width/4, height/4, xpos, ypos)

      if (distanceMouse >= distancePoint) {
        diameter = 10*cos(map(distancePoint*2, 0, width, 1, xstep/2));
      } else {
        diameter = 10*cos(map(distanceMouse*2, 0, width, 1, xstep/2));
      }

      fill(50);
      ellipse(xpos, ypos, diameter);
    }
  }
}

function mouseClicked() {
  save('myCanvas.png');
}