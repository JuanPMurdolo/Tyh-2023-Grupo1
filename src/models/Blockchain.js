class Blockchain {
  constructor() {
    if (Blockchain.instance) {
      return Blockchain.instance;
    }

    this.blocks = [];
    Blockchain.instance = this;
  }

  addBlock(block) {
    this.blocks.push(block);
  }

  getBlockchain() {
    return this.blocks;
  }
}
module.exports = Blockchain;