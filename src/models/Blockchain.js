
class Blockchain {
  constructor() {
    this.blocks = []; //array de bloques
    this.nodes = []; //array de nodos
  }

  addBlock(block) {
    this.blocks.push(block);
    this.broadcast();
  }

  broadcast(block)  {
    this.nodes.forEach(node => {
      node.receiveBroacast(block);
    })
  }



}

module.exports = Blockchain;

