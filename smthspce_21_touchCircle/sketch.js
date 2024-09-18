let c;
let circleWidth = 500;
let circleHeight = 1000;
let deformSpeed = 1;

let angle = 0;
let angleSpeed = 1;


function setup() {
    createCanvas(640, 800)
    background(255)
    cursor(CROSS);
    strokeWeight(0.5);
    noFill();
}

function draw() {

    if (mouseIsPressed && mouseButton == LEFT) {    
        
        push();
        translate(mouseX, mouseY);

        let rCol = map(mouseY, 50, 400, 215, 150);
        let gCol = map(mouseY, 100, 300, 175, 215);
        let bCol = map(mouseY, 300, 800, 150, 215);
        c = color(rCol, 0, bCol);
        stroke(c);
        
        rotate(radians(angle));

        ellipse(0, 0, circleWidth, circleHeight);
        pop();

    }

    

    // code to save as animation
    // if ((frameCount >= nSteps) && (frameCount < (nSteps * 2))) {
    //     //save("save/" + nf(currStep, 3) + ".jpg");
    // }

}

function touchMoved() {

    angle += angleSpeed;
  }

function keyPressed() {
    // save sketch
    if (key == 's' || key == 'S') save('myCanvas.png');
    if (key == 'c') background(255);

    if (key == 'n') noLoop();
}