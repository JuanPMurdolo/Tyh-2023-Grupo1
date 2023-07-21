
class Blockchain {
  constructor() {
    this.blocks = [];
  }

  static getInstance() {
    if (!Blockchain.instance) {
      Blockchain.instance = new Blockchain();
    }
    return Blockchain.instance;
  }

  addBlock(block) {
    this.blocks.push(block);
  }
}

module.exports = Blockchain;

