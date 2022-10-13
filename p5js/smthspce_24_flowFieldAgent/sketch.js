var debug = true;
var flowfield;
// var message = 'press H to show / hide GUI';
var seed = 5000;
var xoffStart = 0;
var yoffStart = 0;
var res = 20;
var agents = [];
// var scl = 10;
// var vectorLine = [];

function setup() {
    createCanvas(640, 800)

    colorMode(HSB);
    createField();
    seedField();

    // set up agents
    for (var i = 0; i < 1000; i++) {
        agents[i] = new Agent();
    }

}

function createField() {
    //res = panel.getRangeValue('Field Resolution');
    flowfield = new FlowField(res);
}

function seedField() {
    //clear();
    // seed = 5000;
    xoffStart = random(0, 1);
    yoffStart = random(0, 1);
    // seed = panel.getValue('Noise Seed');
    // xoffStart = panel.getValue('X Angle');
    // yoffStart = panel.getValue('Y Angle');
    flowfield.init(seed, xoffStart, yoffStart);
}

function draw() {

    // controld for the particles
    for (var i = 0; i < agents.length; i++) {
        agents[i].follow(flowfield);
        agents[i].update();
        agents[i].edges();
        agents[i].show();
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