const Blockchain = require('./Blockchain');
const Block = require('./Block');
const MD5Hash = require('./MD5Hash');
const TransactionCoinbase = require('./TransactionCoinbase');
const config = require('./Config');

class Node {
  constructor(openBlock = [], blocks = [], blockchain) {
    this.openBlock = [this.createGenesisBlock()];
    this.blocks = blocks;
    this.blockchain = Blockchain.getInstance();
    this.connectedNodes = [];
    this.pendingTransactions = [];

  }

  createGenesisBlock() {
    return new Block(Date.now(), [], "0");
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

  addCompositeTransaction(compositeTransaction) {
    //to do
  }

  hashCalculation(value, hash) {
    if (hash.isInstanceOf(MD5Hash)) {
      return hash.hash(value);
    }
    else if (hash.isInstanceOf(SHA256Hash)) {
      return hash.hash(value);
    }
  }

  getLatestBlock() {
    return this.openBlock[this.openBlock.length - 1];
  }

  checkTransactionIntegrity(transaction) {
    return transaction.hash === this.computeTransactionHash(transaction);
  }

  verifyHashNode() {
    //to do

  }

  createNewBlock() {
    this.openBlock.push(new Block(Date.now(), [], this.getLatestBlock().hash));
  }

  createTransaction(type, uuid, inAddress, outAddress, encriptionForm, token = '') {
    if (type === 'coinbase') {
      return new TransactionCoinbase(token, uuid, inAddress, outAddress, encriptionForm, this);
    }
    else if (type === 'composite') {
      return new TransactionComposite(level, uuid, inAddress, outAddress, encriptionForm, this);
    }
    else {
      return new TransactionNormal(txIn, uuid, inAddress, outAddress, encriptionForm, this);
    }
  }

  broadcast(block) {
    this.blockchain.addBlock(block);
  }

  addNode(node) {
    this.connectedNodes.push(node);
  }

  isBlockchainValid() {

    console.log('tamaño blockchain ' + this.blockchain.blocks.length);
    for (let i = 1; i < this.blockchain.blocks.length; i++) {
      const currentBlock = this.blockchain.blocks[i];
      const previousBlock = this.blockchain.blocks[i - 1];

      //como entramos al for en i=1, entonces necesitamos validas las transacciones del bloque genesis
      if (!this.blockchain.blocks[0].hasValidTransactions()) {
        console.log('bloque genesis valid?: ' + this.blockchain.blocks[0].hasValidTransactions());
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