const s = (sketch) => {
  let x = 100;
  let y = 100;

  sketch.setup = () => {
    sketch.createCanvas(sketch.windowWidth, sketch.windowHeight, sketch.WEBGL);
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
};

// let myp5 = new p5(s, '');
let myp5 = new p5(s, "p5sketch");
