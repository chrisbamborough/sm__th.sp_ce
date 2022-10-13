function FlowField(r) {
  this.resolution = r;
  this.cols = width / this.resolution;
  this.rows = height / this.resolution;

  var zoff = 0;

  this.make2Darray = function(n) {
    var array = [];
    for (var i = 0; i < n; i++) {
      array[i] = [];
    }
    return array
  };

  this.field = this.make2Darray(this.cols);

  this.init = function(seed, xoffStart, yoffStart) {
    noiseSeed(Math.floor(seed));
    var xoff = xoffStart;
    for (var i = 0; i < this.cols; i++) {
      var yoff = yoffStart;
      for (var j = 0; j < this.rows; j++) {
        //var angle = noise(xoff, yoff,zoff) * TWO_PI * 4;
        var angle = map(noise(xoff, yoff), 0, 1, 0, TWO_PI);
        //this.field[i][j] = createVector(cos(theta), sin(theta));
        v = p5.Vector.fromAngle(angle);
        v.setMag(1);
        this.field[i][j] = v;
        yoff += 0.1;
      }
      xoff += 0.1;
      zoff += 0.0003;
    }
    return this.field
  };

  this.lookup = function(lookup) {
    var column = Math.floor(constrain(lookup.x / this.resolution, 0, this.cols - 1));
    var row = Math.floor(constrain(lookup.y / this.resolution, 0, this.rows - 1));
    //println(lookup.x);
    return this.field[column][row].copy();
  };

  this.display = function() {
    for (var i = 0; i < this.cols; i++) {
      for (var j = 0; j < this.rows; j++) {
        drawVector(this.field[i][j], i * this.resolution, j * this.resolution, this.resolution - 1);
      }
    }
  };

  var drawVector = function(v, x, y, scale) {
    push();
    var arrowsize = 4;
    translate(x, y);
    stroke(200, 200);
    rotate(v.heading());
    var len = v.mag() * scale;
    line(0, 0, len, 0);
    pop();
  };
};
