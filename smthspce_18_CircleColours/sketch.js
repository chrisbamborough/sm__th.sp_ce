let radius;
let h;

let xres = 16;
let yres = 20;
let xstep;
let ystep;



function setup() {
  createCanvas(640, 800);

  colorMode(HSB, 360, 100, 100);
  noStroke();
  ellipseMode(RADIUS);

  xstep = width / xres;
  ystep = height / yres;

}

function draw() {

  // translate to be the center of the first grid - ellipse mode center
  translate(width / xres / 2, height / yres / 2);

  background(255);
  radius = xstep / 2;

  for (let i = 0; i < xres; i++) {
    for (let j = 0; j < yres; j++) {

      xPos = i*xstep;
      yPos = j*ystep;

      // pick a random hue
      var hue1 = map(dist(xPos,yPos,mouseX, mouseY), 0, 200, 0, 255);
    
      // calculate complementary hue
      // adding 180 but removing 360 if larger
      var hue2 = (hue1 + 180) % 360;

      // small and larger circles
      fill(hue1, 100, 100);
      ellipse(xPos, yPos, xstep/2);
      fill(hue2, 100, 100);
      ellipse(xPos, yPos, xstep/4);
    }
  }
}

function mouseClicked() {
  save('myCanvas.png');
}