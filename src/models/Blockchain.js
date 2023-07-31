
class Blockchain {
  constructor() {
    this.nodes = []; //array de nodos
  }

  addBlock(block) {
    this.blocks.push(block);
  }
}

module.exports = Blockchain;

