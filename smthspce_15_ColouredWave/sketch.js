function setup() {
  createCanvas(640, 800);
  background('white');
  noLoop();
}

function draw() {

  print("I'm working");

  noStroke();

  for (var i = 0; i < width; i+=10) {
    for (var j = 0; j < height; j+=10) {

      // for every location calculate a colour
      let red = 255;
      let green = map(sin(i * i + j * j), -1, 1, 0, 255);
      let blue = map(sin(j*i), -1, 1, 100, 255);

      fill(red, green, blue, 60);
      ellipse(i, j, 20, 20);
    }
  }
}

function mouseClicked() {
  save('myCanvas.png');
}