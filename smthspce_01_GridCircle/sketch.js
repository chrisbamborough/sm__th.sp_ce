let xres = 4;
let yres = 5;


function setup() {
  createCanvas(640, 800);
}

function draw() {
  background(255);
  strokeWeight(50);
  stroke(100);
  ellipseMode(CORNER);

  let xstep = width/xres;
  let ystep = height/yres;

  for (let i = 0; i < xres; i++) {
    for (let j = 0; j < yres; j++) {
      ellipse(i*xstep, j*ystep , xstep, ystep)
    }
  }
}

function mouseClicked(){
  save('myCanvas.png');
}

