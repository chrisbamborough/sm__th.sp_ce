function Node(POS) {
    this.pos = POS;
    this.connectedSprings = [];
    this.fixed = getFixedState();
    //this.mass = M;
    // check if globalDrawLinkPts:drawPoint()

    this.getFixedState = function() {
        // check if fixed state is true
        // loop through fixed points
        // check if distance between the self.pos and fixed point is less than a global tolerance
        // if so check = true
        // return check
    }

    this.drawPoint = function() {
        //draw a particle at the self.pos
    }

    this.addSpringToList = function(Spring) {
        // in javascript self.connectedSprings.append (Spring)


    }

    this.updatePos = function() {

    }

}
