
class Blockchain {
  constructor() {
    this.nodes = []; //array de nodos
  }

  receiveBroadcast(node)  {
    this.nodes.push(node);
  }

}

module.exports = Blockchain;

