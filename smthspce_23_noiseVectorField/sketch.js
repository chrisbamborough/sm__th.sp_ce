let xRes = 30;
let yRes = 40;
let xGrid;
let yGrid;

let mag = 40;
let lineWeight = 2;
let freeze = false;

let noiseXrange;
let noiseYrange;

function setup() {
    createCanvas(640, 800)

    xGrid = round(width / xRes);
    yGrid = round(height / yRes);

    strokeWeight(lineWeight);
}

function draw() {

    background(255);

    noiseXrange = mouseX / 100;
    noiseYrange = mouseY / 100;

    // create a grid of points
    for (i = 0; i < xRes; i++) {
        for (j = 0; j < yRes; j++) {

            let posX = i * xGrid;
            let posY = j * yGrid;

            let noiseX = map(i, 0, xGrid, 0, noiseXrange);
            let noiseY = map(j, 0, yGrid, 0, noiseYrange);

            let noiseVal = noise(noiseX, noiseY);
            let angle = noiseVal * TAU;

            let r = map(posX, 0, 640, 0, 255);
            let g = map(posY, 0, 800, 0, 255);
            c = color(r, g, 0);
            stroke(c)


            push();
            translate(posX, posY);
            rotate(angle);
            line(0, 0, 0, mag);
            // rotate to show noise
            pop();

        }
    }
}

function keyPressed() {
    // save sketch
    if (key == 's' || key == 'S') save('myCanvas.png');
    if (key == 'c') background(255);

    // pauze/play draw loop
    if (key == 'f' || key == 'F') freeze = !freeze;
    if (freeze) {
        noLoop();
        print("frozen")
    } else {
        loop();
        print("UN - frozen")
    }
}