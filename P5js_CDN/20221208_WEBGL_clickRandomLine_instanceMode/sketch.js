const s = (sketch) => {
  let sketchWidth;
  let sketchHeight;
  let numLines = 50;

  sketch.setup = () => {
    sketchWidth = document.getElementById("p5sketch").offsetWidth;
    sketchHeight = document.getElementById("p5sketch").offsetHeight;

    sketch.print("canvas height " + sketchHeight);
    sketch.print("canvas width " + sketchWidth);

    let cnv = sketch.createCanvas(sketchWidth, sketchHeight, sketch.WEBGL);
    cnv.id("sketchCanvas");
    let x = (sketch.windowWidth - sketch.width) / 2;
    let y = (sketch.windowHeight - sketch.height) / 2;
    cnv.position(x, y);
  };

  sketch.draw = () => {
    sketch.background(255);
    sketch.translate(-sketch.width / 2, -sketch.height / 2, 0);
    myp5.randomLines();
    sketch.noLoop();
  };

  sketch.randomLines = () => {
    sketch.print("I'm defo here");
    for (let i = 0; i < numLines; i += 1) {
      sketch.push();
      let strtX = sketch.random(0, sketch.width);
      let strtY = sketch.random(0, sketch.height);
      let endX = sketch.random(0, sketch.width);
      let endY = sketch.random(0, sketch.height);
      sketch.line(strtX, strtY, 0, endX, endY, 0);
      sketch.pop();
    }
  };

  sketch.mousePressed = () => {
    sketch.background(255);
    myp5.randomLines();
  };

  sketch.windowResized = () => {
    sketchWidth = document.getElementById("p5sketch").offsetWidth;
    sketchHeight = document.getElementById("p5sketch").offsetHeight;
    sketch.resizeCanvas(sketchWidth, sketchHeight);
  };
};

let myp5 = new p5(s, "p5sketch");
