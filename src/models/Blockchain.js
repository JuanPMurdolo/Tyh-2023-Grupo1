
class Blockchain {
  constructor() {
    this.blocks = []; //array de bloques
    this.nodes = []; //array de nodos
  }

  addBlock(block) {
    this.blocks.push(block);
    this.broadcast(block);
  }

  addNode(node) {
    this.nodes.push(node);
  }

  broadcast(block)  {
    this.nodes.forEach(node => {
      node.receiveBroadcast(block);
    })
  }

}

module.exports = Blockchain;

