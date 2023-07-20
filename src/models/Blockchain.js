
class Blockchain {
  constructor() {
    this.chain = [];
  }

  static getInstance() {
    if (!Blockchain.instance) {
      Blockchain.instance = new Blockchain();
    }
    return Blockchain.instance;
  }

  addBlock(block) {
    this.chain.push(block);
  }
}

module.exports = Blockchain;

