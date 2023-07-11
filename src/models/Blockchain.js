nodes = require('./nodes');

class Blockchain {
    constructor(nodes = []) {
      this.nodes = nodes;
      }

addNode(node) {
    this.nodes.push(node);
}

}

module.exports = Blockchain;