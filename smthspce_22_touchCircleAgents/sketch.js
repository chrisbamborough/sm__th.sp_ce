let centerX;
let centerY;
let x = [];
let y = [];
let formResolution = 5;
let initRadius = 100;
let stepSize = 10;

var freeze = false;


function setup() {
    createCanvas(640, 800)

    // init shape
    centerX = width / 2;
    centerY = height / 2;
    var angle = radians(360 / formResolution);

    // fill list with circles
    for (var i = 0; i < formResolution; i++) {
        x.push(cos(angle * i) * initRadius);
        y.push(sin(angle * i) * initRadius);
    }

    stroke(0, 50);
    strokeWeight(0.75);
    background(255);
    cursor(CROSS);
    noFill();
}

function draw() {

    // floating towards mouse position
    centerX += (mouseX - centerX) * 0.01;
    centerY += (mouseY - centerY) * 0.01;

    // calculate new points
    for (var i = 0; i < formResolution; i++) {
        // use noise value instead
        x[i] += noise(centerX, centerY, 0)/stepSize;
        y[i] += noise(mouseX, mouseY, 0)/stepSize;

        //x[i] += random(-stepSize, stepSize);
        //y[i] += random(-stepSize, stepSize);

        // uncomment the following line to show position of the agents
        //ellipse(x[i] + centerX, y[i] + centerY, 5, 5);
    }

    let rCol = map(mouseY, 50, 300, 215, 150);
    //let gCol = map(mouseY, 100, 300, 175, 215);
    let bCol = map(mouseY, 300, 600, 150, 215);
    c = color(rCol, 0, bCol);
    stroke(c);

    // draw shape

    beginShape();
    // first controlpoint
    curveVertex(x[formResolution - 1] + centerX, y[formResolution - 1] + centerY);

    // only these points are drawn
    for (var i = 0; i < formResolution; i++) {
        curveVertex(x[i] + centerX, y[i] + centerY);
    }

    curveVertex(x[0] + centerX, y[0] + centerY);
    // end controlpoint
    curveVertex(x[1] + centerX, y[1] + centerY);
    endShape();


}

function mousePressed() {
    // init shape on mouse position
    centerX = mouseX;
    centerY = mouseY;
    var angle = radians(360 / formResolution);
    var radius = initRadius * random(0.5, 1);
    for (var i = 0; i < formResolution; i++) {
        x[i] = sin(angle * i) * initRadius;
        y[i] = cos(angle * i) * initRadius;
    }
}

function touchMoved() {

    angle += angleSpeed;
}

function keyPressed() {
    // save sketch
    if (key == 's' || key == 'S') save('myCanvas.png');
    if (key == 'c') background(255);

    // pauze/play draw loop
    if (key == 'f' || key == 'F') freeze = !freeze;
    if (freeze) {
        noLoop();
    } else {
        loop();
    }
}