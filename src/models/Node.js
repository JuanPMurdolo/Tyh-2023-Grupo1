const Blockchain = require('./Blockchain');
const Block = require('./Block');
const MD5Hash = require('./MD5Hash');
const TransactionCoinbase = require('./TransactionCoinbase');
const config = require('./Config');

class Node {
  constructor(blockchain) {
    this.openBlock = [this.createGenesisBlock()];
    this.blocks = [];
    this.blockchain = blockchain;
    this.connectedNodes = [];
    this.pendingTransactions = [];
  }

  createGenesisBlock() {
    return new Block(Date.now(), [], '0');
  }

  addNodeBlockchain() {
    this.blockchain.addNode(this);
  }

  addTransaction(transaction) {

    if (!transaction.isValid()) {
      console.log('Transacción no válida. No se agregó al bloque abierto.');
      return false;
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
    return this.openBlock[this.openBlock.length - 1];
  }

  createNewBlock() {
    this.openBlock.push(new Block(Date.now(), [], this.getLatestBlock().hash));
  }

  broadcast(block) {
    this.blockchain.addBlock(block);
    this.addNodeBlockchain();
  }

  addNode(node) {
    this.connectedNodes.push(node);
  }

  receiveBroadcast(block) {
    if (this.verifyBlock(block) === true && this.getLatestBlock !== block){
      this.addBlock(block);
    } else {
      console.log('Bloque no valido');
    }
  }
  
  verifyBlock(block) {
    if (block?.isValid() === true){
      return true;
    } else {
      return false;
    }
  }

  isBlockchainValid() {

    console.log('tamaño blockchain ' + this.blockchain.blocks.length);
    for (let i = 1; i < this.blockchain.blocks.length; i++) {
      const currentBlock = this.blockchain.blocks[i];
      const previousBlock = this.blockchain.blocks[i - 1];

      //como entramos al for en i=1, entonces necesitamos validas las transacciones del bloque genesis
      if (!this.blockchain.blocks[0].hasValidTransactions()) {
        console.log('bloque genesis valido?: ' + this.blockchain.blocks[0].hasValidTransactions());
        return false;
      }

      if (!currentBlock.hasValidTransactions()) {
        console.log('currentBlock.hasValidTransactions: ' + currentBlock.hasValidTransactions());
        return false;
      }

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        console.log('hola: ' + currentBlock.hash);

        console.log('hola calculado: ' + currentBlock.calculateHash());

        return false;
      }

      // comprueba que todos los hashes este correlacionados correctamente
      if (currentBlock.previousHash !== previousBlock.hash) {
        console.log('has previo: ' + currentBlock.previousHash);
        console.log('has previo: ' + currentBlock.toString());
        console.log('has previo: ' + previousBlock.toString());

        return false;
      }
    }

    return true;
  }

}

module.exports = Node;