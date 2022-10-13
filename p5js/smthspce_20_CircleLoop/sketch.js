let myScale = 0.01;
let radius = 200;
let nSteps = 50;
let circleSize = 200;

function setup() {
    createCanvas(640, 800)
    background(255)
    strokeWeight(2);
    noFill();
}

function draw() {



    let currStep = frameCount % nSteps;
    let t = map(currStep, 0, nSteps, 0, TWO_PI);
    let px = width / 2 + radius * cos(t);
    let py = height / 2 + radius * sin(t);

    // try to us lerp colour as an alternative
    // let startColour = color(218, 165, 32);
    // let endColour = color(72, 61, 139);
    // let fraction = map(currStep,0,nSteps,0,1);
    // c = lerpColor(startColour, endColour, fraction)

    let rCol = map(py, 50, 400, 215, 150);
    let gCol = map(py, 100, 300, 175, 215);
    let bCol = map(py, 300, 800, 150, 215);
    c = color(rCol, 0, bCol);
    stroke(c);
    ellipse(px, py, circleSize);

    // code to save as animation
    if ((frameCount >= nSteps) && (frameCount < (nSteps * 2))) {
        //save("save/" + nf(currStep, 3) + ".jpg");
    }

}

function keyPressed() {
    // save sketch
    if (key == 's' || key == 'S') save('myCanvas.png');
    if (key == 'c') background(255);

    if (key == 'n') noLoop();
}