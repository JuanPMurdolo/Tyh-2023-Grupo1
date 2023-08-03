const Block = require('./Block');
const MD5Hash = require('./MD5Hash');
const TransactionCoinbase = require('./TransactionCoinbase');
const config = require('./Config');

class Node {
  constructor() {
    this.blocks = [this.createGenesisBlock()]; // array de bloques abiertos
    this.blockchain = []; //array de bloques cerrados
    this.connectedNodes = []; //array de nodos
    this.pendingTransactions = [];
  }

  createGenesisBlock() {
    return new Block(Date.now(), [], '0');
  }

  addTransaction(transaction) {

    if (!transaction.isValid()) {
      throw new Error("Transacción no válida. No se agregó al bloque abierto.");
    }

    //si no agarra el ultimo bloque
    var lastBlock = this.getLatestBlock();
    if (lastBlock.transactions.length < 10) {

      lastBlock.transactions.push(transaction);
      console.log('Transacción guardada en el bloque abierto.');

    } else {

      //si ya tiene las 10 transactions se cierra
      lastBlock.closeBlock();
      console.log('Bloque con 10 transacciones, se cierra');

      //se agrega el bloque a la blockchain
      this.broadcast(lastBlock);

      //se crea un nuevo bloque
      this.createNewBlock();

      var lastBlock = this.getLatestBlock();
      lastBlock.addPreviousHash(this);

      //se pushea la transaction al nuevo bloque
      lastBlock.transactions.push(transaction);
    }
  }

  getLatestBlock() {
    return this.blocks[this.blocks.length - 1];
  }

  createNewBlock() {
    this.blocks.push(new Block(Date.now(), [], this.getLatestBlock().hash));
  }

  broadcast(block) {
    this.blockchain.push(block);
    this.connectedNodes.forEach(node => {
      node.receiveBroadcast(block);
    })
  }

  addNode(node) {
    this.connectedNodes.push(node);
  }

  receiveBroadcast(block) {
    if (this.verifyBlock(block) === true && this.getLatestBlock !== block) {
      this.addBlock(block);
    } else {
      throw new Error("Bloque no valido");

    }
  }

  verifyBlock(block) {
    return block.isValid() === true
  }

  addBlock(block) {
    this.blocks.push(block);
  }

  isBlockchainValid() {

    for (let i = 1; i < this.blocks.length; i++) {
      const currentBlock = this.blocks[i];
      const previousBlock = this.blocks[i - 1];

      //como entramos al for en i=1, entonces necesitamos validas las transacciones del bloque genesis
      if (!this.blocks[0].hasValidTransactions()) {
        return false;
      }

      if (!currentBlock.hasValidTransactions()) {
        return false;
      }

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      // comprueba que todos los hashes este correlacionados correctamente
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }

}

module.exports = Node;