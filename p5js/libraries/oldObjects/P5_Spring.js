function Spring(LINE, STRTNODE, ENDNODE) {
    this.line = LINE;
    this.strtNode = STRTNODE;
    this.endNode = ENDNODE;

    // create springs by adding strode and endNode to the connectedSprings list in the node object
    this.strtNode.addSpringToList(self)
    this.endNode.addSpringToList(self)

    // Obtain start and end points for the spring
    this.stPt = self.stNode.pos
    this.endPt = self.endLink.pos

    this.updateGeometry = function() {

    }

    this.spingMove = function() {

    }




}
