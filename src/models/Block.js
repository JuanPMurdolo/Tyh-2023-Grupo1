const TransactionCoinbase = require('./TransactionCoinbase');
const SHA256Hash = require('./SHA256');
const transactionSimple = require('./TransactionSimple');
const Node = require('./Node');
const config = require('./Config');

const sha256Strategy = new SHA256Hash();

class Block {
  constructor(timestamp, transactions = [], previousHash = "") {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.hash = '';
    this.previousHash = previousHash;
    this.status = 'open';

    // Creamos la primera transaccion CoinBase
    const coinBase = new TransactionCoinbase('TKN', 'Abraham', sha256Strategy, 'node');
    this.transactions.push(coinBase);
  }

  addPreviousHash(node) {
    //previous hash va a ser el ultimo bloque cerrado de la blockchain
    const previousHash = node.blockchain.blocks[node.blockchain.blocks.length - 1].hash;
    //si previous hash esta vacio o no existe retornamos vacio
    if (previousHash === undefined || previousHash === null) {
      return '';
    } else {
      return previousHash;
    }
  }

  closeBlock() {
    var hash = 0;
    this.transactions.forEach(transaction => {
      if (transaction.status === 'pending') {
        transaction.closeTransaction();
        hash += transaction.hash;
      }
    });
    this.hash = this.calculateHash();
    this.status = 'closed';
  }

  toString() {
    return JSON.stringify(this);
  }

  calculateHash() {
    return config.hashDefault.generateHash(this.getData());
  }

  getData() {
    return `${this.previousHash}${this.timestamp}${this.getHashesTransactions()}`;
  }
  
  // Método para verificar la validez de un bloque
  isValid() {
    const hash = this.calculateHash(this.getData());
    return hash === this.hash;
  }

  hasValidTransactions() {
    for (const tx of this.transactions) {
      if (!tx.isValid()) {
        return false;
      }
    }

    return true;
  }

  addTransaction(transaction) {

    if (!transaction.isValid()) {
      console.log('Transacción no válida. No se agregó al bloque abierto.');
      return false;
    }

    this.transactions.push(transaction);
  }

  getHashesTransactions() {
    var hash = '';
    this.transactions.forEach(transaction => {
      hash += transaction.hash;
    });
    return hash;
  }

}

module.exports = Block;