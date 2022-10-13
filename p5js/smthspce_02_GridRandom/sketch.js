let xres = 8;
let yres = 10;

function setup() {

  //rather than run in setup, probably better to create an array of random values, to use in the draw loop
  
  createCanvas(640, 800);

  let xstep = width / xres;
  let ystep = height / yres;

  // translate to be the center of the first grid - ellipse mode center
  translate(width / xres / 2, height / yres / 2);

  background(255);

  strokeWeight(1);
  stroke(200);

  rectMode(CENTER);

  
  for (let i = 0; i < xres; i++) {
    for (let j = 0; j < yres; j++) {
      
      rect(xstep*i, ystep*j, xstep , ystep)
    }
  }

  strokeWeight(10);
  stroke(100);

  for (let i = 0; i < xres; i++) {
    for (let j = 0; j < yres; j++) {

      let xshift = random(-xstep, xstep)/5;
      let yshift = random(-ystep, ystep)/5;

      ellipse(xstep*i + xshift, ystep*j + yshift, xstep/2 , ystep/2);
    }
  }
}

function mousePressed() {
  save('myCanvas.png');
}

