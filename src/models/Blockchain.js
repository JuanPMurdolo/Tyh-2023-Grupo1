
class Blockchain {
  constructor() {
    this.blocks = []; //array de nodos
  }

  addBlock(block) {
    this.blocks.push(block);
  }

}

module.exports = Blockchain;

