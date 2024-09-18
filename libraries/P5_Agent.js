function Agent() {
  this.pos = createVector(random(width), random(height));
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.maxspeed = 4;
  this.maxforce = 0.5
  this.h = 120;
  this.s = 40;
  this.b = 80;
  //this.prevPos = this.pos.copy();
  this.prevPos = this.pos.array();

  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.follow = function(vectors) {
    var desired = vectors.lookup(this.pos);
    desired.mult(this.maxspeed);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.show = function() {
    stroke(this.h, this.s, this.b, 0.25);
    this.h += 1;
    //this.s += 1;
    this.b += 0.2;
    // hue 0-360
    if (this.h > 130) {
      this.h = 120;
    }
    // saturation 0-100
    if (this.s > 100) {
      this.h = 50;
    }
    // brightness 0-100
    if (this.b > 100) {
      this.b = 25;
    }
    strokeWeight(2);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();
  }

  this.updatePrev = function() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }

  this.edges = function() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }
  }
}
