
class Blockchain {
  constructor() {
    this.blocks = [];
  }

  addBlock(block) {
    this.blocks.push(block);
  }
}

module.exports = Blockchain;

