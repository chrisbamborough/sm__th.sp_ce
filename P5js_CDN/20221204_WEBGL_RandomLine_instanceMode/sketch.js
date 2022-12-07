const s = (sketch) => {
  let sketchWidth;
  let sketchHeight;

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

    for (let i = 0; i < 100; i += 1) {
      sketch.push();
      //line
      const r = sketch.random(0, sketch.width);
      const s = sketch.random(0, sketch.height);
      const t = sketch.random(0, sketch.width);
      const u = sketch.random(0, sketch.height);
      sketch.line(r, s, 0, t, u, 0);
      sketch.pop();
    }

    sketch.noLoop();
  };

  sketch.windowResized = () => {
    sketchWidth = document.getElementById("p5sketch").offsetWidth;
    sketchHeight = document.getElementById("p5sketch").offsetHeight;
    sketch.resizeCanvas(sketchWidth, sketchHeight);
  };
};

let myp5 = new p5(s, "p5sketch");
